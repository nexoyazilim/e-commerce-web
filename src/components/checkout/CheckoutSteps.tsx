import { Check } from 'lucide-react';

interface Step {
  id: number;
  title: string;
}

interface CheckoutStepsProps {
  currentStep: number;
}

const steps: Step[] = [
  { id: 1, title: 'Shipping Address' },
  { id: 2, title: 'Payment Method' },
  { id: 3, title: 'Review & Confirm' },
];

export function CheckoutSteps({ currentStep }: CheckoutStepsProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-1 items-center">
            <div className="flex flex-col items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors ${
                  currentStep >= step.id
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-muted-foreground bg-background text-muted-foreground'
                }`}
              >
                {currentStep > step.id ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <span>{step.id}</span>
                )}
              </div>
              <span
                className={`mt-2 text-sm font-medium ${
                  currentStep >= step.id ? 'text-foreground' : 'text-muted-foreground'
                }`}
              >
                {step.title}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`mx-2 h-1 flex-1 border-t-2 transition-colors ${
                  currentStep > step.id ? 'border-primary' : 'border-muted-foreground'
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
