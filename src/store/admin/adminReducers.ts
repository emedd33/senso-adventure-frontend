import { SET_IS_LOADING, SET_ERROR } from "./adminActions"



const initialState: AdminState = {
    isLoading: false,
}

const adminReducer = (state: AdminState = initialState, action: any): AdminState => {
    switch (action.type) {
        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: action.payload
            }
        case SET_ERROR:
            return {
                ...state,
                error: action.payload
            }
    }
    return state
}
export default adminReducer 