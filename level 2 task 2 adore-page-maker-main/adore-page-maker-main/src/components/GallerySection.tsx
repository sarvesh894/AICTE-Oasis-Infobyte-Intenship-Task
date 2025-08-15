import labImage from "@/assets/marie-curie-lab.jpg";
import nobelImage from "@/assets/marie-curie-nobel.jpg";

const GallerySection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-primary mb-16 text-center">
            Gallery
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-card rounded-xl overflow-hidden shadow-card">
                <img 
                  src={labImage} 
                  alt="Marie Curie working in her laboratory"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-playfair text-xl font-semibold text-primary mb-2">
                    In the Laboratory
                  </h3>
                  <p className="text-text-elegant">
                    Marie Curie spent countless hours in her laboratory, working with 
                    radioactive materials that would ultimately contribute to her death. 
                    Her dedication to science was unwavering.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-card rounded-xl overflow-hidden shadow-card">
                <img 
                  src={nobelImage} 
                  alt="Marie Curie at Nobel Prize ceremony"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-playfair text-xl font-semibold text-primary mb-2">
                    Nobel Prize Recognition
                  </h3>
                  <p className="text-text-elegant">
                    The first woman to win a Nobel Prize and the only person to win 
                    Nobel Prizes in two different scientific disciplines - a testament 
                    to her extraordinary contributions to science.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-primary/5 rounded-xl p-6 text-center">
              <div className="text-3xl font-playfair font-bold text-primary mb-2">2</div>
              <div className="text-text-elegant">Nobel Prizes Won</div>
            </div>
            <div className="bg-primary/5 rounded-xl p-6 text-center">
              <div className="text-3xl font-playfair font-bold text-primary mb-2">2</div>
              <div className="text-text-elegant">Elements Discovered</div>
            </div>
            <div className="bg-primary/5 rounded-xl p-6 text-center">
              <div className="text-3xl font-playfair font-bold text-primary mb-2">1st</div>
              <div className="text-text-elegant">Woman Nobel Laureate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;