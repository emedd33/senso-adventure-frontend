import { filterUnpublished } from "../../utils/Database";
import { isDungeonMasterSelector } from "../selected/selectedSelectors";

export const getNewSessionDay = (state: RootReducerProp) => {
  if (state.selected.selectedCampaign?.campaign.sessions) {
    return (
      Object.keys(state.selected.selectedCampaign.campaign.sessions).length + 1
    );
  }
  return 1;
};

export const getAllCampaigns = (state: RootReducerProp) => {
  return state.rootCampaigns?.campaigns;
};

export const getAllSessions = (state: RootReducerProp) => {
  let sessions: (
    | { campaignId: string; sessionId: string; session: ISession }
    | undefined
  )[] = [];
  if (state.rootCampaigns) {
    sessions = Object.entries(state.rootCampaigns.campaigns)
      .map(([campaignId, campaign]) => {
        if (campaign.sessions) {
          return filterUnpublished(
            Object.entries(campaign.sessions),
            isDungeonMasterSelector(state)
          ).map(([sessionId, session]) => {
            return {
              campaignId: campaignId,
              sessionId: sessionId,
              session: session,
            };
          });
        }
        return undefined;
      })
      .filter(Boolean)
      .flat();
  }
  return sessions;
};

export const getNextSession = (state: RootReducerProp) => {
  let selectedSessionDay = state.selected.selectedSession?.session.sessionDay;
  if (
    selectedSessionDay &&
    typeof selectedSessionDay === "number" &&
    state.selected.selectedCampaign?.campaign.sessions
  ) {
    let nextSession = Object.entries(
      state.selected.selectedCampaign.campaign.sessions
    ).filter(([id, session]) => {
      if (selectedSessionDay) {
        return session.sessionDay === selectedSessionDay + 1;
      }
      return false;
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
  let selectedSessionDay = state.selected.selectedSession?.session.sessionDay;
  if (
    typeof selectedSessionDay === "number" &&
    state.selected.selectedCampaign?.campaign.sessions
  ) {
    let previousSession = Object.entries(
      state.selected.selectedCampaign?.campaign.sessions
    ).filter(([id, session]) => {
      if (selectedSessionDay) {
        return session.sessionDay === selectedSessionDay - 1;
      }
      return false;
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
