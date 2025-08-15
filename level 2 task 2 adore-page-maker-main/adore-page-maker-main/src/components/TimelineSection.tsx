const TimelineSection = () => {
  const timelineEvents = [
    {
      year: "1867",
      title: "Born in Warsaw",
      description: "Born Maria Sklodowska in Warsaw, Poland, to a family of teachers."
    },
    {
      year: "1891",
      title: "Moves to Paris",
      description: "Enrolls at the University of Paris (Sorbonne) to study physics and mathematics."
    },
    {
      year: "1895",
      title: "Marries Pierre Curie",
      description: "Marries fellow scientist Pierre Curie and begins collaborative research."
    },
    {
      year: "1898",
      title: "Discovers New Elements",
      description: "Discovers polonium and radium, coining the term 'radioactivity'."
    },
    {
      year: "1903",
      title: "First Nobel Prize",
      description: "Wins Nobel Prize in Physics with Pierre Curie and Henri Becquerel."
    },
    {
      year: "1906",
      title: "Becomes Professor",
      description: "After Pierre's death, becomes first female professor at the Sorbonne."
    },
    {
      year: "1911",
      title: "Second Nobel Prize",
      description: "Wins Nobel Prize in Chemistry for discovering radium and polonium."
    },
    {
      year: "1914-1918",
      title: "WWI Service",
      description: "Develops mobile X-ray units to help wounded soldiers during WWI."
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-primary mb-16 text-center">
            Life Timeline
          </h2>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-accent transform md:-translate-x-1/2"></div>
            
            <div className="space-y-12">
              {timelineEvents.map((event, index) => (
                <div 
                  key={event.year}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-accent rounded-full transform md:-translate-x-1/2 z-10">
                    <div className="w-2 h-2 bg-primary rounded-full absolute top-1 left-1"></div>
                  </div>
                  
                  {/* Content */}
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${
                    index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'
                  }`}>
                    <div className="bg-card rounded-xl p-6 shadow-card">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-semibold">
                          {event.year}
                        </span>
                      </div>
                      <h3 className="font-playfair text-xl font-semibold text-primary mb-2">
                        {event.title}
                      </h3>
                      <p className="text-text-elegant leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;