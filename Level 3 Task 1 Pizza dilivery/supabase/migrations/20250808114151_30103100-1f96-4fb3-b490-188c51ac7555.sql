-- Create pizzas table to store available pizza varieties
CREATE TABLE public.pizzas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  ingredients TEXT[],
  category TEXT DEFAULT 'classic',
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.pizzas ENABLE ROW LEVEL SECURITY;

-- Create policy for viewing pizzas (everyone can view available pizzas)
CREATE POLICY "Anyone can view available pizzas" 
ON public.pizzas 
FOR SELECT 
USING (is_available = true);

-- Create policy for admins to manage pizzas
CREATE POLICY "Admins can manage all pizzas" 
ON public.pizzas 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

-- Add trigger for automatic timestamp updates
CREATE TRIGGER update_pizzas_updated_at
BEFORE UPDATE ON public.pizzas
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample pizza varieties
INSERT INTO public.pizzas (name, description, price, ingredients, category) VALUES
('Margherita', 'Classic pizza with fresh mozzarella, tomato sauce, and basil', 12.99, ARRAY['tomato sauce', 'mozzarella', 'basil', 'olive oil'], 'classic'),
('Pepperoni', 'Traditional pepperoni pizza with mozzarella and tomato sauce', 14.99, ARRAY['tomato sauce', 'mozzarella', 'pepperoni'], 'classic'),
('Quattro Stagioni', 'Four seasons pizza with artichokes, mushrooms, ham, and olives', 18.99, ARRAY['tomato sauce', 'mozzarella', 'artichokes', 'mushrooms', 'ham', 'olives'], 'specialty'),
('Vegetarian Supreme', 'Fresh vegetables with bell peppers, onions, mushrooms, and olives', 16.99, ARRAY['tomato sauce', 'mozzarella', 'bell peppers', 'onions', 'mushrooms', 'olives', 'tomatoes'], 'vegetarian'),
('Meat Lovers', 'Loaded with pepperoni, sausage, ham, and bacon', 19.99, ARRAY['tomato sauce', 'mozzarella', 'pepperoni', 'sausage', 'ham', 'bacon'], 'meat'),
('Hawaiian', 'Ham and pineapple with mozzarella and tomato sauce', 15.99, ARRAY['tomato sauce', 'mozzarella', 'ham', 'pineapple'], 'classic');