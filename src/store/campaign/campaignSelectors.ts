export const getCamapignCrestFiles = (state: RootReducerProp) => {
    if (state.rootCampaigns) {
        return state.rootCampaigns.campaignCrestFiles;
    }
};

export const getAllSessions = (state: RootReducerProp) => {
    let sessions: { campaignId: string, sessionId: string, session: ISession }[] = []
    if (state.rootCampaigns) {
        sessions = Object.entries(state.rootCampaigns.campaigns)
            .map(([campaignId, campaign]) => {
                return Object.entries(campaign.sessions).map(
                    ([sessionId, session]) => {
                        return {
                            campaignId: campaignId,
                            sessionId: sessionId,
                            session: session,
                        };
                    }
                );
            }).flat()
    }
    return sessions
};
export const isDungeonMasterSelector = (state: RootReducerProp) => {
    let username = state.admin.authUser?.username;
    if (username) {
        return state.selected.selectedCampaign.campaign.dungeonMaster === username;
    }
    return false;
};

export const getNextSession = (state: RootReducerProp) => {
    let selectedSessionDay = state.selected.selectedSession.session.sessionDay;
    if (typeof selectedSessionDay === "number") {
        let nextSession = Object.entries(
            state.selected.selectedCampaign.campaign.sessions
        ).filter(([id, session]) => {
            return session.sessionDay === selectedSessionDay + 1
        })
        if (nextSession[0]) {
            return {
                id: nextSession[0][0],
                session: nextSession[0][1],
            };
        }
    }
    return null;
};
export const getPreviousSession = (state: RootReducerProp) => {
    let selectedSessionDay = state.selected.selectedSession.session.sessionDay;
    if (typeof selectedSessionDay === "number") {
        let previousSession = Object.entries(
            state.selected.selectedCampaign.campaign.sessions
        ).filter(([id, session]) => {
            return session.sessionDay === selectedSessionDay - 1
        })
        if (previousSession[0]) {
            return {
                id: previousSession[0][0],
                session: previousSession[0][1],
            };
        }
    }
    return null;
};
