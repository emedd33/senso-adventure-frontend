

export const getCamapignCrestFiles = (state: RootReducerProp) => {
    if (state.rootCampaigns) {
        return state.rootCampaigns.campaignCrestFiles
    }
}

export const getAllSessions = (state: RootReducerProp) => {
    if (state.rootCampaigns) {
        return Object.entries(state.rootCampaigns.campaigns).map(([campaignId, campaign]) => {
            if (campaign.sessions) {
                return Object.entries(campaign.sessions).map(([sessionId, session]) => {
                    return {
                        "campaignId": campaignId,
                        "sessionId": sessionId,
                        "session": session
                    }
                })
            }
            return null
        }).flat().filter(e => e !== null)
    }
}
export const isDungeonMasterSelector = (state: RootReducerProp) => {
    let username = state.admin.authUser?.username
    if (username) {
        return state.selected.selectedCampaign.campaign.dungeonMaster === username
    }
    return false
}
