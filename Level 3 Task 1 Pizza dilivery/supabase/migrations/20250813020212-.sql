-- Create orders table to track pizza orders
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  total_amount DECIMAL(10,2) NOT NULL,
  order_status TEXT NOT NULL DEFAULT 'pending',
  payment_method TEXT DEFAULT 'razorpay',
  payment_id TEXT,
  pizza_type TEXT NOT NULL DEFAULT 'custom', -- 'custom' or 'preset'
  pizza_data JSONB NOT NULL, -- stores pizza configuration
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Users can view their own orders
CREATE POLICY "Users can view own orders" ON public.orders
  FOR SELECT USING (auth.uid() = user_id);

-- Users can create their own orders
CREATE POLICY "Users can create own orders" ON public.orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own orders
CREATE POLICY "Users can update own orders" ON public.orders
  FOR UPDATE USING (auth.uid() = user_id);

-- Admins can view all orders
CREATE POLICY "Admins can view all orders" ON public.orders
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.user_id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

-- Admins can update all orders
CREATE POLICY "Admins can update all orders" ON public.orders
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.user_id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

-- Add trigger for updated_at
CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();