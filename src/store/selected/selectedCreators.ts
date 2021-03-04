import { Dispatch } from "redux";

import {
  REFRESH_SELECTED_CAMPAIGN,
  SET_SELECTED_CAMPAIGN,
  SET_SELECTED_CHARACTER,
  SET_SELECTED_SESSION,
} from "./selectedActions";
import { initialSelectedCampaignState } from "./selectedReducer";

export const refreshSelectedCampaign = (campaigns: ICampaign[]) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: REFRESH_SELECTED_CAMPAIGN, payload: campaigns });
  };
};

export const clearSelectedCampaign = () => {
  return {
    type: SET_SELECTED_CAMPAIGN,
    payload: { id: "", campaign: initialSelectedCampaignState },
  };
};

export const setSelectedCharacter = (
  selectedCharacter?: ISelectedCharacter
) => {
  return {
    type: SET_SELECTED_CHARACTER,
    payload: selectedCharacter,
  };
};
export const setSelectedCampaign = (selectedCampaign?: ISelectedCampaign) => {
  return {
    type: SET_SELECTED_CAMPAIGN,
    payload: selectedCampaign,
  };
};

export const setSelectedSession = (selectedSession?: ISelectedSession) => {
  return {
    type: SET_SELECTED_SESSION,
    payload: selectedSession,
  };
};
