'use client';

import { motion } from 'framer-motion';
import { User, Mail, Phone, FileText, Briefcase, GraduationCap, Code, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

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
      <div className="w-full max-w-6xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="animate-pulse">
                  <div className="h-6 bg-muted rounded w-3/4"></div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="animate-pulse space-y-3">
                  <div className="h-4 bg-muted rounded w-full"></div>
                  <div className="h-4 bg-muted rounded w-2/3"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-6xl mx-auto">
        <Card className="border-destructive/50 bg-destructive/5">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-destructive/10 rounded-full flex items-center justify-center">
                  <FileText className="w-4 h-4 text-destructive" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-destructive">Error parsing resume</h3>
                <p className="text-sm text-muted-foreground mt-1">{error}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent mb-2">
          Parsed Resume Data
        </h2>
        <p className="text-muted-foreground">
          AI-extracted structured information from your resume
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Personal Information */}
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
        >
          <Card className="h-full hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-lg">
                <User className="w-5 h-5 text-primary" />
                <span>Personal Info</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {data.name && (
                <div className="flex items-center space-x-3">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p className="font-medium">{data.name}</p>
                  </div>
                </div>
              )}
              {data.email && (
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium text-sm">{data.email}</p>
                  </div>
                </div>
              )}
              {data.phone && (
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">{data.phone}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Summary */}
        {data.summary && (
          <motion.div
            custom={1}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            className="md:col-span-2"
          >
            <Card className="h-full hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <FileText className="w-5 h-5 text-primary" />
                  <span>Professional Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{data.summary}</p>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <motion.div
            custom={2}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            className="lg:col-span-2"
          >
            <Card className="h-full hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <Briefcase className="w-5 h-5 text-primary" />
                  <span>Experience</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {data.experience.map((exp, index) => (
                  <div key={index} className="relative">
                    {index > 0 && <Separator className="mb-6" />}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-lg">{exp.position}</h4>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <span className="font-medium">{exp.company}</span>
                        <span>•</span>
                        <span>{exp.duration}</span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{exp.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
          >
            <Card className="h-full hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <GraduationCap className="w-5 h-5 text-primary" />
                  <span>Education</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {data.education.map((edu, index) => (
                  <div key={index} className="space-y-1">
                    <h4 className="font-medium">{edu.degree}</h4>
                    <p className="text-sm text-muted-foreground">{edu.institution}</p>
                    <p className="text-xs text-muted-foreground">{edu.year}</p>
                    {index < data.education!.length - 1 && <Separator className="mt-3" />}
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <motion.div
            custom={4}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            className="lg:col-span-2"
          >
            <Card className="h-full hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <Code className="w-5 h-5 text-primary" />
                  <span>Skills</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {data.skills.map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                    >
                      <Badge variant="secondary" className="text-sm">
                        {skill}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Raw Text */}
        {data.rawText && (
          <motion.div
            custom={5}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            className="md:col-span-2 lg:col-span-3"
          >
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <Eye className="w-5 h-5 text-primary" />
                  <span>Raw Text</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/50 rounded-lg p-4 max-h-64 overflow-auto">
                  <pre className="text-sm text-muted-foreground whitespace-pre-wrap font-mono">
                    {data.rawText}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}