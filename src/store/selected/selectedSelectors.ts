import { campaignsRef, storage } from "../../firebase";

export const getSelectedSession = (state: RootReducerProp) => state.selected.selectedSession

export const getSelectedCampaign = (state: RootReducerProp) => {
    return state.selected.selectedCampaign
}


export const isDungeonMasterSelector = (state: RootReducerProp) => {
    let username = state.admin.authUser?.username;
    if (username) {
        return state.selected.selectedCampaign.campaign.dungeonMaster === username;
    }
    return false;
};

export const getSelectedSessionStorageRef = (state: RootReducerProp) => {
    console.log(state)
    return storage.ref()
        .child("Campaigns")
        .child(state.selected.selectedCampaign?.campaign?.title)
        .child("Sessions")
        .child(state.selected.selectedSession?.session?.title)
}
export const getSelectedSessionDatabaseRef = (state: RootReducerProp) => {
    return campaignsRef
        .child(state.selected?.selectedCampaign?.id)
        .child("sessions")
        .child(state.selected?.selectedSession?.id)

} 