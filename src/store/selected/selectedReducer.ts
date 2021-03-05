import {
  REFRESH_SELECTED_CAMPAIGN,
  SET_BACKGROUND_IMAGE,
  SET_SELECTED_CAMPAIGN,
  SET_SELECTED_CHARACTER,
  SET_SELECTED_LOCATION,
  SET_SELECTED_SESSION,
} from "./selectedActions";

export const initialSelectedCampaignState = {
  id: "",
  title: "",
  subTitle: "",
  slug: "",
  dungeonMaster: "",
  sessions: [],
  locations: [],
  characters: [],
  isNew: true,
};
export const initialSelectedSessionState = {
  title: "",
  subTitle: "",
  story: "",
  isPublished: "FALSE",
  slug: "",
  sessionDay: 1,
  date: new Date().toDateString(),
  campaignTitle: "",
};

const selectedReducer = (
  state: SelectedState = {},
  action: SelectedActions
): SelectedState => {
  switch (action.type) {
    case SET_SELECTED_CAMPAIGN:
      state.selectedCampaign = action.payload;
      return state;
    case SET_SELECTED_CHARACTER: {
      state.selectedCharacter = action.payload;
      return state;
    }
    case SET_SELECTED_SESSION: {
      state.selectedSession = action.payload;
      return state;
    }
    case SET_SELECTED_LOCATION: {
      state.selectedLocation = action.payload;
      return state;
    }
    case SET_BACKGROUND_IMAGE: {
      return {
        ...state,
        backgroundImage: action.payload,
      };
    }
    case REFRESH_SELECTED_CAMPAIGN: {
      if (state.selectedCampaign) {
        let filteredCampaign = Object.entries(action.payload).filter(
          ([id]) => id === state.selectedCampaign?.id
        );
        if (filteredCampaign.length > 0) {
          let updatedCampaign: { id: string; campaign: any } = Object({
            id: filteredCampaign[0][0],
            campaign: filteredCampaign[0][1],
          });
          return {
            ...state,
            selectedCampaign: updatedCampaign,
          };
        }
      }
    }
  }
  return state;
};
export default selectedReducer;
