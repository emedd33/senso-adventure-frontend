
import {
  SET_SELECTED_CAMPAIGN,
  SET_SELECTED_CHARACTER,
  SET_SELECTED_LOCATION,
  SET_SELECTED_SESSION,
  SET_SELECTED_PLAYER
} from "./selectedActions";
import { initialSelectedCampaignState } from "./selectedReducer";


export const clearSelectedCampaign = () => {
  return {
    type: SET_SELECTED_CAMPAIGN,
    payload: { id: "", campaign: initialSelectedCampaignState },
  };
};

export const setSelectedLocation = (
  selectedLocation?: ISelectedLocation
) => {
  return { type: SET_SELECTED_LOCATION, payload: selectedLocation }

}
export const setSelectedCharacter = (
  selectedCharacter?: ISelectedCharacter
) => {
  return {
    type: SET_SELECTED_CHARACTER,
    payload: selectedCharacter,
  };
};

export const setSelectedPlayer = (
  selectedPlayer?: ISelectedPlayer
) => {
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
