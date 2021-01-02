import * as actionTypes from "./ActionTypes"

export function addAdventure(adventure: IAdventure) {
    const action: AdventureAction = {
        type: actionTypes.ADD_ADVENTURE,
        adventure,
    }

    return simulateHttpRequest(action)
}

export function removeAdventure(adventure: IAdventure) {
    const action: AdventureAction = {
        type: actionTypes.REMOVE_ADVENTURE,
        adventure,
    }
    return simulateHttpRequest(action)
}

// TODO:  
export function simulateHttpRequest(action: AdventureAction) {
    return (dispatch: DispatchType) => {
        setTimeout(() => {
            dispatch(action)
        }, 500)
    }
}