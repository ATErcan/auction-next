import axios from 'axios';
import { storeId, storeToken } from './getUser';

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
      storeToken(data.token)
      storeId(data.id)
    } else {
      const errorData = response.data;
      console.log(errorData)
    }
  } catch (error) {
    if(axios.isAxiosError(error)){
      console.log(error.message)
    } else {
      console.log(error)
    }
  }
}

export const login = async (username: string, password: string, updateUser: (user: UserInfo | null) => void) => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/auth/login/', {
      username,
      password,
    });

    if (response.status === 200) {
      const data: LoggedInUser = response.data;
      updateUser(data)
      return data;
    } else {
      const errorData = response.data;
      console.log(errorData)
    }
  } catch (error) {
    console.log(error)
  }
};

export const logout = async (token: string, updateUser: (user: UserInfo | null) => void) => {
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
      updateUser(null)
      // TODO successful logout
    } else {
      const errorData = response.data;
      console.log(errorData)
    }
  } catch (error) {
    console.log(error)
  }
};