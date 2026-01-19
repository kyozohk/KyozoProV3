'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { AuthDialog } from './components/auth-dialog';

export default function LandingPage() {
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (user) {
    router.push('/dashboard');
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-lg font-bold text-primary-foreground">K</span>
            </div>
            <span className="text-xl font-semibold text-foreground">Kyozo Pro</span>
          </div>
          
          <button
            onClick={() => setShowAuthDialog(true)}
            className="rounded-md bg-primary px-6 py-2 font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Login
          </button>
        </div>
      </header>

      <main className="container mx-auto px-6 pt-32">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-5xl font-bold leading-tight text-foreground md:text-6xl">
            Manage Your Events with{' '}
            <span className="bg-gradient-to-r from-primary to-accent-purple bg-clip-text text-transparent">
              Elegance
            </span>
          </h1>
          
          <p className="mb-12 text-xl text-muted-foreground md:text-2xl">
            A beautiful, intuitive platform for organizing guest lists, schedules, and cultural events.
            Built with care for modern event management.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              onClick={() => setShowAuthDialog(true)}
              className="rounded-lg bg-primary px-8 py-4 text-lg font-medium text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg"
            >
              Get Started
            </button>
            <button className="rounded-lg border-2 border-border bg-card px-8 py-4 text-lg font-medium text-foreground hover:bg-muted transition-colors">
              Learn More
            </button>
          </div>

          <div className="mt-24 grid gap-8 md:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent-coral/10">
                <svg
                  className="h-6 w-6 text-accent-coral"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-foreground">Guest Management</h3>
              <p className="text-muted-foreground">
                Organize and track your guest lists with ease. Send invitations and manage RSVPs effortlessly.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent-blue/10">
                <svg
                  className="h-6 w-6 text-accent-blue"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-foreground">Event Scheduling</h3>
              <p className="text-muted-foreground">
                Plan and schedule your events with our intuitive calendar interface. Never miss an important date.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent-sage/10">
                <svg
                  className="h-6 w-6 text-accent-sage"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-foreground">Analytics & Insights</h3>
              <p className="text-muted-foreground">
                Track attendance, engagement, and get valuable insights about your events and guests.
              </p>
            </div>
          </div>
        </div>
      </main>

      <AuthDialog isOpen={showAuthDialog} onClose={() => setShowAuthDialog(false)} />
    </div>
  );
}
