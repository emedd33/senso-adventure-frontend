import { Dispatch } from "redux";

import {
  REFRESH_SELECTED_CAMPAIGN,
  SET_SELECTED_CAMPAIGN,
  SET_SELECTED_PLAYER,
  SET_SELECTED_SESSION,
  UPDATE_SELECTED_PLAYER,
} from "./selectedActions";
import { initialSelectedCampaignState } from "./selectedReducer";


export const dispatchSetSelectedPlayer = (selectedPlayer: ISelectedPlayer) => {
  return async (dispatch: Dispatch) => {
    dispatch(setSelectedPlayer(selectedPlayer));
  };
};

export const refreshSelectedCampaign = (campaigns: ICampaign[]) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: REFRESH_SELECTED_CAMPAIGN, payload: campaigns })
  }
}


export const clearSelectedCampaign = () => {
  return {
    type: SET_SELECTED_CAMPAIGN,
    payload: { id: "", campaign: initialSelectedCampaignState },
  };
};

export const updateSelectedPlayer = (update: any) => {
  return {
    type: UPDATE_SELECTED_PLAYER,
    payload: update,
  };
};


export const setSelectedPlayer = (selectedPlayer?: ISelectedPlayer) => {
  return {
    type: SET_SELECTED_PLAYER,
    payload: selectedPlayer,
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
