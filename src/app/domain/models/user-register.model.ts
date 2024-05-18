export interface IUserRegister {
  fullName: {
    firstName: string;
    lastName: string;
  };
  email: string;
  password: string;
  role: string;
  branchId: string;
}

export interface IUserRegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  branch: string;
}
