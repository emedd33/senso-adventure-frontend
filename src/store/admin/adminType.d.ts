
interface IError {
  message: string;
  isError: boolean;
  isOpen: boolean;
}
type AdminState = {
  isLoading: boolean;
  authUser?: firebase.User;
  error: IError;
  env: string,
  port: string,
  isSidebarShown: boolean,
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
