'use client';

import { useState } from 'react';
import FileUpload from '@/components/FileUpload';
import ResumeResults from '@/components/ResumeResults';
import HonestResumeReview from '@/components/HonestResumeReview';

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
        </div>
      </div>
    </div>
  );
}
