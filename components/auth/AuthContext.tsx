'use client';

import { createContext, useEffect, useState } from 'react';
import { getUser, getUserId, getUserToken } from './getUser';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { useRouter } from 'next/navigation';

export const AuthContext = createContext<{ user: UserInfo | null }>({
  user: null
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [token, setToken] = useState<RequestCookie | undefined>(undefined);
  const [userId, setUserId] = useState<RequestCookie | undefined>(undefined);

  const router = useRouter();

  const getToken = async () => {
    const userToken = await getUserToken();
    const id = await getUserId();
    setToken(userToken);
    setUserId(id);
  }

  const updateUser = async () => {
    if(userId && token) {
      const user: UserInfo | undefined = await getUser(userId, token);
      if (user) setUser(user);
    }
  }

  useEffect(() => {
    console.log("rendered")
    getToken();
    if(!token) {
      setUser(null)
    } else {
      updateUser()
    }
  }, [router])

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
