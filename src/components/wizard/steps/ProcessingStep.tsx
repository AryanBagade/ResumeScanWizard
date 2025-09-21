'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain, Zap, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProcessingStepProps {
  wizard: any;
  data: any;
  onNext: () => void;
  onPrev: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

export default function ProcessingStep({ wizard, data, onNext }: ProcessingStepProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTask, setCurrentTask] = useState('');
  const [parsedData, setParsedData] = useState(null);
  const [error, setError] = useState<string>('');

  const processingTasks = [
    { label: 'Reading file content...', duration: 1000 },
    { label: 'Extracting text...', duration: 1500 },
    { label: 'Analyzing with Grok AI...', duration: 3000 },
    { label: 'Generating honest review...', duration: 2000 },
    { label: 'Finalizing results...', duration: 500 },
  ];

  useEffect(() => {
    if (data && !isProcessing && !parsedData && !error) {
      startProcessing();
    }
  }, [data]);

  const startProcessing = async () => {
    setIsProcessing(true);
    setError('');

    try {
      // Simulate processing steps
      let totalProgress = 0;
      const progressIncrement = 100 / processingTasks.length;

      for (const [index, task] of processingTasks.entries()) {
        setCurrentTask(task.label);

        // Animate progress
        const startProgress = totalProgress;
        const endProgress = (index + 1) * progressIncrement;

        const animateProgress = () => {
          const duration = task.duration;
          const startTime = Date.now();

          const updateProgress = () => {
            const elapsed = Date.now() - startTime;
            const progressRatio = Math.min(elapsed / duration, 1);
            const currentProgress = startProgress + (endProgress - startProgress) * progressRatio;

            setProgress(currentProgress);

            if (progressRatio < 1) {
              requestAnimationFrame(updateProgress);
            }
          };

          updateProgress();
        };

        animateProgress();
        await new Promise(resolve => setTimeout(resolve, task.duration));
        totalProgress = endProgress;
      }

      // Actual API call
      const uploadData = wizard.stepData.upload;
      if (!uploadData?.file) {
        throw new Error('No file found to process');
      }

      const formData = new FormData();
      formData.append('file', uploadData.file);

      const response = await fetch('/api/parse-resume', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to parse resume');
      }

      setParsedData(result.data);

      // Store parsed data in wizard
      wizard.updateStepData('processing', {
        parsedData: result.data,
        processedAt: new Date().toISOString()
      });

      wizard.completeStep();

      // Auto-advance after showing success
      setTimeout(() => {
        onNext();
      }, 2000);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Processing failed');
      setIsProcessing(false);
    }
  };

  const isCompleted = wizard.isStepCompleted(wizard.currentStep);

  if (error) {
    return (
      <div className="w-full max-w-2xl mx-auto text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-4 bg-gradient-to-r from-red-600/10 to-orange-600/10 rounded-full w-fit mx-auto"
        >
          <AlertCircle className="w-12 h-12 text-red-600" />
        </motion.div>

        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-red-600">Processing Failed</h3>
          <p className="text-muted-foreground">{error}</p>
        </div>

        <Button
          onClick={() => {
            setError('');
            setParsedData(null);
            setProgress(0);
            startProcessing();
          }}
          variant="outline"
          className="px-6 py-3"
        >
          Try Again
        </Button>
      </div>
    );
  }

  if (parsedData && isCompleted) {
    return (
      <div className="w-full max-w-2xl mx-auto text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="p-4 bg-gradient-to-r from-green-600/10 to-emerald-600/10 rounded-full w-fit mx-auto"
        >
          <CheckCircle className="w-12 h-12 text-green-600" />
        </motion.div>

        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-green-600">Processing Complete!</h3>
          <p className="text-muted-foreground">
            Your resume has been successfully analyzed with AI
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-muted/50 rounded-lg p-6 space-y-4"
        >
          <h4 className="font-semibold">Processing Summary</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Candidate:</span>
              <p className="font-medium">{parsedData.name || 'Unknown'}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Experience:</span>
              <p className="font-medium">{parsedData.experience?.length || 0} positions</p>
            </div>
            <div>
              <span className="text-muted-foreground">Education:</span>
              <p className="font-medium">{parsedData.education?.length || 0} entries</p>
            </div>
            <div>
              <span className="text-muted-foreground">Skills:</span>
              <p className="font-medium">{parsedData.skills?.length || 0} listed</p>
            </div>
          </div>
        </motion.div>

        <Button
          onClick={onNext}
          size="lg"
          className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
        >
          View Results
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto text-center space-y-8">
      {/* Processing Animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative"
      >
        <div className="flex justify-center mb-6">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="p-4 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-full"
          >
            <Brain className="w-12 h-12 text-purple-600" />
          </motion.div>
        </div>

        <h3 className="text-2xl font-bold mb-2">Processing Your Resume</h3>
        <p className="text-muted-foreground mb-6">
          Our AI is analyzing your resume and generating insights...
        </p>

        {/* Progress Bar */}
        <div className="space-y-4">
          <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <div className="flex items-center justify-center space-x-2">
            <Zap className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium">{currentTask}</span>
          </div>

          <p className="text-sm text-muted-foreground">
            {Math.round(progress)}% complete
          </p>
        </div>
      </motion.div>

      {/* Processing Steps */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm"
      >
        {processingTasks.slice(0, 3).map((task, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg border transition-all duration-300 ${
              progress > (index * 20)
                ? 'bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800'
                : 'bg-muted/30 border-muted'
            }`}
          >
            <div className="flex items-center space-x-2">
              {progress > (index * 20) ? (
                <CheckCircle className="w-4 h-4 text-green-600" />
              ) : (
                <div className="w-4 h-4 rounded-full border-2 border-muted-foreground/30" />
              )}
              <span className={progress > (index * 20) ? 'text-foreground' : 'text-muted-foreground'}>
                {task.label.replace('...', '')}
              </span>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}