interface User {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface NewUser extends User {
  id: number;
  token: string;
}

interface RegisterUser extends User {
  password: string;
  passwordRepeat: string;
}

interface UserInfo extends User {
  id: number;
}

interface LoggedInUser extends UserInfo {
  key: string;
  user: UserInfo;
}