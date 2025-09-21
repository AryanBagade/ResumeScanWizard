'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, FileText, Brain } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import ResumeResults from '@/components/ResumeResults';
import HonestResumeReview from '@/components/HonestResumeReview';

interface ResultsStepProps {
  wizard: any;
  data: any;
  onNext: () => void;
  onPrev: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

export default function ResultsStep({ wizard, data }: ResultsStepProps) {
  const [activeTab, setActiveTab] = useState('structured');
  const processingData = wizard.stepData.processing;
  const parsedData = processingData?.parsedData;

  useEffect(() => {
    if (parsedData) {
      // Auto-complete this step since it's just viewing results
      wizard.completeStep();
    }
  }, [parsedData, wizard]);

  if (!parsedData) {
    return (
      <div className="w-full max-w-4xl mx-auto text-center">
        <p className="text-muted-foreground">No data available to display.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-4"
      >
        <div className="flex justify-center">
          <div className="p-4 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full">
            <Eye className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <h3 className="text-xl font-semibold">Your Resume Analysis</h3>
        <p className="text-muted-foreground">
          Here's what our AI found in your resume
        </p>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="bg-muted/50 rounded-lg p-6"
      >
        <h4 className="font-semibold mb-4 text-center">Quick Overview</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="space-y-1">
            <p className="text-2xl font-bold text-blue-600">
              {parsedData.experience?.length || 0}
            </p>
            <p className="text-sm text-muted-foreground">Work Experience</p>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-green-600">
              {parsedData.education?.length || 0}
            </p>
            <p className="text-sm text-muted-foreground">Education</p>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-purple-600">
              {parsedData.skills?.length || 0}
            </p>
            <p className="text-sm text-muted-foreground">Skills</p>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-orange-600">
              {parsedData.summary ? '✓' : '✗'}
            </p>
            <p className="text-sm text-muted-foreground">Summary</p>
          </div>
        </div>
      </motion.div>

      {/* Tabbed Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Tab Navigation */}
          <div className="flex justify-center mb-6">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="structured" className="flex items-center space-x-2">
                <FileText className="w-4 h-4" />
                <span>Structured Data</span>
              </TabsTrigger>
              <TabsTrigger value="analysis" className="flex items-center space-x-2">
                <Brain className="w-4 h-4" />
                <span>AI Analysis</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Tab Content */}
          <TabsContent value="structured" className="mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <ResumeResults
                data={parsedData}
                isLoading={false}
                error=""
              />
            </motion.div>
          </TabsContent>

          <TabsContent value="analysis" className="mt-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <HonestResumeReview
                data={parsedData?.honestReview || null}
                isLoading={false}
                error=""
              />
            </motion.div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}