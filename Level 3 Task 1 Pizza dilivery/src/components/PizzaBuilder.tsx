import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, Check, Pizza } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PizzaBuilderProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface CustomPizza {
  base?: string;
  sauce?: string;
  cheese?: string;
  vegetables: string[];
}

const PIZZA_BASES = [
  { name: 'Thin Crust', description: 'Crispy and light, perfect for classic flavors', price: 0 },
  { name: 'Thick Crust', description: 'Fluffy and hearty, great for loading toppings', price: 1.50 },
  { name: 'Stuffed Crust', description: 'Cheese-filled crust for extra indulgence', price: 2.50 },
  { name: 'Whole Wheat', description: 'Healthy option with nutty flavor', price: 1.00 },
  { name: 'Gluten-Free', description: 'Perfect for dietary restrictions', price: 3.00 }
];

const PIZZA_SAUCES = [
  { name: 'Classic Tomato', description: 'Traditional marinara with herbs', price: 0 },
  { name: 'BBQ Sauce', description: 'Sweet and tangy barbecue flavor', price: 0.50 },
  { name: 'White Sauce', description: 'Creamy garlic and herb base', price: 0.50 },
  { name: 'Pesto', description: 'Fresh basil and pine nut sauce', price: 1.00 },
  { name: 'Buffalo Sauce', description: 'Spicy and zesty kick', price: 0.50 }
];

const CHEESE_OPTIONS = [
  { name: 'Mozzarella', description: 'Classic stretchy cheese', price: 0 },
  { name: 'Cheddar', description: 'Sharp and flavorful', price: 0.75 },
  { name: 'Parmesan', description: 'Aged and nutty', price: 1.00 },
  { name: 'Goat Cheese', description: 'Creamy and tangy', price: 1.50 },
  { name: 'Four Cheese Blend', description: 'Mix of mozzarella, cheddar, parmesan, provolone', price: 2.00 }
];

const VEGETABLE_OPTIONS = [
  { name: 'Mushrooms', price: 0.75 },
  { name: 'Bell Peppers', price: 0.50 },
  { name: 'Red Onions', price: 0.50 },
  { name: 'Black Olives', price: 0.75 },
  { name: 'Cherry Tomatoes', price: 0.75 },
  { name: 'Spinach', price: 0.50 },
  { name: 'Jalapeños', price: 0.50 },
  { name: 'Corn', price: 0.50 },
  { name: 'Artichokes', price: 1.00 },
  { name: 'Sun-dried Tomatoes', price: 1.00 },
  { name: 'Roasted Garlic', price: 0.50 },
  { name: 'Capers', price: 0.75 }
];

const STEPS = [
  { title: 'Choose Base', description: 'Select your pizza foundation' },
  { title: 'Pick Sauce', description: 'Choose your flavor base' },
  { title: 'Select Cheese', description: 'Pick your cheese type' },
  { title: 'Add Veggies', description: 'Customize with vegetables' },
  { title: 'Review', description: 'Confirm your creation' }
];

