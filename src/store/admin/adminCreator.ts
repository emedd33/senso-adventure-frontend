import firebase from "firebase";
import { SET_IS_LOADING, SET_ERROR, SET_USER } from "./adminActions";

export const dispatchLogin = (payload: any) => {
    return async (dispatch: any) => {
        dispatch(setIsLoading(true));
        console.log(payload)
        await firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
            .then((user) => {
                dispatch(loginSuccess(user))
            })
            .catch((error) => {
                let errorMessage = "An error has occured"
                switch (error.code) {
                    case "auth/invalid-email":
                        errorMessage = "invalid email or password"
                }
                dispatch(setError(errorMessage))
            }).finally(() => dispatch(setIsLoading(false)))
    }
}

const loginSuccess = (user: any) => ({
    type: SET_USER,
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
