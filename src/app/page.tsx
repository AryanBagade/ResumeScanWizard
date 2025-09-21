'use client';

import WizardContainer from '@/components/wizard/WizardContainer';
import UploadStep from '@/components/wizard/steps/UploadStep';
import ProcessingStep from '@/components/wizard/steps/ProcessingStep';
import ResultsStep from '@/components/wizard/steps/ResultsStep';
import ActionsStep from '@/components/wizard/steps/ActionsStep';
import FeedbackStep from '@/components/wizard/steps/FeedbackStep';
import { WizardStep } from '@/hooks/useWizard';

const wizardSteps: WizardStep[] = [
  {
    id: 'upload',
    title: 'Upload Resume',
    description: 'Select your resume file to get started',
    component: UploadStep,
  },
  {
    id: 'processing',
    title: 'AI Analysis',
    description: 'Our AI is analyzing your resume',
    component: ProcessingStep,
  },
  {
    id: 'results',
    title: 'View Results',
    description: 'Review your parsed resume data',
    component: ResultsStep,
  },
  {
    id: 'interview',
    title: 'AI Interview',
    description: 'Face the brutal AI interviewer',
    component: ActionsStep,
  },
  {
    id: 'feedback',
    title: 'Resources',
    description: 'Access feedback and tools',
    component: FeedbackStep,
  },
];

export default function Home() {
  const handleWizardComplete = (data: Record<string, any>) => {
    console.log('Wizard completed with data:', data);
    // You can handle completion here if needed
  };

  return (
    <WizardContainer
      steps={wizardSteps}
      onComplete={handleWizardComplete}
    />
  );
}
