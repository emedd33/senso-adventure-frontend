import { Dispatch } from "redux";
import { campaignsRef } from "../../firebase";
import { setIsLoading } from "../admin/adminCreator";
import { SET_SELECTED_CAMPAIGN, SET_SELECTED_PLAYER, UPDATE_SELECTED_PLAYER } from "./selectedActions";

export const dispatchSetSelectedCampaign = (selectedCampaign: string) => {
    return async (dispatch: Dispatch) => {
        dispatch(setIsLoading(true));
        campaignsRef.child(selectedCampaign).once('value', (snapshot: any) => {
            let items = snapshot.val();
            dispatch(setSelectedCampaign(items))
        }).finally(() => dispatch(setIsLoading(false)))
    }
}

export const dispatchSetSelectedPlayer = (selectedPlayer: ISelectedPlayer) => {
    return async (dispatch: Dispatch) => {
        dispatch(setIsLoading(true));
        dispatch(setSelectedPlayer(selectedPlayer))
        dispatch(setIsLoading(false))
    }
}

export const updateSelectedPlayer = (update: any) => {
    return {
        type: UPDATE_SELECTED_PLAYER,
        payload: update
    }
}

export const setSelectedPlayer = (selectedPlayer?: ISelectedPlayer) => {
    return {
        type: SET_SELECTED_PLAYER,
        payload: selectedPlayer
    }
}
export const setSelectedCampaign = (selectedCampaign?: ICampaign) => {
    return {
        type: SET_SELECTED_CAMPAIGN,
        payload: selectedCampaign
    }
}