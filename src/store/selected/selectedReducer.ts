import {
  SET_SELECTED_CAMPAIGN,
  SET_SELECTED_CHARACTER,
  SET_SELECTED_LOCATION,
  SET_SELECTED_SESSION,
  SET_SELECTED_PLAYER,
} from "./selectedActions";

export const initialSelectedCampaignState = {
  id: "",
  title: "",
  subTitle: "",
  slug: "",
  dungeonMaster: { username: "", uid: "" },
  sessions: [],
  locations: [],
  characters: [],
  players: [],
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
    case SET_SELECTED_PLAYER: {
      state.selectedPlayer = action.payload;
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

  }
  return state;
};
export default selectedReducer;
