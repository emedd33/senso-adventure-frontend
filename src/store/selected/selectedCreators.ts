import { Dispatch } from "redux";
import { storage } from "../../firebase";
import { setIsLoading } from "../admin/adminCreator";
import {
  SET_BACKGROUND_IMAGE,
  SET_SELECTED_CAMPAIGN,
  SET_SELECTED_PLAYER,
  SET_SELECTED_SESSION,
  UPDATE_SELECTED_PLAYER,
} from "./selectedActions";
import { initialSelectedCampaignState } from "./selectedReducer";


export const cleanSelectedCampaign = () => {
  return async (dispatch: Dispatch) => {
    dispatch(setSelectedCampaign());
  }
}

export const dispatchSetSelectedPlayer = (selectedPlayer: ISelectedPlayer) => {
  return async (dispatch: Dispatch) => {
    dispatch(setIsLoading(true));
    dispatch(setSelectedPlayer(selectedPlayer));
    dispatch(setIsLoading(false));
  };
};

export const dispatchSetSelectedSession = (
  selectedSession?: ISelectedSession
) => {
  return async (dispatch: Dispatch) => {
    dispatch(setIsLoading(true));
    dispatch(setSelectedSession(selectedSession));
    dispatch(setIsLoading(false));
  };
};

export const setBackgroundImageFromFirebase = (imageFile: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(setIsLoading(true));
    return storage
      .ref("Images/Background/dnd_background.jpg")
      .getDownloadURL()
      .then((url: string) => dispatch(setBackgroundImage(url)))
      .catch((e) => {
        console.log(
          "Could not fetch background image " +
          imageFile +
          " from Firebase: " +
          e
        );
        return null;
      })
      .finally(() => dispatch(setIsLoading(false)));
  };
};
export const clearSelectedCampaign = () => {
  return {
    type: SET_SELECTED_CAMPAIGN,
    payload: initialSelectedCampaignState,
  };
};

export const updateSelectedPlayer = (update: any) => {
  return {
    type: UPDATE_SELECTED_PLAYER,
    payload: update,
  };
};

export const setBackgroundImage = (url: string) => {
  return {
    type: SET_BACKGROUND_IMAGE,
    payload: url,
  };
};
export const setSelectedPlayer = (selectedPlayer?: ISelectedPlayer) => {
  return {
    type: SET_SELECTED_PLAYER,
    payload: selectedPlayer,
  };
};
export const setSelectedCampaign = (id?: string, campaign?: ICampaign) => {
  return {
    type: SET_SELECTED_CAMPAIGN,
    payload: { id: id, campaign: campaign },
  };
};

export const setSelectedSession = (selectedSession?: ISelectedSession) => {
  return {
    type: SET_SELECTED_SESSION,
    payload: selectedSession,
  };
};
