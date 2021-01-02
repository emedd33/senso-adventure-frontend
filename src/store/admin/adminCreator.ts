import * as actionTypes from "./adminActions"

export function setIsLoading(isLoading: boolean) {
    const action: AdminAction = {
        type: actionTypes.SET_IS_LOADING,
        isLoading,
    }

    return simulateHttpRequest(action)
}

// TODO:  
export function simulateHttpRequest(action: AdminAction) {
    return (dispatch: AdminDispatchType) => {
        setTimeout(() => {
            dispatch(action)
        }, 500)
    }
}