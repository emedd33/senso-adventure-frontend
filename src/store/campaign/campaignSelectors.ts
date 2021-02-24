



export const getAllSessions = (state: RootReducerProp) => {
  let sessions: (
    | { campaignId: string; sessionId: string; session: ISession }
    | undefined
  )[] = [];
  if (state.rootCampaigns) {
    sessions = Object.entries(state.rootCampaigns.campaigns)
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
        return undefined;
      })
      .filter(Boolean)
      .flat();
  }
  return sessions;
};

export const getNextSession = (state: RootReducerProp) => {
  let selectedSessionDay = state.selected.selectedSession.session.sessionDay;
  if (typeof selectedSessionDay === "number" && state.selected.selectedCampaign.campaign.sessions) {
    let nextSession = Object.entries(
      state.selected.selectedCampaign.campaign.sessions
    ).filter(([id, session]) => {
      return session.sessionDay === selectedSessionDay + 1;
    });
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
  if (typeof selectedSessionDay === "number" && state.selected.selectedCampaign.campaign.sessions) {
    let previousSession = Object.entries(
      state.selected.selectedCampaign.campaign.sessions
    ).filter(([id, session]) => {
      return session.sessionDay === selectedSessionDay - 1;
    });
    if (previousSession[0]) {
      return {
        id: previousSession[0][0],
        session: previousSession[0][1],
      };
    }
  }
  return null;
};

