interface IAuthUser {
  user: any;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
}
interface IError {
  message: string;
  isError: boolean;
  isOpen: boolean;
}
type AdminState = {
  isLoading: boolean;
  authUser?: IAuthUser;
  error: IError;
  env: string,
  port: string,
};
type ILogin = {
  email: string;
  password: string;
};

type AdminAction = {
  type: string;
  payload?: AdminState;
};

type AdminDispatchType = (args: AdminAction) => AdminAction;
