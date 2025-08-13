import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Thermometer, ArrowLeftRight } from "lucide-react";

type TemperatureUnit = "celsius" | "fahrenheit" | "kelvin";

interface ConversionResult {
  value: number;
  unit: TemperatureUnit;
  formatted: string;
}

export const TemperatureConverter = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [inputUnit, setInputUnit] = useState<TemperatureUnit>("celsius");
  const [outputUnit, setOutputUnit] = useState<TemperatureUnit>("fahrenheit");
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [error, setError] = useState<string>("");

  const unitLabels = {
    celsius: "°C",
    fahrenheit: "°F",
    kelvin: "K"
  };

  const unitNames = {
    celsius: "Celsius",
    fahrenheit: "Fahrenheit",
    kelvin: "Kelvin"
  };

  const convertTemperature = (value: number, from: TemperatureUnit, to: TemperatureUnit): number => {
    if (from === to) return value;

    // Convert to Celsius first
    let celsius: number;
    switch (from) {
      case "celsius":
        celsius = value;
        break;
      case "fahrenheit":
        celsius = (value - 32) * 5/9;
        break;
      case "kelvin":
        celsius = value - 273.15;
        break;
    }

    // Convert from Celsius to target unit
    switch (to) {
      case "celsius":
        return celsius;
      case "fahrenheit":
        return (celsius * 9/5) + 32;
      case "kelvin":
        return celsius + 273.15;
    }
  };

  const handleConvert = () => {
    setError("");
    
    if (!inputValue.trim()) {
      setError("Please enter a temperature value");
      return;
    }

    const numericValue = parseFloat(inputValue);
    
    if (isNaN(numericValue)) {
      setError("Please enter a valid number");
      return;
    }

    // Validate absolute zero constraints
    if (inputUnit === "kelvin" && numericValue < 0) {
      setError("Kelvin temperature cannot be negative");
      return;
    }
    
    if (inputUnit === "celsius" && numericValue < -273.15) {
      setError("Temperature cannot be below absolute zero (-273.15°C)");
      return;
    }
    
    if (inputUnit === "fahrenheit" && numericValue < -459.67) {
      setError("Temperature cannot be below absolute zero (-459.67°F)");
      return;
    }

    const convertedValue = convertTemperature(numericValue, inputUnit, outputUnit);
    const formatted = `${convertedValue.toFixed(2)} ${unitLabels[outputUnit]}`;
    
    setResult({
      value: convertedValue,
      unit: outputUnit,
      formatted
    });
  };

  const handleClear = () => {
    setInputValue("");
    setResult(null);
    setError("");
  };

  const swapUnits = () => {
    const temp = inputUnit;
    setInputUnit(outputUnit);
    setOutputUnit(temp);
    setResult(null);
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-elegant bg-card">
      <CardHeader className="text-center pb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Thermometer className="h-6 w-6 text-primary" />
          <CardTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Temperature Converter
          </CardTitle>
        </div>
        <p className="text-muted-foreground text-sm">
          Convert between Celsius, Fahrenheit, and Kelvin
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="temperature-input" className="text-sm font-medium">
              Temperature Value
            </Label>
            <Input
              id="temperature-input"
              type="number"
              placeholder="Enter temperature..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="text-lg transition-smooth focus:shadow-glow"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleConvert();
                }
              }}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">From</Label>
              <Select value={inputUnit} onValueChange={(value: TemperatureUnit) => setInputUnit(value)}>
                <SelectTrigger className="transition-smooth">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(unitNames).map(([key, name]) => (
                    <SelectItem key={key} value={key}>
                      {name} ({unitLabels[key as TemperatureUnit]})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">To</Label>
              <Select value={outputUnit} onValueChange={(value: TemperatureUnit) => setOutputUnit(value)}>
                <SelectTrigger className="transition-smooth">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(unitNames).map(([key, name]) => (
                    <SelectItem key={key} value={key}>
                      {name} ({unitLabels[key as TemperatureUnit]})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-2">
            <Button 
              onClick={handleConvert} 
              className="flex-1 bg-gradient-primary hover:shadow-glow transition-smooth"
              size="lg"
            >
              Convert
            </Button>
            <Button
              onClick={swapUnits}
              variant="outline"
              size="lg"
              className="transition-smooth hover:bg-accent"
            >
              <ArrowLeftRight className="h-4 w-4" />
            </Button>
            <Button
              onClick={handleClear}
              variant="outline"
              size="lg"
              className="transition-smooth hover:bg-accent"
            >
              Clear
            </Button>
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-md bg-destructive/10 border border-destructive/20">
            <p className="text-destructive text-sm font-medium">{error}</p>
          </div>
        )}

        {result && !error && (
          <div className="p-4 rounded-lg bg-gradient-primary/10 border border-primary/20">
            <h3 className="text-sm font-medium text-primary mb-2">Result</h3>
            <div className="text-2xl font-bold text-primary mb-1">
              {result.formatted}
            </div>
            <p className="text-muted-foreground text-sm">
              {inputValue} {unitLabels[inputUnit]} = {result.formatted}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};