-- Update existing pizzas with image URLs
UPDATE public.pizzas SET image_url = 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop' WHERE name = 'Margherita Pizza';
UPDATE public.pizzas SET image_url = 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop' WHERE name = 'Pepperoni Classic';
UPDATE public.pizzas SET image_url = 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=400&h=300&fit=crop' WHERE name = 'Veggie Supreme';
UPDATE public.pizzas SET image_url = 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=400&h=300&fit=crop' WHERE name = 'BBQ Chicken Delight';
UPDATE public.pizzas SET image_url = 'https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=400&h=300&fit=crop' WHERE name = 'Hawaiian Paradise';
UPDATE public.pizzas SET image_url = 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=300&fit=crop' WHERE name = 'Four Cheese Fantasy';
UPDATE public.pizzas SET image_url = 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop' WHERE name = 'Spicy Italian';
UPDATE public.pizzas SET image_url = 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&h=300&fit=crop' WHERE name = 'Mediterranean Magic';
UPDATE public.pizzas SET image_url = 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop' WHERE name = 'Truffle Mushroom Gourmet';
UPDATE public.pizzas SET image_url = 'https://images.unsplash.com/photo-1606502281004-e22bba8e9da2?w=400&h=300&fit=crop' WHERE name = 'Buffalo Ranch Pizza';

-- Update prices to Indian Rupees (multiply by ~83, the approximate USD to INR rate)
UPDATE public.pizzas SET price = ROUND(price * 83);

-- Add INR suffix to make it clear these are Indian Rupees
-- Note: We'll handle the currency symbol in the frontend