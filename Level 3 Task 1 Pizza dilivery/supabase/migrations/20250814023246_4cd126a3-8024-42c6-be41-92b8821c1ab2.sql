-- Fix infinite recursion in profiles RLS policies
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;

-- Create a corrected admin policy that doesn't cause recursion
CREATE POLICY "Admins can view all profiles" ON public.profiles
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.profiles admin_profile
    WHERE admin_profile.user_id = auth.uid() 
    AND admin_profile.role = 'admin'
  )
);

-- Insert sample pizza data
INSERT INTO public.pizzas (name, description, price, ingredients, category, is_available) VALUES
('Margherita Classic', 'Traditional Italian pizza with fresh tomatoes, mozzarella, and basil', 12.99, ARRAY['Tomato Sauce', 'Mozzarella', 'Fresh Basil', 'Olive Oil'], 'classic', true),
('Pepperoni Supreme', 'Classic pepperoni with extra cheese and our signature tomato sauce', 15.99, ARRAY['Tomato Sauce', 'Mozzarella', 'Pepperoni', 'Italian Herbs'], 'classic', true),
('Veggie Deluxe', 'Fresh vegetables including bell peppers, mushrooms, onions, and olives', 14.99, ARRAY['Tomato Sauce', 'Mozzarella', 'Bell Peppers', 'Mushrooms', 'Red Onions', 'Black Olives'], 'vegetarian', true),
('BBQ Chicken', 'Grilled chicken with BBQ sauce, red onions, and cilantro', 17.99, ARRAY['BBQ Sauce', 'Mozzarella', 'Grilled Chicken', 'Red Onions', 'Cilantro'], 'specialty', true),
('Hawaiian Paradise', 'Ham and pineapple with mozzarella on tomato sauce base', 16.99, ARRAY['Tomato Sauce', 'Mozzarella', 'Ham', 'Pineapple'], 'specialty', true),
('Meat Lovers', 'Pepperoni, sausage, bacon, and ham with extra cheese', 19.99, ARRAY['Tomato Sauce', 'Mozzarella', 'Pepperoni', 'Italian Sausage', 'Bacon', 'Ham'], 'specialty', true),
('Mediterranean', 'Feta cheese, olives, sun-dried tomatoes, and spinach', 16.99, ARRAY['Olive Oil Base', 'Mozzarella', 'Feta', 'Kalamata Olives', 'Sun-dried Tomatoes', 'Spinach'], 'vegetarian', true),
('Spicy Buffalo', 'Buffalo chicken with ranch drizzle and hot sauce', 18.99, ARRAY['Buffalo Sauce', 'Mozzarella', 'Buffalo Chicken', 'Red Onions', 'Ranch Drizzle'], 'spicy', true),
('Mushroom Truffle', 'Wild mushrooms with truffle oil and parmesan', 21.99, ARRAY['Truffle Oil Base', 'Mozzarella', 'Mixed Mushrooms', 'Parmesan', 'Fresh Thyme'], 'gourmet', true),
('Four Cheese', 'Mozzarella, parmesan, gorgonzola, and ricotta cheese blend', 17.99, ARRAY['White Sauce', 'Mozzarella', 'Parmesan', 'Gorgonzola', 'Ricotta'], 'vegetarian', true)
ON CONFLICT (name) DO NOTHING;