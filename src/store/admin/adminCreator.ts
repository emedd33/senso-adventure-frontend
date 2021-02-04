import { Dispatch } from "redux";
import { firebaseAuth } from "../../firebase";
import {
  SET_IS_LOADING,
  SET_ALERT_DIALOG,
  SET_AUTH_USER,
} from "./adminActions";

export const dispatchLogin = (payload: ILogin) => {
  return async (dispatch: Dispatch) => {
    dispatch(setIsLoading(true));
    await firebaseAuth
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then((user) => {
        dispatch(loginSuccess(user));
      })
      .catch((error) => {
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
    dispatch(setIsLoading(true));
    firebaseAuth
      .signOut()
      .then(() => {
        dispatch({ type: SET_AUTH_USER, payload: null });
      })
      .catch((error) => {
        dispatch({ type: SET_ALERT_DIALOG, payload: "An error has occured" });
      })
      .finally(() => dispatch(setIsLoading(false)));
  };
};
export const dispatchSignup = (payload: any) => {
  return async (dispatch: any) => {
    dispatch(setIsLoading(true));
    await firebaseAuth
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then(async (user) => {
        return firebaseAuth.currentUser;
      })
      .then((user) => {
        if (user) {
          user
            .updateProfile({
              displayName: payload.username,
            })
            .catch(function (error) {
              console.log("An error has occured while updating username");
            });
        }
      })
      .catch((error) => {
        let errorMessage = "Could not create user";
        dispatch(setAlertDialog(errorMessage, true, true));
      })
      .finally(() => {
        dispatch(setIsLoading(false));
      });
    // if (firebaseUser) {
    // }
  };
};

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
});
