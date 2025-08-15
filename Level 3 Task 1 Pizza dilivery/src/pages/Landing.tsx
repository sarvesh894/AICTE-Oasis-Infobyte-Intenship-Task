import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Clock, Star, ChefHat, Heart, Shield, Users, Award, MapPin } from 'lucide-react';
import landingHeroImage from '@/assets/landing-hero.jpg';

const Landing = () => {
  return (
    <div className="min-h-screen gradient-warm">
      {/* Header */}
      <header className="glass border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
            🍕 Pizza Craft
          </h1>
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link to="/auth">Sign In</Link>
            </Button>
            <Button asChild className="gradient-primary shadow-warm">
              <Link to="/auth">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={landingHeroImage} 
            alt="Pizza Craft Restaurant"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40"></div>
        </div>
        
        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <Badge className="mb-6 text-sm px-4 py-2 bg-primary/10 text-primary border-primary/20">
              <ChefHat className="h-4 w-4 mr-2" />
              Authentic Italian Since 1952
            </Badge>
            <h1 className="text-6xl md:text-8xl font-bold mb-6 gradient-primary bg-clip-text text-transparent">
              Pizza Craft
            </h1>
            <h2 className="text-3xl md:text-5xl font-semibold mb-8 text-foreground">
              Where Every Slice Tells a Story
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed max-w-3xl">
              Experience the authentic taste of Italy with our handcrafted pizzas made from the finest ingredients. 
              From traditional wood-fired ovens to innovative gourmet creations, we bring you the perfect slice every time.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 mb-16">
              <Button 
                size="lg" 
                asChild
                className="gradient-primary text-xl px-10 py-8 shadow-warm hover:scale-105 transition-transform"
              >
                <Link to="/auth">🍕 Start Ordering</Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-xl px-10 py-8 shadow-warm"
                onClick={() => document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Learn More
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-border/50">
              <div className="text-center">
                <div className="text-4xl font-bold gradient-primary bg-clip-text text-transparent">10K+</div>
                <div className="text-sm text-muted-foreground">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold gradient-primary bg-clip-text text-transparent">4.9</div>
                <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                  <Star className="h-4 w-4 fill-accent text-accent" />
                  Rating
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold gradient-primary bg-clip-text text-transparent">25min</div>
                <div className="text-sm text-muted-foreground">Avg Delivery</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold gradient-primary bg-clip-text text-transparent">50+</div>
                <div className="text-sm text-muted-foreground">Pizza Varieties</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section id="about-section" className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-5xl font-bold mb-6">Our Story</h3>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Founded in 1952 by Giuseppe Craft in the heart of Naples, Pizza Craft has been serving 
              authentic Italian pizzas for over 70 years. Today, we bring that same passion and tradition 
              to your doorstep with modern convenience and timeless flavors.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <ChefHat className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">Traditional Recipes</h4>
                  <p className="text-muted-foreground">
                    Passed down through three generations, our recipes use only the finest San Marzano tomatoes, 
                    fresh mozzarella di bufala, and authentic Italian ingredients.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Heart className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">Made with Love</h4>
                  <p className="text-muted-foreground">
                    Every pizza is handcrafted with care by our experienced pizzaiolos who take pride 
                    in creating the perfect balance of flavors in every bite.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-secondary/40 rounded-full flex items-center justify-center flex-shrink-0">
                  <Award className="h-6 w-6 text-secondary-foreground" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">Award Winning</h4>
                  <p className="text-muted-foreground">
                    Recognized as "Best Pizza in Town" for 5 consecutive years and featured in 
                    Food & Wine Magazine as one of the top pizzerias in the region.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square rounded-lg overflow-hidden shadow-warm">
                <img 
                  src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&h=600&fit=crop" 
                  alt="Pizza Chef at work"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-background p-6 rounded-lg shadow-warm border">
                <div className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">70+</div>
                <div className="text-sm text-muted-foreground">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-5xl font-bold mb-6">Why Choose Pizza Craft?</h3>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're committed to delivering exceptional quality and service with every order, 
              ensuring your pizza experience is nothing short of perfect.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="text-center shadow-card hover:shadow-warm transition-all duration-300 group border-0 bg-gradient-to-b from-card to-muted/20">
              <CardHeader className="pb-4">
                <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Clock className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-2xl">Lightning Fast</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Fresh, hot pizzas delivered to your door in 25 minutes or less with our 
                  efficient delivery network and optimized kitchen operations.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="text-center shadow-card hover:shadow-warm transition-all duration-300 group border-0 bg-gradient-to-b from-card to-muted/20">
              <CardHeader className="pb-4">
                <div className="mx-auto w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Heart className="h-10 w-10 text-accent" />
                </div>
                <CardTitle className="text-2xl">Premium Quality</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Only the finest, freshest ingredients sourced from trusted Italian suppliers 
                  and local farms to ensure authentic flavors in every bite.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="text-center shadow-card hover:shadow-warm transition-all duration-300 group border-0 bg-gradient-to-b from-card to-muted/20">
              <CardHeader className="pb-4">
                <div className="mx-auto w-20 h-20 bg-secondary/40 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Shield className="h-10 w-10 text-secondary-foreground" />
                </div>
                <CardTitle className="text-2xl">100% Guarantee</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Complete satisfaction guaranteed. If you're not happy with your pizza, 
                  we'll make it right or provide a full refund - no questions asked.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-5xl font-bold mb-6 gradient-primary bg-clip-text text-transparent">
            Ready for the Perfect Pizza?
          </h3>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Join thousands of satisfied customers who've made Pizza Craft their go-to choice for authentic Italian pizza.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              size="lg" 
              asChild
              className="gradient-primary text-xl px-12 py-8 shadow-warm hover:scale-105 transition-transform"
            >
              <Link to="/auth">🍕 Order Your First Pizza</Link>
            </Button>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="h-5 w-5" />
              <span>Join 10,000+ happy customers</span>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h4 className="text-2xl font-bold gradient-primary bg-clip-text text-transparent mb-4">
                🍕 Pizza Craft
              </h4>
              <p className="text-muted-foreground mb-6 max-w-md">
                Bringing authentic Italian pizza tradition to your doorstep since 1952. 
                Experience the perfect blend of heritage and innovation in every slice.
              </p>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>123 Italian Street, Flavor Town, FT 12345</span>
              </div>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Quick Links</h5>
              <div className="space-y-2 text-muted-foreground">
                <div>Menu</div>
                <div>About Us</div>
                <div>Contact</div>
                <div>Careers</div>
              </div>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Customer Care</h5>
              <div className="space-y-2 text-muted-foreground">
                <div>Help Center</div>
                <div>Track Order</div>
                <div>Privacy Policy</div>
                <div>Terms of Service</div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border/50 mt-12 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 Pizza Craft. All rights reserved. Made with ❤️ for pizza lovers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;