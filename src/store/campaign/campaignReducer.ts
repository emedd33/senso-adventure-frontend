import * as actionTypes from "./campaignActions";

type ICampaignState = {
  sessions: ISession[];
  campaigns: ICampaign[];
};
const adventureReducer = (
  state: ICampaignState = {
    campaigns: [],
    sessions: [],
  },
  action: any
): ICampaignState => {
  switch (action.type) {
    case actionTypes.SET_CAMPAIGNS:
      return {
        ...state,
        campaigns: action.payload,
      };
    case actionTypes.SET_SESSIONS:
      return {
        ...state,
        sessions: action.payload,
      };
  }
  return state;
};

export default adventureReducer;
