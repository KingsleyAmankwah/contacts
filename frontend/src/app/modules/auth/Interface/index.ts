export interface SignUpData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface SignInData {
  email: string;
  password: string;
}

// Define the IUser type which will be used to type the user data throughout the AuthService.
export interface IUser {
  id: number;
  email: string;
  name: string;
}

export interface userResponse {
  sucess: boolean;
  message: string;
  data: {
    token: string;
  };
}
