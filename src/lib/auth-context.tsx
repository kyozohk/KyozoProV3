'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import { useRouter, usePathname } from 'next/navigation';
import { auth } from './firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);

      // Public paths that don't require authentication
      const isPublicPath = pathname === '/';

      // Owner logged in on landing page - redirect to communities
      if (firebaseUser && pathname === '/') {
        router.replace('/communities');
      }
      // Not logged in trying to access protected routes
      else if (!firebaseUser && !isPublicPath) {
        router.replace('/');
      }
    });

    return unsubscribe;
  }, [router, pathname]);

  const signOut = async () => {
    await firebaseSignOut(auth);
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
