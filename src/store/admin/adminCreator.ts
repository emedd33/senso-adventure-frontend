import firebase from "firebase";
import { Dispatch } from "redux";
import { SET_IS_LOADING, SET_ERROR, SET_AUTH_USER } from "./adminActions";

export const dispatchLogin = (payload: ILogin) => {
    return async (dispatch: Dispatch) => {
        dispatch(setIsLoading(true));
        let isSuccess = await firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
            .then((user) => {
                console.log(user)
                dispatch(loginSuccess(user))
                return "SUCCESS"
            })
            .catch((error) => {
                let errorMessage = "An error has occured"
                console.log(error)

                switch (error.code) {
                    case "auth/invalid-email":
                        errorMessage = "invalid email or password"
                }
                dispatch(setError(errorMessage))
                return "FAILURE"
            }).finally(() => dispatch(setIsLoading(false)))
        return isSuccess
    }
}
export const dispatchSignup = (payload: any) => {
    return async (dispatch: any) => {
        dispatch(setIsLoading(true));
        let res = await firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
            .then((user) => {
                console.log(user)
                dispatch(loginSuccess(user))
            })
            .catch((error) => {
                let errorMessage = "Could not create user"
                dispatch(setError(errorMessage))
            }).finally(() => dispatch(setIsLoading(false)))
        return res
    }
}

const loginSuccess = (user: any) => ({
    type: SET_AUTH_USER,
    payload: {
        ...user
    }
});

const setIsLoading = (isLoading: boolean) => ({
    type: SET_IS_LOADING,
    payload: isLoading
});


const setError = (errorMessage: any) => ({
    type: SET_ERROR,
    payload: {
        errorMessage: errorMessage,
        isError: true
    }
});
