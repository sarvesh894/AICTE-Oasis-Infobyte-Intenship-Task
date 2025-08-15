import HeroSection from "@/components/HeroSection";
import BiographySection from "@/components/BiographySection";
import TimelineSection from "@/components/TimelineSection";
import QuotesSection from "@/components/QuotesSection";
import GallerySection from "@/components/GallerySection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-inter">
      <HeroSection />
      <BiographySection />
      <TimelineSection />
      <QuotesSection />
      <GallerySection />
      
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-6 text-center">
          <p className="font-playfair text-xl mb-4">
            "Be less curious about people and more curious about ideas."
          </p>
          <p className="opacity-80">
            A tribute to Marie Curie - Pioneer, Scientist, Inspiration
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
