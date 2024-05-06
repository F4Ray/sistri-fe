export interface ISignin {
  username: string;
  password: string;
}

export interface IToken {
  data: {
    token: string;
  };
}

export interface ISignUp {
  username: string;
  email: string;
  password: string;
  personalDataID: {
    firstName: string;
    lastName: string;
  };
  dealerCode: string;
}

export interface ISignUpReturn {
  path: string;
  data: string;
  success: boolean;
  errorCode: string;
  message: string;
  status: number;
  timestamp: Date | number | string;
}
