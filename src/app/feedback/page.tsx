'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Download, ExternalLink, ArrowLeft, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
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

function FeedbackContent() {
  const searchParams = useSearchParams();
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

  const actions = [
    {
      id: 'feedback',
      title: 'Interview Feedback',
      description: 'Experience the truth about your resume through our interactive story',
      icon: MessageSquare,
      color: 'from-purple-600 to-pink-600',
      action: () => {
        const candidateName = parsedData?.name || 'candidate';
        window.open(`/story?name=${encodeURIComponent(candidateName)}`, '_blank');
      },
      buttonText: 'View Story'
    },
    {
      id: 'export',
      title: 'Export Results',
      description: 'Download your complete resume analysis and recommendations',
      icon: Download,
      color: 'from-green-600 to-emerald-600',
      action: () => {
        if (!parsedData) return;
        const dataStr = JSON.stringify(parsedData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `resume-analysis-${parsedData?.name || 'candidate'}.json`;
        link.click();
        URL.revokeObjectURL(url);
      },
      buttonText: 'Download'
    },
    {
      id: 'review',
      title: 'Review Analysis',
      description: 'Go back and review your parsed resume data and AI analysis',
      icon: FileText,
      color: 'from-blue-600 to-cyan-600',
      action: () => {
        window.history.back();
      },
      buttonText: 'View Results'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 px-4"
        >
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent mb-4 leading-tight">
            Post-Interview Actions
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Great job completing the interview! Here are your next steps.
          </p>
        </motion.div>

        {/* Completion Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-8 mb-12"
        >
          <div className="text-4xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-green-700 dark:text-green-300 mb-3">
            Interview Complete!
          </h2>
          <p className="text-green-600 dark:text-green-400 text-lg">
            You've successfully completed the AI interview simulation. Now you can access additional resources and feedback.
          </p>
        </motion.div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {actions.map((action, index) => {
            const IconComponent = action.icon;

            return (
              <motion.div
                key={action.id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card className="p-6 h-full border-0 bg-background/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
                  <div className="space-y-4">
                    {/* Icon */}
                    <div className="flex justify-center">
                      <div className={`p-4 bg-gradient-to-r ${action.color} bg-opacity-10 rounded-full`}>
                        <IconComponent className="w-8 h-8 text-current" style={{
                          color: action.color.includes('purple') ? '#9333ea' :
                                 action.color.includes('green') ? '#059669' :
                                 action.color.includes('blue') ? '#2563eb' : '#9333ea'
                        }} />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="text-center space-y-3">
                      <h3 className="text-xl font-semibold">{action.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {action.description}
                      </p>
                    </div>

                    {/* Action Button */}
                    <Button
                      onClick={action.action}
                      className={`w-full bg-gradient-to-r ${action.color} hover:opacity-90 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200`}
                    >
                      {action.buttonText}
                    </Button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Resources */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-8"
        >
          <Card className="border-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-[2px]">
            <div className="bg-background rounded-lg p-8">
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  🚀 What's Next?
                </h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Take advantage of all our tools to improve your interview skills and resume quality.
                  Each resource provides unique insights into different aspects of your professional presentation.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="text-center">
                    <div className="text-2xl mb-2">📊</div>
                    <h4 className="font-semibold">Analyze</h4>
                    <p className="text-sm text-muted-foreground">Review your parsed data</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl mb-2">💭</div>
                    <h4 className="font-semibold">Reflect</h4>
                    <p className="text-sm text-muted-foreground">Get honest feedback</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl mb-2">🎯</div>
                    <h4 className="font-semibold">Improve</h4>
                    <p className="text-sm text-muted-foreground">Download insights</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex justify-center"
        >
          <Link href="/interview">
            <Button variant="outline" className="flex items-center space-x-2 px-6 py-3">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Interview</span>
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export default function FeedbackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-lg text-muted-foreground">Loading Feedback...</p>
        </div>
      </div>
    }>
      <FeedbackContent />
    </Suspense>
  );
}