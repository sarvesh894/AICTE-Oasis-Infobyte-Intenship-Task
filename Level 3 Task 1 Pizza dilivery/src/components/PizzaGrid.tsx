import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { PizzaCard } from './PizzaCard';
import { PizzaBuilder } from './PizzaBuilder';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Pizza } from 'lucide-react';

interface Pizza {
  id: string;
  name: string;
  description: string;
  price: number;
  ingredients: string[];
  category: string;
  image_url?: string;
}

export const PizzaGrid = () => {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [builderOpen, setBuilderOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchPizzas();
  }, []);

  const fetchPizzas = async () => {
    try {
      const { data, error } = await supabase
        .from('pizzas')
        .select('*')
        .eq('is_available', true)
        .order('category', { ascending: true });

      if (error) throw error;
      setPizzas(data || []);
    } catch (error) {
      console.error('Error fetching pizzas:', error);
      toast({
        title: "Error",
        description: "Failed to load pizza varieties. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPizza = (pizza: Pizza) => {
    toast({
      title: "Pizza Selected!",
      description: `You selected ${pizza.name}. This will be expanded in future updates.`,
    });
  };

  const categories = ['all', ...Array.from(new Set(pizzas.map(pizza => pizza.category)))];
  const filteredPizzas = selectedCategory === 'all' 
    ? pizzas 
    : pizzas.filter(pizza => pizza.category === selectedCategory);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex gap-2">
          {[1, 2, 3, 4].map(i => (
            <Skeleton key={i} className="h-10 w-20" />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <Skeleton key={i} className="h-80" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-auto">
          {categories.map(category => (
            <TabsTrigger key={category} value={category} className="capitalize">
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
        
        <TabsContent value={selectedCategory} className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Custom Pizza Builder Card */}
            <Card className="h-full flex flex-col shadow-card hover:shadow-warm transition-all duration-300 group hover:-translate-y-1 border-2 border-dashed border-primary/30">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Plus className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl gradient-primary bg-clip-text text-transparent">
                  Build Custom Pizza
                </CardTitle>
                <p className="text-muted-foreground">
                  Create your perfect pizza with our step-by-step builder
                </p>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col justify-end">
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-2">Starting from</p>
                    <div className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
                      $12.99
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full gradient-primary shadow-warm hover:shadow-lg transition-all" 
                    onClick={() => setBuilderOpen(true)}
                  >
                    <Pizza className="h-4 w-4 mr-2" />
                    Start Building
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Pre-made Pizzas */}
            {filteredPizzas.map((pizza) => (
              <PizzaCard
                key={pizza.id}
                pizza={pizza}
                onSelectPizza={handleSelectPizza}
              />
            ))}
          </div>
          
          {filteredPizzas.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No pizzas found in this category.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Pizza Builder Modal */}
      <PizzaBuilder 
        open={builderOpen} 
        onOpenChange={setBuilderOpen} 
      />
    </div>
  );
};