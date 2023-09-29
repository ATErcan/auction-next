'use server';

import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { cookies } from 'next/headers'
import axios from 'axios';

const cookieStore = cookies();

export const getUser = async (id: RequestCookie, token: RequestCookie) => {
  const url = `http://127.0.0.1:8000/users/user/${id.value}/`;
  try {
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token.value}`,
      },
    });
    if(response.status === 200){
      const data: UserInfo = response.data;
      return data;
    } else {
      const errorData = response.data;
      console.log(errorData)
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};


export const storeToken = async (token: string) => {
  cookies().set({
    name: 'token',
    value: token,
    secure: true,
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60
  })
}

export const storeId = async (id: number) => {
  cookies().set({
    name: 'userId',
    value: id.toString(),
    secure: true,
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60
  })
}

export const getUserToken = async () => {
  const token = cookieStore.get('token');
  return token;
}

export const getUserId = async () => {
  const userId = cookieStore.get('userId');
  return userId;
}

export const deleteCookie = async (name: string) => {
  cookieStore.delete(name);
}