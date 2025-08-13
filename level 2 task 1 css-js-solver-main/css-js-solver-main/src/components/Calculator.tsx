import { useState, useCallback, useEffect } from "react";
import { CalculatorButton } from "@/components/ui/calculator-button";

export default function Calculator() {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = useCallback((num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  }, [display, waitingForOperand]);

  const inputDecimal = useCallback(() => {
    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
    } else if (display.indexOf(".") === -1) {
      setDisplay(display + ".");
    }
  }, [display, waitingForOperand]);

  const clear = useCallback(() => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  }, []);

  const performOperation = useCallback((nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = (() => {
        switch (operation) {
          case "+":
            return currentValue + inputValue;
          case "-":
            return currentValue - inputValue;
          case "×":
            return currentValue * inputValue;
          case "÷":
            return inputValue !== 0 ? currentValue / inputValue : 0;
          default:
            return inputValue;
        }
      })();

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  }, [display, previousValue, operation]);

  const calculate = useCallback(() => {
    if (operation && previousValue !== null) {
      performOperation("=");
      setOperation(null);
      setPreviousValue(null);
      setWaitingForOperand(true);
    }
  }, [operation, previousValue, performOperation]);

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key } = event;
      
      if (key >= "0" && key <= "9") {
        inputNumber(key);
      } else if (key === ".") {
        inputDecimal();
      } else if (key === "+" || key === "-") {
        performOperation(key);
      } else if (key === "*") {
        performOperation("×");
      } else if (key === "/") {
        event.preventDefault();
        performOperation("÷");
      } else if (key === "Enter" || key === "=") {
        calculate();
      } else if (key === "Escape" || key === "c" || key === "C") {
        clear();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [inputNumber, inputDecimal, performOperation, calculate, clear]);

  const formatDisplay = (value: string) => {
    if (value.length > 12) {
      const num = parseFloat(value);
      if (Math.abs(num) >= 1e12) {
        return num.toExponential(5);
      }
      return num.toPrecision(12);
    }
    return value;
  };

  return (
    <div className="mx-auto max-w-sm p-6">
      <div className="bg-calculator-bg rounded-3xl p-6 shadow-calculator">
        {/* Display */}
        <div className="bg-calculator-display rounded-2xl p-6 mb-6">
          <div className="text-right">
            <div className="text-4xl font-light text-foreground min-h-[3rem] flex items-end justify-end overflow-hidden">
              {formatDisplay(display)}
            </div>
          </div>
        </div>

        {/* Button Grid */}
        <div className="grid grid-cols-4 gap-3">
          {/* Row 1 */}
          <CalculatorButton variant="clear" onClick={clear}>
            AC
          </CalculatorButton>
          <CalculatorButton variant="clear" onClick={() => setDisplay(display.slice(0, -1) || "0")}>
            ⌫
          </CalculatorButton>
          <CalculatorButton variant="clear">
            ±
          </CalculatorButton>
          <CalculatorButton variant="operator" onClick={() => performOperation("÷")}>
            ÷
          </CalculatorButton>

          {/* Row 2 */}
          <CalculatorButton onClick={() => inputNumber("7")}>
            7
          </CalculatorButton>
          <CalculatorButton onClick={() => inputNumber("8")}>
            8
          </CalculatorButton>
          <CalculatorButton onClick={() => inputNumber("9")}>
            9
          </CalculatorButton>
          <CalculatorButton variant="operator" onClick={() => performOperation("×")}>
            ×
          </CalculatorButton>

          {/* Row 3 */}
          <CalculatorButton onClick={() => inputNumber("4")}>
            4
          </CalculatorButton>
          <CalculatorButton onClick={() => inputNumber("5")}>
            5
          </CalculatorButton>
          <CalculatorButton onClick={() => inputNumber("6")}>
            6
          </CalculatorButton>
          <CalculatorButton variant="operator" onClick={() => performOperation("-")}>
            −
          </CalculatorButton>

          {/* Row 4 */}
          <CalculatorButton onClick={() => inputNumber("1")}>
            1
          </CalculatorButton>
          <CalculatorButton onClick={() => inputNumber("2")}>
            2
          </CalculatorButton>
          <CalculatorButton onClick={() => inputNumber("3")}>
            3
          </CalculatorButton>
          <CalculatorButton variant="operator" onClick={() => performOperation("+")}>
            +
          </CalculatorButton>

          {/* Row 5 */}
          <CalculatorButton 
            size="zero" 
            onClick={() => inputNumber("0")}
            className="col-span-2"
          >
            0
          </CalculatorButton>
          <CalculatorButton onClick={inputDecimal}>
            .
          </CalculatorButton>
          <CalculatorButton variant="equals" onClick={calculate}>
            =
          </CalculatorButton>
        </div>
      </div>
    </div>
  );
}