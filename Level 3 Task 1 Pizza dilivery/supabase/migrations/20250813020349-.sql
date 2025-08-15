-- Create inventory table for tracking stock levels
CREATE TABLE public.inventory (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  item_type TEXT NOT NULL, -- 'base', 'sauce', 'cheese', 'vegetable', 'meat'
  item_id UUID NOT NULL, -- references to respective ingredient tables
  item_name TEXT NOT NULL,
  current_stock INTEGER NOT NULL DEFAULT 0,
  threshold_level INTEGER NOT NULL DEFAULT 20,
  unit TEXT NOT NULL DEFAULT 'pieces',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(item_type, item_id)
);

-- Enable RLS
ALTER TABLE public.inventory ENABLE ROW LEVEL SECURITY;

-- Only admins can manage inventory
CREATE POLICY "Admins can manage inventory" ON public.inventory
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.user_id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

-- Add triggers for updated_at
CREATE TRIGGER update_inventory_updated_at
  BEFORE UPDATE ON public.inventory
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Function to update inventory after order
CREATE OR REPLACE FUNCTION update_inventory_after_order()
RETURNS TRIGGER AS $$
BEGIN
  -- Update inventory for each ingredient used
  IF NEW.order_status = 'confirmed' AND (OLD.order_status IS NULL OR OLD.order_status != 'confirmed') THEN
    -- Decrease stock for pizza base
    IF NEW.pizza_data->>'base_id' IS NOT NULL THEN
      UPDATE inventory 
      SET current_stock = current_stock - 1
      WHERE item_type = 'base' AND item_id = (NEW.pizza_data->>'base_id')::UUID;
    END IF;
    
    -- Decrease stock for sauce
    IF NEW.pizza_data->>'sauce_id' IS NOT NULL THEN
      UPDATE inventory 
      SET current_stock = current_stock - 1
      WHERE item_type = 'sauce' AND item_id = (NEW.pizza_data->>'sauce_id')::UUID;
    END IF;
    
    -- Decrease stock for cheese
    IF NEW.pizza_data->>'cheese_id' IS NOT NULL THEN
      UPDATE inventory 
      SET current_stock = current_stock - 1
      WHERE item_type = 'cheese' AND item_id = (NEW.pizza_data->>'cheese_id')::UUID;
    END IF;
    
    -- Decrease stock for vegetables
    IF NEW.pizza_data->'vegetable_ids' IS NOT NULL THEN
      UPDATE inventory 
      SET current_stock = current_stock - 1
      WHERE item_type = 'vegetable' 
      AND item_id = ANY(
        SELECT (jsonb_array_elements_text(NEW.pizza_data->'vegetable_ids'))::UUID
      );
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for inventory updates
CREATE TRIGGER update_inventory_on_order_confirm
  AFTER UPDATE ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION update_inventory_after_order();

-- Populate initial inventory data
INSERT INTO public.inventory (item_type, item_id, item_name, current_stock, threshold_level, unit) VALUES
-- Bases
('base', (SELECT id FROM pizza_bases WHERE name = 'Thin Crust'), 'Thin Crust', 50, 20, 'pieces'),
('base', (SELECT id FROM pizza_bases WHERE name = 'Thick Crust'), 'Thick Crust', 45, 20, 'pieces'),
('base', (SELECT id FROM pizza_bases WHERE name = 'Stuffed Crust'), 'Stuffed Crust', 30, 15, 'pieces'),
('base', (SELECT id FROM pizza_bases WHERE name = 'Gluten-Free'), 'Gluten-Free', 25, 10, 'pieces'),
('base', (SELECT id FROM pizza_bases WHERE name = 'Whole Wheat'), 'Whole Wheat', 35, 15, 'pieces'),

-- Sauces
('sauce', (SELECT id FROM pizza_sauces WHERE name = 'Tomato'), 'Tomato', 100, 30, 'portions'),
('sauce', (SELECT id FROM pizza_sauces WHERE name = 'BBQ'), 'BBQ', 80, 25, 'portions'),
('sauce', (SELECT id FROM pizza_sauces WHERE name = 'White Sauce'), 'White Sauce', 60, 20, 'portions'),
('sauce', (SELECT id FROM pizza_sauces WHERE name = 'Pesto'), 'Pesto', 40, 15, 'portions'),
('sauce', (SELECT id FROM pizza_sauces WHERE name = 'Buffalo'), 'Buffalo', 50, 20, 'portions'),

-- Cheeses
('cheese', (SELECT id FROM pizza_cheeses WHERE name = 'Mozzarella'), 'Mozzarella', 200, 50, 'portions'),
('cheese', (SELECT id FROM pizza_cheeses WHERE name = 'Cheddar'), 'Cheddar', 150, 40, 'portions'),
('cheese', (SELECT id FROM pizza_cheeses WHERE name = 'Parmesan'), 'Parmesan', 100, 30, 'portions'),
('cheese', (SELECT id FROM pizza_cheeses WHERE name = 'Goat Cheese'), 'Goat Cheese', 80, 25, 'portions'),

-- Vegetables
('vegetable', (SELECT id FROM pizza_vegetables WHERE name = 'Mushrooms'), 'Mushrooms', 120, 40, 'portions'),
('vegetable', (SELECT id FROM pizza_vegetables WHERE name = 'Bell Peppers'), 'Bell Peppers', 100, 35, 'portions'),
('vegetable', (SELECT id FROM pizza_vegetables WHERE name = 'Onions'), 'Onions', 80, 30, 'portions'),
('vegetable', (SELECT id FROM pizza_vegetables WHERE name = 'Tomatoes'), 'Tomatoes', 90, 30, 'portions'),
('vegetable', (SELECT id FROM pizza_vegetables WHERE name = 'Olives'), 'Olives', 70, 25, 'portions'),
('vegetable', (SELECT id FROM pizza_vegetables WHERE name = 'Spinach'), 'Spinach', 60, 20, 'portions'),
('vegetable', (SELECT id FROM pizza_vegetables WHERE name = 'Jalapeños'), 'Jalapeños', 50, 20, 'portions');