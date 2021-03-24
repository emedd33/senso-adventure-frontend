import { Dispatch } from "redux";
import { authentication, database } from "../../firebase";
import {
  SET_IS_LOADING,
  SET_ALERT_DIALOG,
  SET_AUTH_USER,
} from "./adminActions";

export const dispatchLogin = (payload: ILogin) => {
  return async (dispatch: Dispatch) => {
    dispatch(setIsLoading(true))
    await authentication
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then((user: any) => {
        dispatch(loginSuccess(user));
      })
      .catch((error: { code: any }) => {
        let errorMessage = "An error has occured";

        switch (error.code) {
          case "auth/invalid-email":
            errorMessage = "invalid email or password";
        }
        dispatch(setAlertDialog(errorMessage, true, true));
      })
      .finally(() => dispatch(setIsLoading(false)));
  };
};
export const dispatchLogout = () => {
  return async (dispatch: Dispatch) => {
    authentication
      .signOut()
      .then(() => {
        dispatch({ type: SET_AUTH_USER, payload: null });
      })
      .catch((error) => {
        dispatch({ type: SET_ALERT_DIALOG, payload: "An error has occured" });
      });
  };
};
// export const dispatchSignup = (payload: { email: string, password: string, username: string }) => {
//   return async (dispatch: Dispatch) => {
//     await 

//   };

// };

export const loginSuccess = (user: any) => ({
  type: SET_AUTH_USER,
  payload: {
    ...user,
  },
});

export const setIsLoading = (isLoading: boolean) => ({
  type: SET_IS_LOADING,
  payload: isLoading,
});

export const setAlertDialog = (
  message: any,
  isError: boolean,
  isOpen: boolean
) => ({
  type: SET_ALERT_DIALOG,
  payload: {
    message: message,
    isError: isError,
    isOpen: isOpen,
  },
  message: message,
  isError: isError,
  isOpen: isOpen,
});
