'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StepIndicatorProps {
  steps: Array<{
    id: string;
    title: string;
    description: string;
  }>;
  currentStep: number;
  completedSteps: number[];
}

export default function StepIndicator({ steps, currentStep, completedSteps }: StepIndicatorProps) {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <div className="relative">
        {/* Progress Line */}
        <div className="absolute top-6 left-0 w-full h-0.5 bg-muted rounded-full">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />
        </div>

        {/* Steps */}
        <div className="relative flex justify-between">
          {steps.map((step, index) => {
            const isCompleted = completedSteps.includes(index);
            const isCurrent = currentStep === index;
            const isUpcoming = index > currentStep;

            return (
              <div key={step.id} className="flex flex-col items-center space-y-2">
                {/* Step Circle */}
                <motion.div
                  className={cn(
                    'relative flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300',
                    {
                      'bg-gradient-to-r from-purple-600 to-pink-600 border-purple-600 text-white': isCompleted,
                      'bg-gradient-to-r from-purple-600 to-pink-600 border-purple-600 text-white shadow-lg shadow-purple-500/25': isCurrent,
                      'bg-background border-muted-foreground/30 text-muted-foreground': isUpcoming,
                    }
                  )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isCompleted ? (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Check className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <motion.span
                      className="text-sm font-semibold"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {index + 1}
                    </motion.span>
                  )}

                  {/* Pulse Effect for Current Step */}
                  {isCurrent && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-pink-600"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0, 0.3],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                  )}
                </motion.div>

                {/* Step Info */}
                <motion.div
                  className="text-center max-w-[100px] sm:max-w-[120px]"
                  initial={{ opacity: 0.5 }}
                  animate={{
                    opacity: isCurrent ? 1 : isCompleted ? 0.8 : 0.5,
                    scale: isCurrent ? 1.05 : 1
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className={cn(
                    'text-xs sm:text-sm font-medium transition-colors leading-tight',
                    {
                      'text-foreground': isCurrent || isCompleted,
                      'text-muted-foreground': isUpcoming,
                    }
                  )}>
                    {step.title}
                  </h3>
                  <p className={cn(
                    'text-[10px] sm:text-xs mt-1 transition-colors leading-tight hidden sm:block',
                    {
                      'text-muted-foreground': isCurrent || isCompleted,
                      'text-muted-foreground/60': isUpcoming,
                    }
                  )}>
                    {step.description}
                  </p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}