'use client';

interface HonestReviewData {
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
}

interface HonestResumeReviewProps {
  data: HonestReviewData | null;
  isLoading: boolean;
  error?: string;
}

export default function HonestResumeReview({ data, isLoading, error }: HonestResumeReviewProps) {
  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-red-200 dark:bg-red-700 rounded w-3/4"></div>
          <div className="h-4 bg-red-200 dark:bg-red-700 rounded w-1/2"></div>
          <div className="h-4 bg-red-200 dark:bg-red-700 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6">
        <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                Error getting honest review
              </h3>
              <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                {error}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <span className="text-3xl">💀</span>
        <h2 className="text-2xl font-bold text-red-600 dark:text-red-400">
          Honest Resume Review
        </h2>
        <span className="text-3xl">🔥</span>
      </div>

      <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950 dark:to-orange-950 rounded-lg p-4 border-l-4 border-red-500">
        <p className="text-sm text-red-700 dark:text-red-300 font-medium">
          ⚠️ Warning: This is a brutally honest AI review that may contain harsh but truthful observations about your resume.
        </p>
      </div>

      {/* Experience Section */}
      {data.Experience && data.Experience.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border-l-4 border-red-500 p-6">
          <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-4 flex items-center">
            <span className="mr-2">💼</span>
            Experience (Honest Version)
          </h3>
          <div className="space-y-4">
            {data.Experience.map((exp, index) => (
              <div key={index} className="border-l-4 border-orange-200 dark:border-orange-800 pl-4 bg-red-50 dark:bg-red-950 p-4 rounded">
                <h4 className="font-medium text-gray-900 dark:text-gray-100">
                  {exp['Role Title']}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {exp.Company}
                </p>
                <p className="text-red-700 dark:text-red-300 text-sm leading-relaxed">
                  {exp.Description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects and Awards Section */}
      {data.ProjectsAndAwards && data.ProjectsAndAwards.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border-l-4 border-orange-500 p-6">
          <h3 className="text-lg font-semibold text-orange-600 dark:text-orange-400 mb-4 flex items-center">
            <span className="mr-2">🏆</span>
            Projects & Awards (Honest Version)
          </h3>
          <div className="space-y-4">
            {data.ProjectsAndAwards.map((project, index) => (
              <div key={index} className="border-l-4 border-red-200 dark:border-red-800 pl-4 bg-orange-50 dark:bg-orange-950 p-4 rounded">
                <h4 className="font-medium text-gray-900 dark:text-gray-100">
                  {project['Role Title']}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {project.Company}
                </p>
                <p className="text-orange-700 dark:text-orange-300 text-sm leading-relaxed">
                  {project.Description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No data message */}
      {(!data.Experience || data.Experience.length === 0) &&
       (!data.ProjectsAndAwards || data.ProjectsAndAwards.length === 0) && (
        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-8 text-center">
          <span className="text-4xl mb-4 block">🤷‍♂️</span>
          <p className="text-gray-600 dark:text-gray-400">
            Even the brutal AI reviewer couldn't find anything worth roasting.
            Your resume might be too bland to criticize!
          </p>
        </div>
      )}
    </div>
  );
}