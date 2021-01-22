import * as actionTypes from "./campaignActions"


const adventureReducer = (
    state: ICampaign[] = [],
    action: CampaignAction
): ICampaign[] => {
    switch (action.type) {
        case actionTypes.SET_CAMPAIGNS:
            return { ...action.payload }

    }
    return state
}

export default adventureReducer