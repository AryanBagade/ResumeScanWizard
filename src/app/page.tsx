'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import FileUpload from '@/components/FileUpload';
import ResumeResults from '@/components/ResumeResults';
import HonestResumeReview from '@/components/HonestResumeReview';
import InterviewModal from '@/components/InterviewModal';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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
  honestReview?: {
    Experience?: Array<{
      'Role Title': string;
      Company: string;
      Description: string;
    }>;
    ProjectsAndAwards?: Array<{
      'Role Title': string;
      Company: string;
      Description: string;
    }>;
  };
}

export default function Home() {
  const [isUploading, setIsUploading] = useState(false);
  const [parsedData, setParsedData] = useState<ParsedResumeData | null>(null);
  const [error, setError] = useState<string>('');
  const [isInterviewModalOpen, setIsInterviewModalOpen] = useState(false);

  const handleFileSelect = async (file: File) => {
    setIsUploading(true);
    setError('');
    setParsedData(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/parse-resume', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to parse resume');
      }

      setParsedData(result.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
              ResumeScan
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Upload your resume and get structured data powered by Grok AI, plus a brutally honest review
            </p>
          </motion.div>
        </div>

        {/* Upload Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <FileUpload onFileSelect={handleFileSelect} isUploading={isUploading} />
        </motion.div>

        {/* Results Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-12"
        >
          <ResumeResults
            data={parsedData}
            isLoading={isUploading}
            error={error}
          />

          <HonestResumeReview
            data={parsedData?.honestReview || null}
            isLoading={isUploading}
            error={error}
          />

          {/* Interview CTA */}
          {parsedData && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-4xl mx-auto"
            >
              <Card className="overflow-hidden border-0 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 p-[1px]">
                <div className="bg-background rounded-lg p-8 text-center">
                  <motion.div
                    animate={{
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                    className="mb-6"
                  >
                    <div className="flex items-center justify-center space-x-3 text-4xl">
                      <span>🎯</span>
                      <span>🔥</span>
                      <span>💀</span>
                    </div>
                  </motion.div>

                  <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Ready for the Brutal Interview?
                  </h2>

                  <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                    Think your resume is impressive? Let our savage AI interviewer put you to the test with questions based on your actual resume data!
                  </p>

                  <Button
                    onClick={() => setIsInterviewModalOpen(true)}
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold px-8 py-4 rounded-xl transform transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    <span className="mr-2">🎭</span>
                    Start Brutal AI Interview
                    <span className="ml-2">→</span>
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}
        </motion.div>

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
