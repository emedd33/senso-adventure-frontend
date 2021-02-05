export const getCamapignCrestFiles = (state: RootReducerProp) => {
    if (state.rootCampaigns) {
        return state.rootCampaigns.campaignCrestFiles;
    }
};

export const getAllSessions = (state: RootReducerProp) => {
    if (state.rootCampaigns) {
        return Object.entries(state.rootCampaigns.campaigns)
            .map(([campaignId, campaign]) => {
                if (campaign.sessions) {
                    return Object.entries(campaign.sessions).map(
                        ([sessionId, session]) => {
                            return {
                                campaignId: campaignId,
                                sessionId: sessionId,
                                session: session,
                            };
                        }
                    );
                }
            })
            .flat()
            .filter((e) => e !== null);
    }
};
export const isDungeonMasterSelector = (state: RootReducerProp) => {
    let username = state.admin.authUser?.username;
    if (username) {
        return state.selected.selectedCampaign.campaign.dungeonMaster === username;
    }
    return false;
};

export const getNextSession = (state: RootReducerProp) => {
    let selectedSessionIndex = state.selected.selectedSession.index;
    if (typeof selectedSessionIndex === "number") {
        let session = Object.entries(
            state.selected.selectedCampaign.campaign.sessions
        )[selectedSessionIndex + 1];
        if (session) {
            return {
                id: session[0],
                session: session[1],
                index: selectedSessionIndex + 1,
            };
        }
    }
    return null;
};
export const getPreviousSession = (state: RootReducerProp) => {
    let selectedSessionIndex = state.selected.selectedSession.index;
    if (typeof selectedSessionIndex === "number") {
        let session = Object.entries(
            state.selected.selectedCampaign.campaign.sessions
        )[selectedSessionIndex - 1];
        if (session) {
            return {
                id: session[0],
                session: session[1],
                index: selectedSessionIndex + -1,
            };
        }
    }
    return null;
};
