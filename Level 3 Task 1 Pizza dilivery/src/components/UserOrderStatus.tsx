import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle, Package, Truck, Pizza } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

interface Order {
  id: string;
  total_amount: number;
  order_status: string;
  pizza_data: any;
  created_at: string;
}

const ORDER_STATUS_CONFIG = {
  pending: { 
    label: 'Pending Payment', 
    icon: Clock, 
    color: 'secondary' as const,
    description: 'Your order is awaiting payment confirmation'
  },
  confirmed: { 
    label: 'Order Received', 
    icon: CheckCircle, 
    color: 'default' as const,
    description: 'We have received your order and processing it'
  },
  in_kitchen: { 
    label: 'In Kitchen', 
    icon: Pizza, 
    color: 'secondary' as const,
    description: 'Your delicious pizza is being prepared by our chefs'
  },
  out_for_delivery: { 
    label: 'Out for Delivery', 
    icon: Truck, 
    color: 'default' as const,
    description: 'Your order is on the way to you!'
  },
  delivered: { 
    label: 'Delivered', 
    icon: CheckCircle, 
    color: 'default' as const,
    description: 'Your order has been delivered. Enjoy your pizza!'
  },
  cancelled: { 
    label: 'Cancelled', 
    icon: Clock, 
    color: 'destructive' as const,
    description: 'Your order has been cancelled'
  },
};

export function UserOrderStatus() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!user) return;

    fetchUserOrders();
    
    // Set up real-time subscription for order status updates
    const channel = supabase
      .channel('user-orders-status-changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'orders',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          console.log('Order status updated:', payload);
          fetchUserOrders();
          
          // Show toast notification for status changes
          const newStatus = payload.new.order_status;
          const statusConfig = ORDER_STATUS_CONFIG[newStatus as keyof typeof ORDER_STATUS_CONFIG];
          if (statusConfig) {
            toast({
              title: "Order Update",
              description: statusConfig.description,
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const fetchUserOrders = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) throw error;

      setOrders(data || []);
    } catch (error) {
      console.error('Error fetching user orders:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-8">
          <p className="text-muted-foreground">Loading your orders...</p>
        </CardContent>
      </Card>
    );
  }

  if (orders.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Orders</CardTitle>
          <CardDescription>Track your pizza orders here</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center p-8">
          <p className="text-muted-foreground">No orders found</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Recent Orders</CardTitle>
        <CardDescription>Track the status of your pizza orders</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {orders.map((order) => {
            const statusConfig = ORDER_STATUS_CONFIG[order.order_status as keyof typeof ORDER_STATUS_CONFIG];
            const StatusIcon = statusConfig?.icon || Clock;
            
            return (
              <div
                key={order.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <StatusIcon className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <h4 className="font-medium">
                      Order #{order.id.slice(-8)}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(order.created_at), 'MMM dd, yyyy HH:mm')}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      ₹{order.total_amount}
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <Badge variant={statusConfig?.color || 'default'}>
                    {statusConfig?.label || order.order_status}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">
                    {statusConfig?.description || 'Status updated'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}