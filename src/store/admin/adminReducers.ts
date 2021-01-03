import { SET_IS_LOADING } from "./adminActions"

const initialState: AdminState = {
    isLoading: false
}
const adminReducer = (state: AdminState = initialState, action: AdminAction): AdminState => {
    switch (action.type) {
        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: action.payload
            }
    }
    return state
}
export default adminReducer 