'use client';

import { createContext, useEffect, useState } from 'react';
import { getUser, getUserId, getUserToken } from './getUser';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { usePathname, useRouter } from 'next/navigation';
import { cookies } from 'next/headers';
import { useCookies } from 'next-client-cookies';

export const AuthContext = createContext<{ user: UserInfo | null }>({
  user: null
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [token, setToken] = useState<RequestCookie | undefined>(undefined);
  const [userId, setUserId] = useState<RequestCookie | undefined>(undefined);

  const router = useRouter();
  const pathname = usePathname();
  const cookies = useCookies();
  console.log(cookies.get('token'));

  const getToken = async () => {
    getUserToken().then(res => console.log(res)).catch(error => console.log(error));
    // getUserId().then(res => setUserId(res)).catch(error => console.log(error));
    // try{
    //   const userToken = await getUserToken();
    //   const id = await getUserId();
    //   if(userToken) {
    //     setToken(userToken);
    //     setUserId(id);
    //     console.log(userToken);
    //   } else {
    //     console.log(userToken);
    //   }
    // } catch(error) {
    //   console.log(error);
    // }
    // console.log(token);
    // const userToken = await getUserToken();
    // console.log(userToken);
  }

  const updateUser = async () => {
    if(userId && token) {
      const user: UserInfo | undefined = await getUser(userId, token);
      if (user) {
        console.log("update user is running");
        setUser(user);
      } else {
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }
  console.log(user);
  console.log(token);

  useEffect(() => {
    getToken();
    updateUser();
    console.log("route changed");
  }, [router, pathname]);

  useEffect(() => {
    updateUser();
    console.log("getToken is working");
  },[token, userId]);

  useEffect(() => {
    console.log("something changed");
    console.log(user);
  },[user, token]);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};