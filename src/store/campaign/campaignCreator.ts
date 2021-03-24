import { Dispatch } from "redux";
import {
    SET_CAMPAIGNS,
} from "./campaignActions";
export const setCampaigns = (campaigns?: any[]) => {
    return async (dispatch: Dispatch) => {
        console.log(campaigns)
        dispatch({ type: SET_CAMPAIGNS, payload: campaigns ? campaigns : [] })
    }
}