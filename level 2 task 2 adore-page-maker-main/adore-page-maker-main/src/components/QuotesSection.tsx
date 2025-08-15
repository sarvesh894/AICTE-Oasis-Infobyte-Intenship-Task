const QuotesSection = () => {
  const quotes = [
    {
      text: "Nothing in life is to be feared, it is only to be understood. Now is the time to understand more, so that we may fear less.",
      context: "On the importance of scientific understanding"
    },
    {
      text: "I was taught that the way of progress was neither swift nor easy.",
      context: "Reflecting on her scientific journey"
    },
    {
      text: "You cannot hope to build a better world without improving the individuals. To that end each of us must work for his own improvement.",
      context: "On personal and social progress"
    }
  ];

  return (
    <section className="py-20 bg-accent-gradient">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-accent-foreground mb-16">
            Words of Wisdom
          </h2>
          
          <div className="grid md:grid-cols-1 gap-8">
            {quotes.map((quote, index) => (
              <div 
                key={index}
                className="bg-card/90 backdrop-blur-sm rounded-2xl p-8 shadow-elegant"
              >
                <blockquote className="text-xl lg:text-2xl font-playfair italic text-text-elegant leading-relaxed mb-4">
                  "{quote.text}"
                </blockquote>
                <p className="text-text-muted font-medium">
                  {quote.context}
                </p>
              </div>
            ))}
          </div>
          
          <div className="mt-12 p-6 bg-card/80 backdrop-blur-sm rounded-xl">
            <p className="text-lg text-text-elegant">
              <span className="font-playfair font-semibold text-primary">Marie Curie's legacy</span> continues to inspire 
              scientists, researchers, and dreamers worldwide. Her dedication to science, 
              perseverance through adversity, and groundbreaking discoveries paved the way 
              for future generations of women in science.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuotesSection;