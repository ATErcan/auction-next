import axios from 'axios';
import { deleteCookie, storeId, storeToken } from './getUser';

export const register = async (userData: RegisterUser) => {  
  try {
    const response = await axios.post('http://127.0.0.1:8000/users/register/', {
      username: userData.username,
      first_name: userData.firstName,
      last_name: userData.lastName,
      email: userData.email,
      password: userData.password,
      password2: userData.passwordRepeat
    });

    if (response.status === 201) {
      const data: NewUser = response.data;
      storeToken(data.token);
      storeId(data.id);
    } else {
      const errorData = response.data;
      console.log(errorData);
    }
  } catch (error) {
    if(axios.isAxiosError(error)){
      console.log(error.message);
    } else {
      console.log(error);
    }
  }
}

export const login = async (username: string, password: string) => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/auth/login/', {
      username,
      password,
    });

    if (response.status === 200) {
      const data: LoggedInUser = response.data;
      storeToken(data.key);
      storeId(data.user.id);
    } else {
      const errorData = response.data;
      console.log(errorData);
    }
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (token: string) => {
  try {
    const response = await axios.post(
      'http://127.0.0.1:8000/auth/logout/',
      {},
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );

    if (response.status === 200) {
      deleteCookie('userId');
      deleteCookie('token');
    } else {
      const errorData = response.data;
      console.log(errorData)
    }
  } catch (error) {
    console.log(error)
  }
};