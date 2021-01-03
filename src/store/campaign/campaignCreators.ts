import * as actionTypes from "./campaignActions"

// export function addAdventure(adventure: IAdventure) {
//     const action: AdventureAction = {
//         type: actionTypes.ADD_ADVENTURE,
//         adventure,
//     }

//     return simulateHttpRequest(action)
// }

// export function removeAdventure(adventure: IAdventure) {
//     const action: AdventureAction = {
//         type: actionTypes.REMOVE_ADVENTURE,
//         adventure,
//     }
//     return simulateHttpRequest(action)
// }

export function getAdventures() {
    const action: AdventureAction = {
        type: actionTypes.GET_ADVENTURES
    }
    return (dispatch: AdventureDispatchType) => dispatch(action)
}

// TODO:  
// export function simulateHttpRequest(action: AdventureAction) {
//     return (dispatch: AdventureDispatchType) => {
//         setTimeout(() => {
//             dispatch(action)
//         }, 500)
//     }
// }