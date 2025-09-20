'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import SimpleStoryAnimation from '@/components/SimpleStoryAnimation';

function StoryContent() {
  const searchParams = useSearchParams();
  const candidateName = searchParams.get('name') || 'candidate';

  return <SimpleStoryAnimation candidateName={candidateName} />;
}

export default function StoryPage() {
  return (
    <Suspense fallback={<div className="fixed inset-0 bg-black flex items-center justify-center text-white">Loading...</div>}>
      <StoryContent />
    </Suspense>
  );
}