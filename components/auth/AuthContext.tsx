'use client';

import { createContext, useEffect, useState } from 'react';
import { getUser } from './getUser';
import { usePathname, useRouter } from 'next/navigation';

export const AuthContext = createContext<{ user: UserInfo | null }>({
  user: null
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserInfo | null>(null);

  const router = useRouter();
  const pathname = usePathname();

  async function updateUser() {
    try {
      const user = await getUser();
      if(user) {
        setUser(user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.log(error);
    }
  }

  console.log(user);

  useEffect(() => {
    updateUser();
  }, [pathname, router])
  
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};