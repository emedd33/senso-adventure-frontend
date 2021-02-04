import { SET_IS_LOADING, SET_ALERT_DIALOG, SET_AUTH_USER } from "./adminActions"



const initialState: AdminState = {
    isLoading: false,
    error: {
        isError: false,
        message: "",
        isOpen: false
    }
}

const adminReducer = (state: AdminState = initialState, action: any): AdminState => {
    switch (action.type) {
        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: action.payload
            }
        case SET_ALERT_DIALOG:
            return {
                ...state,
                error: action.payload
            }
        case SET_AUTH_USER:
            return {
                ...state,
                authUser: action.payload
            }
    }
    return state
}
export default adminReducer 