export interface IUserModel {
  id: string;
  name: string;
  password: string;
  email: string;
  role: string;
  branchId: string;
}

export interface ILoginResponse {
  token: string;
  data: {
    userId: string;
    role: string;
    branchId: string;
  };
}

export interface IUserLoggedIn {
  userId: string;
  role: string;
  branchId: string;
}
