import * as actionTypes from "./campaignActions"

const initialCampaignState: CampaignState = {
    adventures: []
}

const adventureReducer = (
    state: CampaignState = initialCampaignState,
    action: AdventureAction
): CampaignState => {
    switch (action.type) {
        case actionTypes.GET_ADVENTURES:
            console.log(action.payload)
            return { ...state, adventures: action.payload }
    }
    return state
}

export default adventureReducer