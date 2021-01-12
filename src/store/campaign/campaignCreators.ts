import { campaignsRef } from "../../firebase"
import { SET_IS_LOADING } from "../admin/adminActions"
import { SET_CAMPAIGNS } from "./campaignActions"



// Thunk function
export async function fetchCampaigns(dispatch: any) {
    dispatch({ type: SET_IS_LOADING, payload: true })
    campaignsRef.on('value', (snapshot) => {
        let items = snapshot.val();
        dispatch({ type: SET_CAMPAIGNS, payload: items })
    })
    dispatch({ type: SET_IS_LOADING, payload: false })
}

