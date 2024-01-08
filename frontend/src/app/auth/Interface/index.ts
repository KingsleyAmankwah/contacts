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

export interface userResponse {
  sucess: boolean;
  message: string;
  data: {
    token: string;
  };
}

export interface IUser {
  id: number;
  email: string;
  name: string;
  colorCode: string;
}


