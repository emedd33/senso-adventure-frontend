import * as actionTypes from "./campaignActions"

const initialCampaignState: CampaignState = {
    curseOfStrahd: {
        sessions: [],
        players: [],
        dungeonMaster: ""
    },
    fireAndFury: {
        sessions: [],
        players: [],
        dungeonMaster: ""
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