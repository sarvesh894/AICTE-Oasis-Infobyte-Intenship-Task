import heroImage from "@/assets/marie-curie-hero.jpg";

const HeroSection = () => {
  return (
    <section className="relative bg-hero-gradient text-primary-foreground overflow-hidden">
      <div className="container mx-auto px-6 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="font-playfair text-5xl lg:text-7xl font-bold leading-tight">
                Marie Curie
              </h1>
              <p className="text-xl lg:text-2xl opacity-90 font-playfair italic">
                1867 - 1934
              </p>
              <p className="text-lg lg:text-xl opacity-80 max-w-lg">
                Pioneer of radioactivity research, first woman to win a Nobel Prize, 
                and the only person to win Nobel Prizes in two different scientific fields.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <span className="bg-accent/20 text-accent-foreground px-4 py-2 rounded-full text-sm font-medium">
                Nobel Prize Winner
              </span>
              <span className="bg-accent/20 text-accent-foreground px-4 py-2 rounded-full text-sm font-medium">
                Physicist
              </span>
              <span className="bg-accent/20 text-accent-foreground px-4 py-2 rounded-full text-sm font-medium">
                Chemist
              </span>
            </div>
          </div>
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-elegant">
              <img 
                src={heroImage} 
                alt="Marie Curie in her laboratory"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default HeroSection;