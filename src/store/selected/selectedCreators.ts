import { Dispatch } from "redux";
import { setIsLoading } from "../admin/adminCreator";
import { SET_SELECTED_CAMPAIGN } from "./selectedActions";

export const dispatchSetSelectedCampaign = (selectedCampaign: ICampaign) => {
    return async (dispatch: Dispatch) => {
        dispatch(setIsLoading(true));
        dispatch(setSelectedCampaign(selectedCampaign))
        dispatch(setIsLoading(false))
    }
}


export const setSelectedCampaign = (selectedCampaign?: ICampaign) => {
    return {
        type: SET_SELECTED_CAMPAIGN,
        payload: selectedCampaign
    }
}