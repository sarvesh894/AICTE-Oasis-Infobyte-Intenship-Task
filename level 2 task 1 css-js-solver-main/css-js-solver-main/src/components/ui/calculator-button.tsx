import * as React from "react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const calculatorButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-2xl font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95 shadow-button",
  {
    variants: {
      variant: {
        number: "bg-calculator-number text-calculator-number-text hover:bg-calculator-number/80",
        operator: "bg-gradient-primary text-calculator-operator-text hover:brightness-110",
        clear: "bg-calculator-clear text-calculator-clear-text hover:bg-calculator-clear/80",
        equals: "bg-gradient-primary text-calculator-operator-text hover:brightness-110 col-span-2"
      },
      size: {
        default: "h-16 w-16",
        zero: "h-16 w-36 rounded-full"
      },
    },
    defaultVariants: {
      variant: "number",
      size: "default",
    },
  }
)

export interface CalculatorButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof calculatorButtonVariants> {}

const CalculatorButton = React.forwardRef<HTMLButtonElement, CalculatorButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(calculatorButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
CalculatorButton.displayName = "CalculatorButton"

export { CalculatorButton, calculatorButtonVariants }