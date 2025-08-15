import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Package, Plus, Minus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Mock data - will switch to real Supabase data once types are updated
const mockInventory = [
  { id: '1', item_type: 'base', item_name: 'Thin Crust', current_stock: 15, threshold_level: 20, unit: 'pieces' },
  { id: '2', item_type: 'base', item_name: 'Thick Crust', current_stock: 45, threshold_level: 20, unit: 'pieces' },
  { id: '3', item_type: 'sauce', item_name: 'Tomato', current_stock: 25, threshold_level: 30, unit: 'portions' },
  { id: '4', item_type: 'sauce', item_name: 'BBQ', current_stock: 80, threshold_level: 25, unit: 'portions' },
  { id: '5', item_type: 'cheese', item_name: 'Mozzarella', current_stock: 200, threshold_level: 50, unit: 'portions' },
  { id: '6', item_type: 'cheese', item_name: 'Cheddar', current_stock: 150, threshold_level: 40, unit: 'portions' },
  { id: '7', item_type: 'vegetable', item_name: 'Mushrooms', current_stock: 10, threshold_level: 40, unit: 'portions' },
  { id: '8', item_type: 'vegetable', item_name: 'Bell Peppers', current_stock: 100, threshold_level: 35, unit: 'portions' },
];

interface InventoryItem {
  id: string;
  item_type: string;
  item_name: string;
  current_stock: number;
  threshold_level: number;
  unit: string;
}

export function InventoryManagement() {
  const [inventory, setInventory] = useState<InventoryItem[]>(mockInventory);
  const { toast } = useToast();

  const lowStockItems = inventory.filter(item => item.current_stock <= item.threshold_level);

  const updateStock = (itemId: string, newStock: number) => {
    setInventory(prev => prev.map(item => 
      item.id === itemId 
        ? { ...item, current_stock: Math.max(0, newStock) }
        : item
    ));
    
    toast({
      title: "Success",
      description: "Stock updated successfully",
    });
  };

  const updateThreshold = (itemId: string, newThreshold: number) => {
    setInventory(prev => prev.map(item => 
      item.id === itemId 
        ? { ...item, threshold_level: Math.max(1, newThreshold) }
        : item
    ));
    
    toast({
      title: "Success",
      description: "Threshold updated successfully",
    });
  };


  const getStockStatus = (item: InventoryItem) => {
    if (item.current_stock === 0) return 'out-of-stock';
    if (item.current_stock <= item.threshold_level) return 'low-stock';
    return 'in-stock';
  };

  const getStockBadgeVariant = (status: string) => {
    switch (status) {
      case 'out-of-stock': return 'destructive';
      case 'low-stock': return 'secondary';
      default: return 'default';
    }
  };

  const groupedInventory = inventory.reduce((acc, item) => {
    if (!acc[item.item_type]) {
      acc[item.item_type] = [];
    }
    acc[item.item_type].push(item);
    return acc;
  }, {} as Record<string, InventoryItem[]>);

  return (
    <div className="space-y-6">
      {lowStockItems.length > 0 && (
        <Alert className="border-destructive/50 text-destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="font-medium">
            {lowStockItems.length} item(s) are running low on stock and need restocking!
          </AlertDescription>
        </Alert>
      )}

      {Object.entries(groupedInventory).map(([itemType, items]) => (
        <Card key={itemType}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 capitalize">
              <Package className="h-5 w-5" />
              {itemType}s
            </CardTitle>
            <CardDescription>
              Manage stock levels for {itemType} ingredients
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {items.map((item) => {
                const status = getStockStatus(item);
                return (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div>
                        <h4 className="font-medium">{item.item_name}</h4>
                        <p className="text-sm text-muted-foreground">
                          Threshold: {item.threshold_level} {item.unit}
                        </p>
                      </div>
                      <Badge variant={getStockBadgeVariant(status)}>
                        {item.current_stock} {item.unit}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateStock(item.id, item.current_stock - 1)}
                        disabled={item.current_stock === 0}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      
                      <Input
                        type="number"
                        value={item.current_stock}
                        onChange={(e) => updateStock(item.id, parseInt(e.target.value) || 0)}
                        className="w-20 text-center"
                        min="0"
                      />
                      
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateStock(item.id, item.current_stock + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>

                      <div className="ml-4">
                        <Label htmlFor={`threshold-${item.id}`} className="text-xs">
                          Threshold
                        </Label>
                        <Input
                          id={`threshold-${item.id}`}
                          type="number"
                          value={item.threshold_level}
                          onChange={(e) => updateThreshold(item.id, parseInt(e.target.value) || 1)}
                          className="w-20 text-center"
                          min="1"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}