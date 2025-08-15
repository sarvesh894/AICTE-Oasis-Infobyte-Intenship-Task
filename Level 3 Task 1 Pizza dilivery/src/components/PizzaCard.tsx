import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Pizza {
  id: string;
  name: string;
  description: string;
  price: number;
  ingredients: string[];
  category: string;
  image_url?: string;
}

interface PizzaCardProps {
  pizza: Pizza;
  onSelectPizza?: (pizza: Pizza) => void;
}

export const PizzaCard = ({ pizza, onSelectPizza }: PizzaCardProps) => {
  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'classic':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'vegetarian':
        return 'bg-accent/10 text-accent-foreground border-accent/20';
      case 'specialty':
        return 'bg-secondary/40 text-secondary-foreground border-secondary';
      case 'spicy':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'gourmet':
        return 'bg-muted text-muted-foreground border-muted-foreground/20';
      default:
        return 'bg-muted text-muted-foreground border-muted-foreground/20';
    }
  };

  return (
    <Card className="h-full flex flex-col shadow-card hover:shadow-warm transition-all duration-300 group hover:-translate-y-1">
      {/* Pizza Image */}
      {pizza.image_url && (
        <div className="aspect-video overflow-hidden rounded-t-lg">
          <img
            src={pizza.image_url}
            alt={pizza.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      
      <CardHeader className="space-y-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl group-hover:text-primary transition-colors">
            {pizza.name}
          </CardTitle>
          <Badge className={`capitalize ${getCategoryColor(pizza.category)}`}>
            {pizza.category}
          </Badge>
        </div>
        <CardDescription className="text-muted-foreground leading-relaxed">
          {pizza.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-1 space-y-4">
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-3">Fresh Ingredients:</h4>
          <div className="flex flex-wrap gap-2">
            {pizza.ingredients.map((ingredient) => (
              <Badge 
                key={ingredient} 
                variant="outline" 
                className="text-xs px-2 py-1 bg-background/50 hover:bg-accent/20 transition-colors"
              >
                {ingredient}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-2">
          <div className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">
            ₹{pizza.price}
          </div>
          <div className="text-xs text-muted-foreground">
            per pizza
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          className="w-full gradient-primary shadow-warm hover:shadow-lg transition-all" 
          onClick={() => onSelectPizza?.(pizza)}
        >
          🍕 Select This Pizza
        </Button>
      </CardFooter>
    </Card>
  );
};