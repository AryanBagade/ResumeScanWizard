'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface SimpleStoryAnimationProps {
  candidateName?: string;
}

export default function SimpleStoryAnimation({ candidateName }: SimpleStoryAnimationProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const { scrollYProgress } = useScroll();

  const displayName = candidateName || 'lad';

  // Transform scroll progress to animation steps
  const step1 = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const step2 = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
  const step3 = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);
  const step4 = useTransform(scrollYProgress, [0.6, 1], [0, 1]);

  const characterScale = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
  const noseWidth = useTransform(scrollYProgress, [0.6, 1], [8, 150]);

  useEffect(() => {
    // Set body height for scrolling
    document.body.style.height = '500vh';

    return () => {
      document.body.style.height = 'auto';
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black text-white overflow-hidden">
      {/* Story Text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center space-y-8 max-w-4xl px-8">
          {/* Step 1: Once upon a time */}
          <motion.h1
            className="text-6xl font-bold"
            style={{ opacity: step1 }}
          >
            Once upon a time,
          </motion.h1>

          {/* Step 2: There was a lad */}
          <motion.h1
            className="text-6xl font-bold"
            style={{ opacity: step2 }}
          >
            There was a {displayName}.
          </motion.h1>

          {/* Step 3: And they lied */}
          <motion.h1
            className="text-6xl font-bold text-red-400"
            style={{ opacity: step3 }}
          >
            And they lied
          </motion.h1>

          {/* Step 4: and lied, and lied... */}
          <motion.h1
            className="text-4xl font-bold text-red-500"
            style={{ opacity: step4 }}
          >
            and lied, and lied, and lied, and lied.
          </motion.h1>
        </div>
      </div>

      {/* Character */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ scale: characterScale }}
      >
        <div className="relative">
          {/* Simple character illustration */}
          <div className="w-32 h-48 mx-auto">
            {/* Head */}
            <div className="w-24 h-24 bg-yellow-200 rounded-full mx-auto relative">
              {/* Eyes */}
              <div className="absolute top-6 left-4 w-3 h-3 bg-black rounded-full"></div>
              <div className="absolute top-6 right-4 w-3 h-3 bg-black rounded-full"></div>

              {/* Growing Nose */}
              <motion.div
                className="absolute top-10 left-1/2 -translate-x-1/2 h-2 bg-yellow-300 rounded-full"
                style={{ width: noseWidth }}
                initial={{ width: '8px' }}
              />

              {/* Mouth */}
              <div className="absolute top-16 left-1/2 -translate-x-1/2 w-4 h-2 bg-red-600 rounded-full"></div>
            </div>

            {/* Body */}
            <div className="w-16 h-20 bg-blue-600 mx-auto mt-2 rounded-lg"></div>

            {/* Arms */}
            <div className="absolute top-24 -left-4 w-12 h-4 bg-yellow-200 rounded-full rotate-12"></div>
            <div className="absolute top-24 -right-4 w-12 h-4 bg-yellow-200 rounded-full -rotate-12"></div>

            {/* Legs */}
            <div className="flex justify-center space-x-2 mt-2">
              <div className="w-4 h-16 bg-blue-800 rounded-lg"></div>
              <div className="w-4 h-16 bg-blue-800 rounded-lg"></div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
        initial={{ opacity: 1 }}
        style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
      >
        <p className="text-white/70 mb-4">Scroll to continue the story...</p>
        <motion.div
          className="w-6 h-10 border-2 border-white/50 rounded-full mx-auto relative"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-3 bg-white/50 rounded-full absolute left-1/2 top-2 -translate-x-1/2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>

      {/* Progress indicator */}
      <div className="absolute top-4 left-4 right-4">
        <div className="w-full h-1 bg-white/20 rounded-full">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
            style={{ scaleX: scrollYProgress }}
            transformOrigin="left"
          />
        </div>
      </div>
    </div>
  );
}