import * as actionTypes from "./campaignActions"

const initialCampaignState: CampaignState = {
    curseOfStrahd: {
        sessions: []
    },
    fireAndFury: {
        sessions: []
    }
}

const adventureReducer = (
    state: CampaignState = initialCampaignState,
    action: AdventureAction
): CampaignState => {
    switch (action.type) {
        case actionTypes.SET_CAMPAIGNS:
            return { ...action.payload }
    }
    return state
}

export default adventureReducer