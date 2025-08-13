// Update this page (the content is just a fallback if you fail to update the page)

import Calculator from "@/components/Calculator";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-background flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Calculator</h1>
          <p className="text-muted-foreground">Modern calculator with keyboard support</p>
        </div>
        <Calculator />
        <div className="text-center mt-6 text-sm text-muted-foreground">
          Use keyboard for quick input • Press 'C' to clear
        </div>
      </div>
    </div>
  );
};

export default Index;
