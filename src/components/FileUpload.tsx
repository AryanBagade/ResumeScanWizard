'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, File, FileText, CheckCircle2, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  isUploading: boolean;
}

export default function FileUpload({ onFileSelect, isUploading }: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setUploadedFile(file);
      onFileSelect(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFile(file);
      onFileSelect(file);
    }
  };

  const onButtonClick = () => {
    inputRef.current?.click();
  };

  const getFileIcon = (filename: string) => {
    const ext = filename.toLowerCase().split('.').pop();
    if (ext === 'pdf') return <FileText className="w-8 h-8 text-red-500" />;
    if (ext === 'doc' || ext === 'docx') return <File className="w-8 h-8 text-blue-500" />;
    return <FileText className="w-8 h-8 text-gray-500" />;
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <motion.div
            className={`relative border-2 border-dashed rounded-lg transition-all duration-300 ${
              dragActive
                ? 'border-primary bg-primary/5'
                : uploadedFile && !isUploading
                ? 'border-green-500 bg-green-50 dark:bg-green-950/20'
                : 'border-muted-foreground/25 hover:border-muted-foreground/50'
            } ${isUploading ? 'opacity-75' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            initial={{ scale: 0.98 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: dragActive ? 1.02 : 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <input
              ref={inputRef}
              type="file"
              className="hidden"
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleChange}
              disabled={isUploading}
            />

            <div className="p-12">
              <AnimatePresence mode="wait">
                {isUploading ? (
                  <motion.div
                    key="uploading"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-center space-y-6"
                  >
                    <div className="flex justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 300 300"
                        className="w-32 h-32"
                      >
                        <defs>
                          <g id="code-block" className="code-block">
                            <rect ry="0" y="862" x="60" height="7.5" width="74" className="code-line" />
                            <rect ry="0" y="874" x="96" height="7.5" width="28" className="code-line" />
                            <rect width="54" height="7.5" x="60" y="886" ry="0" className="code-line" />
                            <rect ry="0" y="897" x="60" height="7.5" width="74" className="code-line" />
                            <rect width="56" height="7.5" x="78" y="909" ry="0" className="code-line code-line-special" />
                            <rect ry="0" y="921" x="83" height="7.5" width="51" className="code-line" />
                            <rect width="51" height="7.5" x="73" y="932" ry="0" className="code-line" />
                            <rect ry="0" y="944" x="72" height="7.5" width="62" className="code-line code-line-keyword" />
                            <rect width="74" height="7.5" x="60" y="956" ry="0" className="code-line code-line-keyword" />
                            <rect ry="0" y="967" x="50" height="7.5" width="84" className="code-line" />
                            <rect width="64" height="7.5" x="60" y="979" ry="0" className="code-line" />
                            <rect ry="0" y="991" x="60" height="7.5" width="74" className="code-line code-line-string" />
                            <rect width="41" height="7.5" x="93" y="1003" ry="0" className="code-line" />
                            <rect ry="0" y="1014" x="66" height="7.5" width="58" className="code-line" />
                            <rect width="58" height="7.5" x="56" y="1026" ry="0" className="code-line" />
                            <rect ry="0" y="1038" x="50" height="7.5" width="74" className="code-line" />
                            <rect width="46" height="7.5" x="88" y="1049" ry="0" className="code-line" />
                            <rect ry="0" y="1061" x="105" height="7.5" width="19" className="code-line" />
                            <rect width="38" height="7.5" x="96" y="1073" ry="0" className="code-line" />
                            <rect ry="0" y="1084" x="73" height="7.5" width="51" className="code-line" />
                            <rect ry="0" y="1096" x="88" height="7.5" width="26" className="code-line" />
                            <rect width="56" height="7.5" x="68" y="1108" ry="0" className="code-line" />
                            <rect ry="0" y="1120" x="100" height="7.5" width="24" className="code-line" />
                            <rect width="74" height="7.5" x="50" y="1131" ry="0" className="code-line" />
                          </g>
                          <clipPath id="spec-left">
                            <path d="M85 860c-10 1-25 1-28 13-3 15-3 32 6 45 7 11 23 9 35 9 19-1 35-16 40-34 2-8 4-14 1-19-6-10-20-12-31-13l-23-1z" fill="#333" />
                          </clipPath>
                          <clipPath id="spec-right">
                            <path d="M215 860c10 1 24 1 28 13 3 15 3 32-6 45-7 11-23 9-35 9-19-1-35-16-40-34-2-8-4-14-1-19 6-10 20-12 31-13l23-1z" fill="#333" />
                          </clipPath>
                        </defs>
                        <g transform="matrix(1.34105 0 0 1.34105 -51 -1050)">
                          <path className="bear__fur" d="M243 894c0 61-36 106-94 106-55 0-92-45-92-106s38-86 91-86 95 25 95 86z" />
                          <path className="bear__muzzle" d="M212 958c0 20-29 39-63 39-35 0-61-19-61-39s26-33 61-33 63 13 63 33z" />
                          <path className="bear__nose" d="M181 932c0 7-19 24-30 24s-32-17-32-24c0-8 20-13 31-13 12 0 31 5 31 13z" />
                          <ellipse className="bear__outer-ear" cx="68.3" cy="827.7" rx="23.8" ry="23.1" />
                          <path className="bear__inner-ear" d="M85 826a17 16 0 00-17-14 17 16 0 00-16 16 17 16 0 0016 16 17 16 0 001 0l3-4a66 66 0 0111-12l2-2z" />
                          <ellipse className="bear__outer-ear" ry="23.1" rx="23.8" cy="827.7" cx="-231.2" transform="scale(-1 1)" />
                          <path className="bear__inner-ear" d="M215 826a17 16 0 0116-14 17 16 0 0117 16 17 16 0 01-17 16 17 16 0 01-1 0l-2-4a66 66 0 00-11-12l-2-2z" />
                          <path className="bear__cap-strap" d="M148 815c-14 0-26 1-38 4v11a199 199 0 0180 1v-11c-13-3-27-5-42-5z" />
                          <path className="bear__small-cap-strap" d="M165 816a16 8 0 015 5 16 8 0 01-6 6l26 4v-11l-25-4z" />
                          <path className="bear__cap" d="M148 789c-43 0-76 20-83 64 12-11 28-19 45-23 0 0-2-12 10-16 15-4 19-4 28-4 10 0 15 0 30 4s12 17 12 17c18 5 32 11 45 22-8-46-43-64-87-64z" />
                          <circle className="bear__eye" cx="97.2" cy="894.1" r="11.2" />
                          <circle className="bear__eye" cy="894.1" cx="201.9" r="11.2" />
                          <path className="bear__eyebrows" d="M97 864a21 21 0 01-7 16 21 21 0 01-16 5M204 864a21 21 0 006 16 21 21 0 0016 5" fill="none" stroke="#e9afaf" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                          <path className="shades-frame" d="M77 855c-6 0-13 0-23 2l-14 3 2 15 7 2c3 5 1 10 2 18 3 28 12 34 26 35 8 1 23 3 33-1s19-10 25-18c6-9 6-18 10-26 3-5 8-4 10 0 3 8 4 17 10 26 6 8 15 14 24 18 11 4 26 2 34 1 14-1 23-7 26-35 1-8-2-13 2-18l7-2 2-15-15-3c-15-3-23-2-34-2h-13l-25 4c-8 2-15 7-23 6-8 0-15-5-23-6l-25-4H77z" />
                          <path className="lens" d="M85 860c-10 1-25 1-28 13-3 15-3 32 6 45 7 11 23 9 35 9 19-1 35-16 40-34 2-8 4-14 1-19-6-10-20-12-31-13l-23-1z" fill="#333" />
                          <path className="shades-dot" d="M56 864a4 2 0 01-4 2 4 2 0 01-4-2 4 2 0 014-1 4 2 0 014 1" />
                          <path className="lens" d="M215 860c10 1 24 1 28 13 3 15 3 32-6 45-7 11-23 9-35 9-19-1-35-16-40-34-2-8-4-14-1-19 6-10 20-12 31-13l23-1z" fill="#333" />
                          <path className="shades-dot" d="M244 864a4 2 0 004 2 4 2 0 004-2 4 2 0 00-4-1 4 2 0 00-4 1" />
                          <g clipPath="url(#spec-left)">
                            <use href="#code-block" transform="translate(0 0)" className="animate-read" />
                            <use href="#code-block" transform="translate(0 0)" y="283.5" className="animate-read" />
                          </g>
                          <g clipPath="url(#spec-right)">
                            <use href="#code-block" transform="translate(104 0)" className="animate-read" />
                            <use href="#code-block" transform="translate(104 0)" y="283.5" className="animate-read" />
                          </g>
                          <path className="lens__shine" d="M101 861l-19 66h17l18-65-16-1zM89 860h-4l-3 1-18 59 6 5 19-65z" />
                        </g>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">Skimming your resume...</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Hang on, AI is reading through every detail!
                      </p>
                    </div>

                    <style jsx>{`
                      .bear__fur,
                      .bear__outer-ear {
                        fill: hsl(24, 100%, 20%);
                      }

                      .bear__inner-ear,
                      .bear__muzzle {
                        fill: hsl(24, 57%, 75%);
                      }

                      .bear__cap-strap {
                        fill: hsl(0, 100%, 50%);
                      }

                      .bear__small-cap-strap {
                        fill: hsl(0, 100%, 30%);
                      }

                      .bear__cap {
                        fill: hsl(0, 0%, 5%);
                      }

                      .bear__eye {
                        fill: hsl(0, 0%, 0%);
                      }

                      .lens {
                        fill: hsl(0, 0%, 35%);
                      }

                      .lens__shine {
                        fill: hsla(0, 0%, 95%, 0.35);
                      }

                      .shades-dot {
                        fill: hsla(0, 0%, 95%, 0.6);
                      }

                      .shades-frame {
                        fill: hsl(0, 0%, 0%);
                      }

                      .bear__nose {
                        fill: hsl(0, 0%, 0%);
                      }

                      .code-line {
                        fill: hsla(90, 80%, 50%, 0.5);
                      }

                      .code-line-special {
                        fill: hsla(190, 80%, 50%, 0.5);
                      }

                      .code-line-keyword {
                        fill: hsla(60, 80%, 50%, 0.5);
                      }

                      .code-line-string {
                        fill: hsla(330, 80%, 50%, 0.5);
                      }

                      .animate-read {
                        animation: read 1s infinite linear;
                      }

                      @keyframes read {
                        to {
                          transform: translate(0, -283.5px);
                        }
                      }
                    `}</style>
                  </motion.div>
                ) : uploadedFile ? (
                  <motion.div
                    key="uploaded"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-center space-y-6"
                  >
                    <div className="flex items-center justify-center space-x-3">
                      {getFileIcon(uploadedFile.name)}
                      <CheckCircle2 className="w-8 h-8 text-green-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">File Uploaded Successfully</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {uploadedFile.name} • {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <Button
                      onClick={onButtonClick}
                      variant="outline"
                      size="sm"
                      className="mt-4"
                    >
                      Upload Different File
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="upload"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-center space-y-6"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <Upload className="w-12 h-12 mx-auto text-muted-foreground" />
                    </motion.div>

                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-foreground">
                        Upload Your Resume
                      </h3>
                      <p className="text-muted-foreground">
                        Drag and drop your file here, or{' '}
                        <Button
                          variant="link"
                          className="p-0 h-auto font-medium text-primary hover:text-primary/80"
                          onClick={onButtonClick}
                        >
                          browse files
                        </Button>
                      </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-2">
                      <Badge variant="secondary" className="text-xs">PDF</Badge>
                      <Badge variant="secondary" className="text-xs">DOC</Badge>
                      <Badge variant="secondary" className="text-xs">DOCX</Badge>
                      <Badge variant="secondary" className="text-xs">TXT</Badge>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
}