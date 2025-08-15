import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Navigate, Link } from 'react-router-dom';
import { PizzaGrid } from '@/components/PizzaGrid';
import { UserOrderStatus } from '@/components/UserOrderStatus';
import { Clock, Truck, ShieldCheck, Star, ChefHat, Heart, Shield, ArrowLeft } from 'lucide-react';
import pizzaHeroImage from '@/assets/pizza-hero-main.jpg';

const Index = () => {
  const { user, signOut, loading } = useAuth();

  // Redirect to auth if not logged in
  if (!loading && !user) {
    return <Navigate to="/auth" replace />;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center gradient-warm">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-xl text-muted-foreground">Loading your pizza experience...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-warm">
      {/* Header */}
      <header className="glass border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
            🍕 Pizza Craft
          </h1>
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Home
              </Button>
            </Link>
            <span className="text-sm text-muted-foreground">
              Welcome, {user?.email}
            </span>
            <Button variant="ghost" asChild className="shadow-warm">
              <Link to="/profile">Profile</Link>
            </Button>
            <Button variant="outline" onClick={signOut} className="shadow-warm">
              Sign Out
            </Button>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={pizzaHeroImage} 
            alt="Delicious Pizza"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/30"></div>
        </div>
        
        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <Badge className="mb-6 text-sm px-4 py-2 bg-primary/10 text-primary border-primary/20">
              <ChefHat className="h-4 w-4 mr-2" />
              Authentic Italian Recipes
            </Badge>
            <h1 className="text-6xl md:text-7xl font-bold mb-6 gradient-primary bg-clip-text text-transparent">
              Pizza Craft
            </h1>
            <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-foreground">
              Where Every Slice Tells a Story
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed max-w-2xl">
              Experience the art of pizza making with handcrafted dough, premium ingredients, and recipes passed down through generations. 
              From classic Margherita to innovative gourmet creations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button 
                size="lg" 
                className="gradient-primary text-lg px-8 py-6 shadow-warm hover:scale-105 transition-transform"
                onClick={() => document.getElementById('pizza-section')?.scrollIntoView({ behavior: 'smooth' })}
              >
                🍕 Order Now
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-6 shadow-warm"
                onClick={() => document.getElementById('features-section')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Learn More
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border/50">
              <div className="text-center">
                <div className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">500+</div>
                <div className="text-sm text-muted-foreground">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">4.9</div>
                <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                  <Star className="h-4 w-4 fill-accent text-accent" />
                  Rating
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">30min</div>
                <div className="text-sm text-muted-foreground">Avg Delivery</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features-section" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold mb-4">Why Choose Pizza Craft?</h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're committed to delivering exceptional quality and service with every order
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="text-center shadow-card hover:shadow-warm transition-all duration-300 group">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Fast Delivery</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Fresh, hot pizzas delivered to your door in 30 minutes or less with our efficient delivery network.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="text-center shadow-card hover:shadow-warm transition-all duration-300 group">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Heart className="h-8 w-8 text-accent" />
                </div>
                <CardTitle>Premium Ingredients</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Only the finest, freshest ingredients sourced from trusted local suppliers and Italian imports.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="text-center shadow-card hover:shadow-warm transition-all duration-300 group">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-secondary/40 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Shield className="h-8 w-8 text-secondary-foreground" />
                </div>
                <CardTitle>Quality Guarantee</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  100% satisfaction guaranteed. If you're not happy with your pizza, we'll make it right.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      

      {/* Pizza Grid Section */}
      <section id="pizza-section" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">Our Pizza Collection</h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose from our carefully curated selection of artisanal pizzas, each crafted with love and the freshest ingredients.
            </p>
          </div>
          
          <PizzaGrid />
        </div>
      </section>
      
      {/* Order Status Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Track Your Orders</h3>
            <p className="text-lg text-muted-foreground">
              Stay updated with real-time order tracking from kitchen to your doorstep.
            </p>
          </div>
          
          <UserOrderStatus />
        </div>
      </section>
    </div>
  );
};

export default Index;