import { Dispatch } from "redux";
import { campaignsRef } from "../../firebase";
import { setIsLoading } from "../admin/adminCreator";
import { SET_SELECTED_CAMPAIGN, SET_SELECTED_PLAYER, SET_SELECTED_SESSION, UPDATE_SELECTED_PLAYER } from "./selectedActions";

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

export const dispatchSetSelectedSession = (selectedSession?: ISession) => {
    return async (dispatch: Dispatch) => {
        dispatch(setIsLoading(true));
        dispatch(setSelectedSession(selectedSession))
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
export const setSelectedSession = (selectedSession?: ISession) => {
    return {
        type: SET_SELECTED_SESSION,
        payload: selectedSession
    }
}