import { SET_BACKGROUND_IMAGE, SET_SELECTED_CAMPAIGN, SET_SELECTED_PLAYER, SET_SELECTED_SESSION, UPDATE_SELECTED_PLAYER } from "./selectedActions"

export const initialSelectedCampaignState = { id: "", title: "", subTitle: "", dungeonMaster: "", sessions: [], players: [], campaignBackgroundImageFile: "", isNew: true, campaignCrestImageFile: "", campaignTitleImageFile: "" }
const initialSelectedState: SelectedState = {
    selectedSession: { id: "", session: [] },
    selectedCampaign: { id: "", campaign: initialSelectedCampaignState },
    selectedPlayer: { isNew: true, player: {} }

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
        case SET_BACKGROUND_IMAGE: {
            return {
                ...state,
                backgroundImage: action.payload
            }
        }
    }
    return state
}
export default selectedReducer