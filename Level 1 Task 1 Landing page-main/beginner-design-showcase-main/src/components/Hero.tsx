import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/60 to-transparent" />
      
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent leading-tight">
          Build Beautiful
          <br />
          Web Experiences
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
          Master the fundamentals of web development with modern tools and create stunning, 
          responsive websites that captivate your audience.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button variant="hero" size="lg" className="text-lg px-8 py-6">
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          
          <Button variant="outline-hero" size="lg" className="text-lg px-8 py-6">
            <Play className="mr-2 h-5 w-5" />
            Watch Demo
          </Button>
        </div>
        
        {/* Stats */}
        <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mt-16 pt-8 border-t border-border/20">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-glow">10K+</div>
            <div className="text-muted-foreground">Students</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-glow">50+</div>
            <div className="text-muted-foreground">Projects</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-glow">98%</div>
            <div className="text-muted-foreground">Success Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;