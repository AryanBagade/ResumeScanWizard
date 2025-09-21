'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Video, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import InterviewModal from '@/components/InterviewModal';

interface ActionsStepProps {
  wizard: any;
  data: any;
  onNext: () => void;
  onPrev: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

export default function ActionsStep({ wizard, onNext }: ActionsStepProps) {
  const [isInterviewModalOpen, setIsInterviewModalOpen] = useState(false);
  const processingData = wizard.stepData.processing;
  const parsedData = processingData?.parsedData;

  const handleStartInterview = () => {
    setIsInterviewModalOpen(true);
  };

  const handleInterviewClose = () => {
    setIsInterviewModalOpen(false);
    // Mark this step as completed when interview is closed
    wizard.completeStep();
  };

  const handleSkipToNext = () => {
    // Allow users to skip to resources without interview
    wizard.completeStep();
    onNext();
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-4"
      >
        <div className="flex justify-center">
          <div className="p-4 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-full">
            <Video className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        <h3 className="text-xl font-semibold">Ready for the Ultimate Test?</h3>
        <p className="text-muted-foreground">
          Your resume analysis is complete. Now it's time to face our AI interviewer!
        </p>
      </motion.div>

      {/* Main CTA - Interview */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        whileHover={{ y: -8, scale: 1.02 }}
        className="relative"
      >
        <Card className="overflow-hidden border-0 bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 p-[2px] shadow-2xl">
          <div className="bg-background rounded-lg p-8 h-full">
            {/* MVP Badge */}
            <div className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold px-3 py-1 rounded-full flex items-center space-x-1 shadow-lg">
              <Star className="w-3 h-3" />
              <span>MAIN FEATURE</span>
            </div>

            <div className="text-center space-y-6">
              {/* Icon */}
              <motion.div
                animate={{
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="flex justify-center"
              >
                <div className="p-6 bg-gradient-to-r from-red-600/20 to-orange-600/20 rounded-full">
                  <Video className="w-12 h-12 text-red-600" />
                </div>
              </motion.div>

              {/* Content */}
              <div className="space-y-4">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                  🎯 AI Interview Simulation
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  Face our <strong>brutal AI interviewer</strong> who has studied your resume and will challenge you with tough, personalized questions. This is where the real test begins! 🔥
                </p>

                <div className="flex justify-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1 text-red-600">
                    <span>💀</span>
                    <span>Brutal Questions</span>
                  </div>
                  <div className="flex items-center space-x-1 text-orange-600">
                    <span>🎭</span>
                    <span>Personalized</span>
                  </div>
                  <div className="flex items-center space-x-1 text-yellow-600">
                    <span>⚡</span>
                    <span>Real Practice</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <Button
                onClick={handleStartInterview}
                size="lg"
                className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold px-8 sm:px-16 py-4 sm:py-6 rounded-xl transform transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl text-lg sm:text-xl"
              >
                <span className="mr-3">🎭</span>
                Start AI Interview
                <span className="ml-3">→</span>
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Success Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-center bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-6"
      >
        <h4 className="text-lg font-semibold text-green-700 dark:text-green-300 mb-2">
          🎉 Resume Analysis Complete!
        </h4>
        <p className="text-green-600 dark:text-green-400">
          Your resume has been successfully analyzed. Now it's time to test yourself with our <strong>AI Interview Simulation</strong> - the main event!
        </p>
      </motion.div>

      {/* Skip Option */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-center"
      >
        <p className="text-sm text-muted-foreground mb-4">
          Want to skip the interview for now?
        </p>
        <Button
          onClick={handleSkipToNext}
          variant="outline"
          className="px-6 py-2"
        >
          Skip to Resources
        </Button>
      </motion.div>

      {/* Interview Modal */}
      <InterviewModal
        isOpen={isInterviewModalOpen}
        onClose={handleInterviewClose}
        resumeText={parsedData?.rawText || ''}
        parsedData={parsedData}
      />
    </div>
  );
}