'use client';

import { useState } from 'react';

interface InterviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  resumeText: string;
  parsedData: any;
}

export default function InterviewModal({ isOpen, onClose, resumeText, parsedData }: InterviewModalProps) {
  const [isStarting, setIsStarting] = useState(false);
  const [conversationUrl, setConversationUrl] = useState<string | null>(null);
  const [error, setError] = useState<string>('');

  const startInterview = async () => {
    setIsStarting(true);
    setError('');

    try {
      const response = await fetch('/api/start-interview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resumeText,
          parsedData,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to start interview');
      }

      if (result.conversation?.conversation_url) {
        setConversationUrl(result.conversation.conversation_url);
      } else {
        throw new Error('No conversation URL received');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsStarting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white p-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🎯</span>
              <h2 className="text-2xl font-bold">AI Interview Simulator</h2>
              <span className="text-2xl">🔥</span>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 text-2xl"
            >
              ×
            </button>
          </div>
          <p className="mt-2 text-red-100">
            Prepare yourself for a brutally honest AI interviewer who's read your resume!
          </p>
        </div>

        <div className="p-6">
          {!conversationUrl ? (
            <div className="text-center space-y-6">
              <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <span className="text-yellow-600 text-xl">⚠️</span>
                  <div className="text-left">
                    <h3 className="font-semibold text-yellow-800 dark:text-yellow-200">
                      Warning: Brutal Interview Ahead
                    </h3>
                    <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                      This AI interviewer will be smug, insulting, and patronizing. It has your resume data and will use it against you professionally. Are you ready?
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  What to expect:
                </h3>
                <ul className="text-left space-y-2 text-gray-600 dark:text-gray-400">
                  <li className="flex items-center space-x-2">
                    <span className="text-red-500">💀</span>
                    <span>The AI knows your resume inside and out</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-orange-500">🔥</span>
                    <span>Expect condescending and brutal questions</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-yellow-500">⚡</span>
                    <span>No follow-up questions - just professional bullying</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-blue-500">🎯</span>
                    <span>Perfect practice for real interviews</span>
                  </li>
                </ul>
              </div>

              {error && (
                <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg p-4">
                  <p className="text-red-700 dark:text-red-300">{error}</p>
                </div>
              )}

              <button
                onClick={startInterview}
                disabled={isStarting}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                  isStarting
                    ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white'
                }`}
              >
                {isStarting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Starting Brutal Interview...</span>
                  </div>
                ) : (
                  '🎯 Start the Brutal Interview'
                )}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <p className="text-green-700 dark:text-green-300 font-semibold">
                  🎉 Interview Started! Good luck surviving this AI interviewer.
                </p>
              </div>

              <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 aspect-video flex items-center justify-center">
                <iframe
                  src={conversationUrl}
                  className="w-full h-full rounded-lg border-0"
                  allow="camera; microphone"
                  title="AI Interview"
                />
              </div>

              <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                <p>💡 Tip: Be confident, but expect some brutal feedback!</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}