export const PizzaBuilder = ({ open, onOpenChange }: PizzaBuilderProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [customPizza, setCustomPizza] = useState<CustomPizza>({
    vegetables: []
  });
  const { toast } = useToast();

  const calculatePrice = () => {
    const basePrice = 12.99; // Base pizza price
    const baseUpcharge = PIZZA_BASES.find(b => b.name === customPizza.base)?.price || 0;
    const sauceUpcharge = PIZZA_SAUCES.find(s => s.name === customPizza.sauce)?.price || 0;
    const cheeseUpcharge = CHEESE_OPTIONS.find(c => c.name === customPizza.cheese)?.price || 0;
    const vegetableUpcharge = customPizza.vegetables.reduce((total, veggie) => {
      const veggiePrice = VEGETABLE_OPTIONS.find(v => v.name === veggie)?.price || 0;
      return total + veggiePrice;
    }, 0);

    return basePrice + baseUpcharge + sauceUpcharge + cheeseUpcharge + vegetableUpcharge;
  };

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleVegetableToggle = (veggie: string) => {
    setCustomPizza(prev => ({
      ...prev,
      vegetables: prev.vegetables.includes(veggie)
        ? prev.vegetables.filter(v => v !== veggie)
        : [...prev.vegetables, veggie]
    }));
  };

  const handleFinish = () => {
    toast({
      title: "Custom Pizza Created!",
      description: `Your ${customPizza.base} pizza with ${customPizza.sauce} sauce is ready to order!`,
    });
    onOpenChange(false);
    // Reset for next use
    setCurrentStep(0);
    setCustomPizza({ vegetables: [] });
  };

  const isStepComplete = () => {
    switch (currentStep) {
      case 0: return !!customPizza.base;
      case 1: return !!customPizza.sauce;
      case 2: return !!customPizza.cheese;
      case 3: return true; // Vegetables are optional
      case 4: return true; // Review step
      default: return false;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Base Selection
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Choose Your Pizza Base</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PIZZA_BASES.map((base) => (
                <Card 
                  key={base.name} 
                  className={`cursor-pointer transition-all ${
                    customPizza.base === base.name 
                      ? 'ring-2 ring-primary shadow-warm' 
                      : 'hover:shadow-card'
                  }`}
                  onClick={() => setCustomPizza(prev => ({ ...prev, base: base.name }))}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-base">{base.name}</CardTitle>
                      {base.price > 0 && (
                        <Badge variant="secondary">+₹{Math.round(base.price * 83)}</Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{base.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 1: // Sauce Selection
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Pick Your Sauce</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PIZZA_SAUCES.map((sauce) => (
                <Card 
                  key={sauce.name} 
                  className={`cursor-pointer transition-all ${
                    customPizza.sauce === sauce.name 
                      ? 'ring-2 ring-primary shadow-warm' 
                      : 'hover:shadow-card'
                  }`}
                  onClick={() => setCustomPizza(prev => ({ ...prev, sauce: sauce.name }))}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-base">{sauce.name}</CardTitle>
                      {sauce.price > 0 && (
                        <Badge variant="secondary">+₹{Math.round(sauce.price * 83)}</Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{sauce.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 2: // Cheese Selection
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Select Your Cheese</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CHEESE_OPTIONS.map((cheese) => (
                <Card 
                  key={cheese.name} 
                  className={`cursor-pointer transition-all ${
                    customPizza.cheese === cheese.name 
                      ? 'ring-2 ring-primary shadow-warm' 
                      : 'hover:shadow-card'
                  }`}
                  onClick={() => setCustomPizza(prev => ({ ...prev, cheese: cheese.name }))}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-base">{cheese.name}</CardTitle>
                      {cheese.price > 0 && (
                        <Badge variant="secondary">+₹{Math.round(cheese.price * 83)}</Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{cheese.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 3: // Vegetable Selection
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Add Vegetables (Optional)</h3>
            <p className="text-sm text-muted-foreground">Select as many vegetables as you'd like!</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {VEGETABLE_OPTIONS.map((veggie) => (
                <Card 
                  key={veggie.name} 
                  className={`cursor-pointer transition-all ${
                    customPizza.vegetables.includes(veggie.name)
                      ? 'ring-2 ring-primary shadow-warm bg-primary/5' 
                      : 'hover:shadow-card'
                  }`}
                  onClick={() => handleVegetableToggle(veggie.name)}
                >
                  <CardContent className="p-3 text-center">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{veggie.name}</span>
                      {customPizza.vegetables.includes(veggie.name) && (
                        <Check className="h-4 w-4 text-primary" />
                      )}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      +₹{Math.round(veggie.price * 83)}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 4: // Review
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Review Your Custom Pizza</h3>
            
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Pizza className="h-5 w-5" />
                  Your Custom Creation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-2">Base</h4>
                    <p className="font-medium">{customPizza.base}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-2">Sauce</h4>
                    <p className="font-medium">{customPizza.sauce}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-2">Cheese</h4>
                    <p className="font-medium">{customPizza.cheese}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-2">Vegetables</h4>
                    <div className="flex flex-wrap gap-1">
                      {customPizza.vegetables.length > 0 ? (
                        customPizza.vegetables.map(veggie => (
                          <Badge key={veggie} variant="outline" className="text-xs">
                            {veggie}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-sm text-muted-foreground">None selected</span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Total Price:</span>
                    <span className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
                      ₹{Math.round(calculatePrice() * 83)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl gradient-primary bg-clip-text text-transparent">
            🍕 Custom Pizza Builder
          </DialogTitle>
        </DialogHeader>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Step {currentStep + 1} of {STEPS.length}</span>
            <span>{Math.round(((currentStep + 1) / STEPS.length) * 100)}% Complete</span>
          </div>
          <Progress value={((currentStep + 1) / STEPS.length) * 100} className="h-2" />
        </div>

        {/* Step Indicator */}
        <div className="flex justify-between mb-6">
          {STEPS.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                index <= currentStep 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted text-muted-foreground'
              }`}>
                {index < currentStep ? <Check className="h-4 w-4" /> : index + 1}
              </div>
              <div className="mt-2">
                <p className="text-xs font-medium">{step.title}</p>
                <p className="text-xs text-muted-foreground hidden md:block">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="min-h-[400px]">
          {renderStepContent()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between pt-6 border-t">
          <Button 
            variant="outline" 
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          <div className="text-lg font-semibold">
            Total: ₹{Math.round(calculatePrice() * 83)}
          </div>

          {currentStep === STEPS.length - 1 ? (
            <Button 
              onClick={handleFinish}
              className="gradient-primary shadow-warm"
            >
              Add to Order
              <Pizza className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button 
              onClick={handleNext}
              disabled={!isStepComplete()}
              className="gradient-primary"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};