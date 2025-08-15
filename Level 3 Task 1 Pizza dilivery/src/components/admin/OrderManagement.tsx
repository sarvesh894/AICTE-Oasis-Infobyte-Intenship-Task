import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Clock, DollarSign, User, Pizza } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

interface Order {
  id: string;
  user_id: string;
  total_amount: number;
  order_status: string;
  payment_method: string;
  payment_id: string;
  pizza_type: string;
  pizza_data: any;
  created_at: string;
  profiles?: {
    full_name: string;
    user_id: string;
  };
}

const ORDER_STATUSES = [
  { value: 'pending', label: 'Pending Payment', color: 'secondary' },
  { value: 'confirmed', label: 'Order Received', color: 'default' },
  { value: 'in_kitchen', label: 'In Kitchen', color: 'secondary' },
  { value: 'out_for_delivery', label: 'Out for Delivery', color: 'default' },
  { value: 'delivered', label: 'Delivered', color: 'default' },
  { value: 'cancelled', label: 'Cancelled', color: 'destructive' },
];

// Mock data for demonstration
const mockOrders: Order[] = [
  {
    id: '1',
    user_id: 'user1',
    total_amount: 350,
    order_status: 'pending',
    payment_method: 'razorpay',
    payment_id: 'pay_12345',
    pizza_type: 'custom',
    pizza_data: {
      base_name: 'Thin Crust',
      sauce_name: 'Tomato',
      cheese_name: 'Mozzarella',
      vegetable_names: ['Mushrooms', 'Bell Peppers']
    },
    created_at: new Date().toISOString(),
    profiles: {
      full_name: 'John Doe',
      user_id: 'user1'
    }
  },
  {
    id: '2', 
    user_id: 'user2',
    total_amount: 420,
    order_status: 'in_kitchen',
    payment_method: 'razorpay',
    payment_id: 'pay_67890',
    pizza_type: 'custom',
    pizza_data: {
      base_name: 'Thick Crust',
      sauce_name: 'BBQ',
      cheese_name: 'Cheddar',
      vegetable_names: ['Onions', 'Tomatoes']
    },
    created_at: new Date(Date.now() - 1800000).toISOString(),
    profiles: {
      full_name: 'Jane Smith',
      user_id: 'user2'
    }
  }
];

export function OrderManagement() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const { toast } = useToast();

  useEffect(() => {
    fetchOrders();
    
    // Set up real-time subscription for order changes
    const channel = supabase
      .channel('orders-admin-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'orders'
        },
        () => {
          fetchOrders();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Get profile data separately to avoid complex joins
      const ordersWithProfiles = await Promise.all(
        (data || []).map(async (order) => {
          const { data: profile } = await supabase
            .from('profiles')
            .select('full_name')
            .eq('user_id', order.user_id)
            .single();
          
          return {
            ...order,
            profiles: profile ? {
              full_name: profile.full_name,
              user_id: order.user_id
            } : undefined
          };
        })
      );
      
      setOrders(ordersWithProfiles);
    } catch (error) {
      console.error('Error fetching orders:', error);
      // Fallback to mock data if real data fails
      setOrders(mockOrders);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ order_status: newStatus })
        .eq('id', orderId);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Order status updated to ${ORDER_STATUSES.find(s => s.value === newStatus)?.label}`,
      });
    } catch (error) {
      console.error('Error updating order status:', error);
      toast({
        title: "Error", 
        description: "Failed to update order status",
        variant: "destructive"
      });
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    const statusConfig = ORDER_STATUSES.find(s => s.value === status);
    return statusConfig?.color as any || 'default';
  };

  const filteredOrders = orders.filter(order => 
    statusFilter === 'all' || order.order_status === statusFilter
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-muted-foreground">Loading orders...</p>
      </div>
    );
  }


  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Order Filters</CardTitle>
          <CardDescription>Filter orders by status</CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full max-w-xs">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Orders</SelectItem>
              {ORDER_STATUSES.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {filteredOrders.map((order) => (
          <Card key={order.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Pizza className="h-5 w-5" />
                  Order #{order.id.slice(-8)}
                </CardTitle>
                <Badge variant={getStatusBadgeVariant(order.order_status)}>
                  {ORDER_STATUSES.find(s => s.value === order.order_status)?.label || order.order_status}
                </Badge>
              </div>
              <CardDescription className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {order.profiles?.full_name || 'Unknown Customer'}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {format(new Date(order.created_at), 'MMM dd, yyyy HH:mm')}
                </span>
                <span className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4" />
                  ₹{order.total_amount}
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Pizza Details</h4>
                  <div className="text-sm text-muted-foreground space-y-1">
                    {order.pizza_data?.base_name && (
                      <p>Base: {order.pizza_data.base_name}</p>
                    )}
                    {order.pizza_data?.sauce_name && (
                      <p>Sauce: {order.pizza_data.sauce_name}</p>
                    )}
                    {order.pizza_data?.cheese_name && (
                      <p>Cheese: {order.pizza_data.cheese_name}</p>
                    )}
                    {order.pizza_data?.vegetable_names && order.pizza_data.vegetable_names.length > 0 && (
                      <p>Vegetables: {order.pizza_data.vegetable_names.join(', ')}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <label htmlFor={`status-${order.id}`} className="text-sm font-medium">
                    Update Status:
                  </label>
                  <Select
                    value={order.order_status}
                    onValueChange={(value) => updateOrderStatus(order.id, value)}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ORDER_STATUSES.map((status) => (
                        <SelectItem key={status.value} value={status.value}>
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <Card>
          <CardContent className="flex items-center justify-center p-8">
            <p className="text-muted-foreground">No orders found</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}