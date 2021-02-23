



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
  if (typeof selectedSessionDay === "number") {
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
  if (typeof selectedSessionDay === "number") {
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

export const getCampaignByPathname = (state: RootReducerProp, pathname: string) => {
  let campaignSlug = pathname.split("/")[1]
  let selectedCampaign = Object.entries(state.rootCampaigns.campaigns).filter(campaign => campaign[1].slug === campaignSlug)
  if (selectedCampaign.length > 0) {
    return { campaign: selectedCampaign[0][1], id: selectedCampaign[0][0] }
  }



}