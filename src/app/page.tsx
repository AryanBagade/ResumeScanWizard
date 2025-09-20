'use client';

import { useState } from 'react';
import FileUpload from '@/components/FileUpload';
import ResumeResults from '@/components/ResumeResults';
import HonestResumeReview from '@/components/HonestResumeReview';
import InterviewModal from '@/components/InterviewModal';

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 sm:text-5xl">
            Resume Parser
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
            Upload your resume and get structured data powered by Grok AI
          </p>
        </div>

        <div className="space-y-8">
          <FileUpload onFileSelect={handleFileSelect} isUploading={isUploading} />

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

          {parsedData && (
            <div className="w-full max-w-4xl mx-auto p-6">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-6 text-center">
                <div className="flex items-center justify-center space-x-3 mb-4">
                  <span className="text-3xl">🎯</span>
                  <h2 className="text-2xl font-bold text-white">Ready for the Interview?</h2>
                  <span className="text-3xl">🔥</span>
                </div>
                <p className="text-purple-100 mb-6">
                  Think your resume is impressive? Let our brutal AI interviewer put you to the test!
                </p>
                <button
                  onClick={() => setIsInterviewModalOpen(true)}
                  className="bg-white text-purple-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transition-colors transform hover:scale-105"
                >
                  🎭 Start Brutal AI Interview
                </button>
              </div>
            </div>
          )}
        </div>

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
