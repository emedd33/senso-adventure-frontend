import { SET_SELECTED_CAMPAIGN, SET_SELECTED_PLAYER, SET_SELECTED_SESSION, UPDATE_SELECTED_PLAYER } from "./selectedActions"

const initialSelectedState: SelectedState = {
}
const selectedReducer = (
    state: SelectedState = initialSelectedState,
    action: SelectedActions
): SelectedState => {
    switch (action.type) {
        case SET_SELECTED_CAMPAIGN:
            state.selectedCampaign = action.payload
            return state
        case SET_SELECTED_PLAYER: {
            state.selectedPlayer = action.payload
            return state
        }
        case UPDATE_SELECTED_PLAYER: {
            if (state.selectedPlayer && state.selectedPlayer.player[action.payload.type]) {
                state.selectedPlayer.player[action.payload.type] = action.payload.payload
            }
            return state
        }
        case SET_SELECTED_SESSION: {
            state.selectedSession = action.payload
            return state
        }
    }
    return state
}
export default selectedReducer