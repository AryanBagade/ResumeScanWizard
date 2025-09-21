'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Video, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import InterviewModal from '@/components/InterviewModal';
import Link from 'next/link';

interface ParsedResumeData {
  name?: string;
  email?: string;
  phone?: string;
  summary?: string;
  experience?: Array<{
    company: string;
    position: string;
    duration: string;
    description: string;
  }>;
  education?: Array<{
    institution: string;
    degree: string;
    year: string;
  }>;
  skills?: string[];
  rawText?: string;
  honestReview?: any;
}

function InterviewContent() {
  const searchParams = useSearchParams();
  const [isInterviewModalOpen, setIsInterviewModalOpen] = useState(false);
  const [parsedData, setParsedData] = useState<ParsedResumeData | null>(null);

  useEffect(() => {
    // Get data from URL params or sessionStorage
    const dataParam = searchParams.get('data');
    if (dataParam) {
      try {
        const data = JSON.parse(decodeURIComponent(dataParam));
        setParsedData(data);
      } catch (e) {
        console.error('Failed to parse data:', e);
      }
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 px-4"
        >
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent mb-4 leading-tight">
            AI Interview Simulator
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Face our brutal AI interviewer who has studied your resume. Are you ready for the challenge?
          </p>
        </motion.div>

        {/* Main Interview Card */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <Card className="overflow-hidden border-0 bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 p-[2px] shadow-2xl">
            <div className="bg-background rounded-lg p-8 h-full">
              <div className="text-center space-y-8">
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
                  <div className="p-8 bg-gradient-to-r from-red-600/20 to-orange-600/20 rounded-full">
                    <Video className="w-16 h-16 text-red-600" />
                  </div>
                </motion.div>

                {/* Content */}
                <div className="space-y-6">
                  <h2 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                    🎯 Ready for the Challenge?
                  </h2>
                  <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                    Our AI interviewer has analyzed your resume and prepared personalized, challenging questions.
                    This isn't just practice - it's preparation for the real world. <strong>No mercy, no shortcuts.</strong> 🔥
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
                    <div className="bg-red-50 dark:bg-red-950/20 rounded-lg p-4">
                      <div className="text-2xl mb-2">💀</div>
                      <h3 className="font-semibold text-red-700 dark:text-red-300">Brutal Questions</h3>
                      <p className="text-sm text-red-600 dark:text-red-400">No softball questions here</p>
                    </div>
                    <div className="bg-orange-50 dark:bg-orange-950/20 rounded-lg p-4">
                      <div className="text-2xl mb-2">🎭</div>
                      <h3 className="font-semibold text-orange-700 dark:text-orange-300">Personalized</h3>
                      <p className="text-sm text-orange-600 dark:text-orange-400">Based on your actual resume</p>
                    </div>
                    <div className="bg-yellow-50 dark:bg-yellow-950/20 rounded-lg p-4">
                      <div className="text-2xl mb-2">⚡</div>
                      <h3 className="font-semibold text-yellow-700 dark:text-yellow-300">Real Practice</h3>
                      <p className="text-sm text-yellow-600 dark:text-yellow-400">Authentic interview experience</p>
                    </div>
                  </div>
                </div>

                {/* Warning */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6"
                >
                  <div className="flex items-start space-x-3">
                    <span className="text-yellow-600 text-2xl">⚠️</span>
                    <div className="text-left">
                      <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                        Warning: Tough Interview Ahead
                      </h3>
                      <p className="text-sm text-yellow-700 dark:text-yellow-300">
                        This AI interviewer will be challenging, direct, and uncompromising.
                        It has your resume data and will use it to ask difficult questions.
                        Be prepared for a real interview experience.
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Action Button */}
                <Button
                  onClick={() => setIsInterviewModalOpen(true)}
                  size="lg"
                  className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold px-8 sm:px-16 py-4 sm:py-6 rounded-xl transform transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl text-lg sm:text-xl"
                >
                  <span className="mr-3">🎭</span>
                  Start Brutal AI Interview
                  <span className="ml-3">→</span>
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex justify-between items-center"
        >
          <Link href="/">
            <Button variant="outline" className="flex items-center space-x-2 px-6 py-3">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Analysis</span>
            </Button>
          </Link>

          <Link href="/feedback">
            <Button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              <span>Continue to Feedback</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>

        {/* Interview Modal */}
        <InterviewModal
          isOpen={isInterviewModalOpen}
          onClose={() => setIsInterviewModalOpen(false)}
          resumeText={parsedData?.rawText || ''}
          parsedData={parsedData}
        />
      </div>
    </div>
  );
}

export default function InterviewPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-lg text-muted-foreground">Loading Interview...</p>
        </div>
      </div>
    }>
      <InterviewContent />
    </Suspense>
  );
}