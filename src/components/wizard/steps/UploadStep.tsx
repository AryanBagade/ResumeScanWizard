'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FileUpload from '@/components/FileUpload';

interface UploadStepProps {
  wizard: any;
  data: any;
  onNext: () => void;
  onPrev: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

export default function UploadStep({ wizard, data, onNext }: UploadStepProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(data.file || null);
  const [error, setError] = useState<string>('');

  const handleFileSelect = useCallback(async (file: File) => {
    setIsUploading(true);
    setError('');
    setUploadedFile(file);

    try {
      // Store file info in wizard data
      wizard.updateStepData('upload', {
        file,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        uploadedAt: new Date().toISOString()
      });

      // Mark step as completed
      wizard.completeStep();

      // Auto-advance to next step after a brief delay
      setTimeout(() => {
        onNext();
      }, 1000);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  }, [wizard, onNext]);

  const isCompleted = wizard.isStepCompleted(wizard.currentStep);

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8">
      {!uploadedFile ? (
        <>
          {/* Upload Instructions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-4"
          >
            <div className="flex justify-center">
              <div className="p-4 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-full">
                <Upload className="w-8 h-8 text-purple-600" />
              </div>
            </div>
            <h3 className="text-xl font-semibold">Upload Your Resume</h3>
            <p className="text-muted-foreground">
              Choose your resume file to get started. We support PDF, DOC, DOCX, and TXT formats.
            </p>
          </motion.div>

          {/* File Upload Component */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <FileUpload
              onFileSelect={handleFileSelect}
              isUploading={isUploading}
            />
          </motion.div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg p-4"
            >
              <p className="text-red-700 dark:text-red-300 text-center">{error}</p>
            </motion.div>
          )}
        </>
      ) : (
        /* Upload Success */
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-6"
        >
          <div className="flex justify-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-4 bg-gradient-to-r from-green-600/10 to-emerald-600/10 rounded-full"
            >
              <CheckCircle className="w-12 h-12 text-green-600" />
            </motion.div>
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-green-600">Upload Successful!</h3>
            <p className="text-muted-foreground">Your resume has been uploaded successfully</p>
          </div>

          {/* File Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-muted/50 rounded-lg p-4 space-y-2"
          >
            <div className="flex items-center justify-center space-x-2">
              <FileText className="w-5 h-5 text-muted-foreground" />
              <span className="font-medium">{uploadedFile.name}</span>
            </div>
            <div className="text-sm text-muted-foreground">
              {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB • {uploadedFile.type || 'Unknown type'}
            </div>
          </motion.div>

          {/* Continue Button */}
          {isCompleted && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button
                onClick={onNext}
                size="lg"
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                Continue to Processing
              </Button>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
}