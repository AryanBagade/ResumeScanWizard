'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import StepIndicator from '@/components/ui/step-indicator';
import { useWizard, WizardStep } from '@/hooks/useWizard';

interface WizardContainerProps {
  steps: WizardStep[];
  onComplete?: (data: Record<string, any>) => void;
  className?: string;
}

export default function WizardContainer({ steps, onComplete, className }: WizardContainerProps) {
  const wizard = useWizard(steps);

  const handleNext = () => {
    if (wizard.isLastStep && wizard.allStepsCompleted) {
      onComplete?.(wizard.stepData);
    } else {
      wizard.nextStep();
    }
  };

  const StepComponent = wizard.currentStepInfo?.component;

  return (
    <div className={`min-h-screen bg-gradient-to-br from-background via-background to-muted/20 ${className}`}>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 px-4"
        >
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 leading-tight">
            ResumeScan Wizard
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Follow these steps to upload, analyze, and get insights about your resume
          </p>
        </motion.div>

        {/* Step Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <StepIndicator
            steps={steps}
            currentStep={wizard.currentStep}
            completedSteps={wizard.completedSteps}
          />
        </motion.div>

        {/* Step Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <Card className="border-0 bg-background/50 backdrop-blur-sm shadow-xl">
            <div className="p-8">
              {/* Step Title */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="text-center mb-8"
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                  {wizard.currentStepInfo?.title}
                </h2>
                <p className="text-muted-foreground text-lg">
                  {wizard.currentStepInfo?.description}
                </p>
              </motion.div>

              {/* Step Component */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={wizard.currentStep}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="min-h-[400px] md:min-h-[500px] flex items-center justify-center w-full overflow-hidden"
                >
                  {StepComponent && (
                    <StepComponent
                      wizard={wizard}
                      data={wizard.currentStepData}
                      onNext={handleNext}
                      onPrev={wizard.prevStep}
                      isFirstStep={wizard.isFirstStep}
                      isLastStep={wizard.isLastStep}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </Card>
        </motion.div>

        {/* Navigation */}
        {!wizard.isLastStep && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-between items-center"
          >
            <Button
              variant="outline"
              onClick={wizard.prevStep}
              disabled={wizard.isFirstStep}
              className="flex items-center space-x-2 px-6 py-3"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </Button>

            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>Step {wizard.currentStep + 1} of {wizard.totalSteps}</span>
              <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-600 to-pink-600"
                  initial={{ width: '0%' }}
                  animate={{ width: `${wizard.progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            <Button
              onClick={handleNext}
              disabled={!wizard.isStepCompleted(wizard.currentStep)}
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>
        )}

        {/* Show back button only on final step */}
        {wizard.isLastStep && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-center"
          >
            <Button
              variant="outline"
              onClick={wizard.prevStep}
              className="flex items-center space-x-2 px-6 py-3"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Results</span>
            </Button>
          </motion.div>
        )}

        {/* Progress Summary */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-muted-foreground">
            {wizard.completedSteps.length} of {wizard.totalSteps} steps completed
          </p>
        </motion.div>
      </div>
    </div>
  );
}