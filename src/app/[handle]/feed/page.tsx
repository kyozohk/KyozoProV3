'use client';

import { useParams } from 'next/navigation';

export default function FeedPage() {
  const params = useParams();
  const handle = params.handle as string;

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-4 text-3xl font-bold text-foreground">Community Feed</h1>
        <p className="text-muted-foreground">
          Welcome to @{handle} community feed. This is where community updates and posts will appear.
        </p>
        
        <div className="mt-8 rounded-xl border border-border bg-card p-8 text-center">
          <p className="text-muted-foreground">Feed functionality coming soon...</p>
        </div>
      </div>
    </div>
  );
}
