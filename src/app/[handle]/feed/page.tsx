'use client';

import { useParams } from 'next/navigation';

export default function FeedPage() {
  const params = useParams();
  const handle = params.handle as string;

  return (
    <div className="flex-1 bg-[#F5F1E8] overflow-y-auto">
      <div className="p-8">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-4 text-3xl font-bold text-[#3A3630]">Community Feed</h1>
          <p className="text-[#6B6358]">
            Welcome to @{handle} community feed. This is where community updates and posts will appear.
          </p>
          
          <div className="mt-8 rounded-2xl border-2 border-[#E8DFD0] bg-white p-8 text-center shadow-sm">
            <p className="text-[#6B6358]">Feed functionality coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
