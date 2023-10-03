'use client';

import { createContext, useEffect, useState } from 'react';
import { getUser, getUserId, getUserToken } from './getUser';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { usePathname, useRouter } from 'next/navigation';
import { revalidatePath } from 'next/cache';
// import { cookies } from 'next/headers';
// import { useCookies } from 'next-client-cookies';

export const AuthContext = createContext<{ user: UserInfo | null }>({
  user: null
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [token, setToken] = useState<RequestCookie | undefined>();
  const [userId, setUserId] = useState<RequestCookie | undefined>();
  // const [count, setCount] = useState<number>(0);

  const pathname = usePathname();

  // const cookies = useCookies();
  // console.log(cookies.get('token'));

  async function getToken() {
    try {
      const token = await getUserToken();
      setToken(token);
      // setCount(prevCount => prevCount += 1);
      if(token) {
        console.log("token is valid");
      } else {
        console.log("token is not valid");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getId() {
    try {
      const id = await getUserId();
      setUserId(id);
    } catch (error) {
      console.log(error);
    }
  }

  const updateUser = async () => {
    console.log(token);
    if(token && userId) {
      try {
        const user = await getUser(userId, token);
        if(user) {
          setUser(user);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setUser(null);
    }
  }

  console.log(token);

  useEffect(() => {
    getToken();
    getId();
  }, [pathname])
  
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};