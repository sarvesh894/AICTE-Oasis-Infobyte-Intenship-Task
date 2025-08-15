-- Fix search path for all functions to address security warnings
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS TEXT AS $$
  SELECT role FROM public.profiles WHERE user_id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER STABLE SET search_path = '';

CREATE OR REPLACE FUNCTION public.reduce_inventory_stock(pizza_data_param jsonb)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = ''
AS $$
DECLARE
  base_name TEXT;
  sauce_name TEXT;
  cheese_name TEXT;
  topping_name TEXT;
  topping JSONB;
BEGIN
  -- Extract base, sauce, cheese from pizza_data
  base_name := pizza_data_param->>'base';
  sauce_name := pizza_data_param->>'sauce'; 
  cheese_name := pizza_data_param->>'cheese';
  
  -- Reduce stock for base (1 unit per pizza)
  IF base_name IS NOT NULL THEN
    UPDATE public.inventory 
    SET current_stock = current_stock - 1
    WHERE item_name = base_name AND item_type = 'base'
    AND current_stock > 0;
  END IF;
  
  -- Reduce stock for sauce (1 unit per pizza)
  IF sauce_name IS NOT NULL THEN
    UPDATE public.inventory 
    SET current_stock = current_stock - 1
    WHERE item_name = sauce_name AND item_type = 'sauce'
    AND current_stock > 0;
  END IF;
  
  -- Reduce stock for cheese (1 unit per pizza)
  IF cheese_name IS NOT NULL THEN
    UPDATE public.inventory 
    SET current_stock = current_stock - 1
    WHERE item_name = cheese_name AND item_type = 'cheese'
    AND current_stock > 0;
  END IF;
  
  -- Reduce stock for toppings (1 unit each)
  IF pizza_data_param ? 'toppings' THEN
    FOR topping IN SELECT * FROM jsonb_array_elements(pizza_data_param->'toppings')
    LOOP
      topping_name := topping#>>'{}';
      IF topping_name IS NOT NULL THEN
        UPDATE public.inventory 
        SET current_stock = current_stock - 1
        WHERE item_name = topping_name AND item_type = 'vegetable'
        AND current_stock > 0;
      END IF;
    END LOOP;
  END IF;
END;
$$;

CREATE OR REPLACE FUNCTION public.handle_order_inventory_reduction()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = ''
AS $$
BEGIN
  -- Only reduce inventory for confirmed orders
  IF NEW.order_status = 'confirmed' THEN
    PERFORM public.reduce_inventory_stock(NEW.pizza_data);
  END IF;
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.handle_order_status_change()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = ''
AS $$
BEGIN
  -- If order status changed from pending to confirmed, reduce inventory
  IF OLD.order_status != 'confirmed' AND NEW.order_status = 'confirmed' THEN
    PERFORM public.reduce_inventory_stock(NEW.pizza_data);
  END IF;
  RETURN NEW;
END;
$$;