interface IEmployeeInfo {
  email: string;
  role: string;
}

export interface ICreateToken {
  employeeInfo: IEmployeeInfo;
  isRefreshToken: boolean;
}

export interface IVerifyToken {
  token: string;
  isRefreshToken: boolean;
}

export interface IDecodedToken {
  payload: IEmployeeInfo;
  iat: number;
  exp: number;
}
