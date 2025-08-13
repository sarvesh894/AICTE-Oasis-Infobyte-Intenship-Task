import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code2, Palette, Smartphone, Zap, Shield, Users } from "lucide-react";

const features = [
  {
    icon: Code2,
    title: "Modern Development",
    description: "Learn with the latest technologies including React, TypeScript, and Tailwind CSS for professional-grade development."
  },
  {
    icon: Palette,
    title: "Beautiful Design",
    description: "Master the art of creating visually stunning interfaces with proper color theory, typography, and spacing."
  },
  {
    icon: Smartphone,
    title: "Responsive Layouts",
    description: "Build websites that look perfect on all devices with mobile-first design principles and flexible grid systems."
  },
  {
    icon: Zap,
    title: "Performance First",
    description: "Optimize your websites for speed with modern techniques, lazy loading, and efficient code practices."
  },
  {
    icon: Shield,
    title: "Best Practices",
    description: "Follow industry standards for clean code, accessibility, SEO optimization, and maintainable architecture."
  },
  {
    icon: Users,
    title: "Community Support",
    description: "Join a thriving community of developers, get help when needed, and share your amazing creations."
  }
];

const Features = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Everything You Need to
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              Build Amazing Websites
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From foundational concepts to advanced techniques, master every aspect 
            of modern web development with our comprehensive approach.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-elegant transition-smooth hover:-translate-y-2 border-border/50 bg-card/50 backdrop-blur-sm"
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4 group-hover:shadow-glow transition-smooth">
                  <feature.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;