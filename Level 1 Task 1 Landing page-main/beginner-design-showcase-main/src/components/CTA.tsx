import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-hero border border-border/20 shadow-elegant">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/20" />
          
          <div className="relative z-10 px-8 py-16 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Sparkles className="h-4 w-4 text-primary-glow" />
              <span className="text-sm font-medium text-primary-glow">Start Your Journey</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Build Something
              <span className="block bg-gradient-primary bg-clip-text text-transparent">
                Incredible?
              </span>
            </h2>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of developers who have transformed their careers 
              with modern web development skills. Start creating today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" className="text-lg px-8 py-6">
                Start Learning Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button variant="outline-hero" size="lg" className="text-lg px-8 py-6">
                View Curriculum
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground mt-6">
              No credit card required • Free resources included • 30-day guarantee
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;