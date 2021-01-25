import * as actionTypes from "./campaignActions"


type ICampaignState = {
    sessions: ISession[]
    campaigns: ICampaign[]
    campaignCrestFiles: string[]
}
const adventureReducer = (
    state: ICampaignState = { campaigns: [], sessions: [], campaignCrestFiles: [] },
    action: any
): ICampaignState => {
    switch (action.type) {
        case actionTypes.SET_CAMPAIGNS:
            return {
                ...state,
                campaigns: action.payload
            }
        case actionTypes.SET_SESSIONS:
            return {
                ...state,
                sessions: action.payload
            }
        case actionTypes.SET_CAMPAIGN_CRESTS:
            return {
                ...state,
                campaignCrestFiles: action.payload
            }

    }
    return state
}

export default adventureReducer