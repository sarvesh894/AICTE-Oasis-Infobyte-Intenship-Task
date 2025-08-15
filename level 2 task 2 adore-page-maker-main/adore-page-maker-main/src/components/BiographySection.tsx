const BiographySection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-primary mb-12 text-center">
            A Life Dedicated to Science
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <div className="bg-card rounded-xl p-8 shadow-card">
                <h3 className="font-playfair text-2xl font-semibold text-primary mb-4">
                  Early Life & Education
                </h3>
                <p className="text-text-elegant leading-relaxed">
                  Born Maria Sklodowska in Warsaw, Poland, she overcame significant 
                  obstacles as a woman pursuing higher education. Unable to attend 
                  university in Poland due to her gender, she moved to Paris to 
                  study at the Sorbonne.
                </p>
              </div>
              
              <div className="bg-card rounded-xl p-8 shadow-card">
                <h3 className="font-playfair text-2xl font-semibold text-primary mb-4">
                  Scientific Breakthroughs
                </h3>
                <p className="text-text-elegant leading-relaxed">
                  Her groundbreaking research on radioactivity led to the discovery 
                  of two new elements: polonium and radium. She coined the term 
                  "radioactivity" and developed techniques for isolating radioactive isotopes.
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-card rounded-xl p-8 shadow-card">
                <h3 className="font-playfair text-2xl font-semibold text-primary mb-4">
                  Nobel Prize Legacy
                </h3>
                <p className="text-text-elegant leading-relaxed">
                  Marie Curie was the first woman to win a Nobel Prize, the first 
                  person to win Nobel Prizes in two different sciences (Physics 1903, 
                  Chemistry 1911), and remains the only person to achieve this feat.
                </p>
              </div>
              
              <div className="bg-card rounded-xl p-8 shadow-card">
                <h3 className="font-playfair text-2xl font-semibold text-primary mb-4">
                  Lasting Impact
                </h3>
                <p className="text-text-elegant leading-relaxed">
                  Her work laid the foundation for modern atomic physics and chemistry. 
                  During WWI, she developed mobile X-ray units, saving countless lives. 
                  Her legacy continues through the Curie Institute in Paris.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BiographySection;