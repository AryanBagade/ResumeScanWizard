'use client';

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
}

interface ResumeResultsProps {
  data: ParsedResumeData | null;
  isLoading: boolean;
  error?: string;
}

export default function ResumeResults({ data, isLoading, error }: ResumeResultsProps) {
  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
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
                Error parsing resume
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
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
        Parsed Resume Data
      </h2>

      {/* Personal Information */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.name && (
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Name</label>
              <p className="text-gray-900 dark:text-gray-100">{data.name}</p>
            </div>
          )}
          {data.email && (
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Email</label>
              <p className="text-gray-900 dark:text-gray-100">{data.email}</p>
            </div>
          )}
          {data.phone && (
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">Phone</label>
              <p className="text-gray-900 dark:text-gray-100">{data.phone}</p>
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Summary
          </h3>
          <p className="text-gray-700 dark:text-gray-300">{data.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Experience
          </h3>
          <div className="space-y-4">
            {data.experience.map((exp, index) => (
              <div key={index} className="border-l-4 border-blue-200 dark:border-blue-800 pl-4">
                <h4 className="font-medium text-gray-900 dark:text-gray-100">{exp.position}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{exp.company} • {exp.duration}</p>
                <p className="mt-2 text-gray-700 dark:text-gray-300">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Education
          </h3>
          <div className="space-y-3">
            {data.education.map((edu, index) => (
              <div key={index}>
                <h4 className="font-medium text-gray-900 dark:text-gray-100">{edu.degree}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{edu.institution} • {edu.year}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Raw Text */}
      {data.rawText && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Raw Text
          </h3>
          <pre className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap bg-gray-50 dark:bg-gray-900 p-4 rounded overflow-auto max-h-64">
            {data.rawText}
          </pre>
        </div>
      )}
    </div>
  );
}