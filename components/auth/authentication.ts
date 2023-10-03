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
      return { success: true };
    } else {
      const errorData = response.data;
      return { success: false, error: errorData };
    }
  } catch (error) {
    if(axios.isAxiosError(error)){
      console.log(error.message);
    } else {
      console.log(error);
    }
    return { success: false, error: 'An error occurred' };
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
      return { success: true };
    } else {
      const errorData = response.data;
      return { success: false, error: errorData };
    }
  } catch (error) {
    console.log(error);
    return { success: false, error: 'An error occurred' };
  }
};