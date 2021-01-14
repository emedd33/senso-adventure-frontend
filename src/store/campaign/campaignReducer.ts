import * as actionTypes from "./campaignActions"

const initialCampaignState: CampaignState = {
    curseOfStrahd: {
        sessions: [],
        players: [],
        dungeonMaster: "",
        id: "curseOfStrahd",
        backgroundImage: ""
    },
    fireAndFury: {
        sessions: [],
        players: [],
        dungeonMaster: "",
        id: "fireAndFury",
        backgroundImage: ""
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