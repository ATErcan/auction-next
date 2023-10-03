'use server';

import { cookies } from 'next/headers'
import axios from 'axios';

const cookieStore = cookies();

export const getUser = async () => {
  const id = cookies().get('userId');
  const token = cookies().get('token');
  if(token && id) {
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
  } else {
    return null;
  }
};

export const logout = async () => {
  const token = cookies().get('token');
  try {
    const response = await axios.post(
      'http://127.0.0.1:8000/auth/logout/',
      {},
      {
        headers: {
          Authorization: `Token ${token?.value}`,
        },
      }
    );

    if (response.status === 200) {
      cookies().delete('userId');
      cookies().delete('token');
      return { success: true };
    } else {
      const errorData = response.data;
      console.log(errorData)
      return { success: false, error: errorData };
    }
  } catch (error) {
    console.log(error);
    return { success: false, error: 'An error occurred' };
  }
};


export async function storeToken(token: string) {
  cookies().set({
    name: 'token',
    value: token,
    secure: true,
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60
  })
}

export async function storeId(id: number) {
  cookies().set({
    name: 'userId',
    value: id.toString(),
    secure: true,
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60
  })
}

export async function getUserToken() {
  const token = cookieStore.get('token');
  return token;
}

export async function getUserId() {
  const userId = cookieStore.get('userId');
  return userId;
}

export async function deleteCookie(name: string) {
  cookieStore.delete(name);
}