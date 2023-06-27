'use server';

import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { cookies } from 'next/headers'
import axios from 'axios';

const cookieStore = cookies()

export const getUser = async (id: RequestCookie, token: RequestCookie) => {
  const url = `http://127.0.0.1:8000/users/user/${id}/`;
  try {
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token.toString(),
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
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60
  })
}

export const storeId = async (id: number) => {
  cookies().set({
    name: 'userId',
    value: id.toString(),
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