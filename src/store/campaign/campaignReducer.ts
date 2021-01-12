import * as actionTypes from "./campaignActions"

const initialCampaignState: CampaignState = {
    curseOfStrahd: {
        sessions: [],
        players: [],
        dungeonMaster: "",
        id: "curseOfStrahd"
    },
    fireAndFury: {
        sessions: [],
        players: [],
        dungeonMaster: "",
        id: "fireAndFury"
    }
}

const adventureReducer = (
    state: CampaignState = initialCampaignState,
    action: CampaignAction
): CampaignState => {
    switch (action.type) {
        case actionTypes.SET_CAMPAIGNS:
            return { ...action.payload }

    }
    return state
}

export default adventureReducer