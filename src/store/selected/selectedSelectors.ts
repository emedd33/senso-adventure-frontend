import { campaignsRef, storage } from "../../firebase";

export const getSelectedSession = (state: RootReducerProp) => state.selected.selectedSession

export const getSelectedCampaign = (state: RootReducerProp) => {
    return state.selected.selectedCampaign
}


export const isDungeonMasterSelector = (state: RootReducerProp) => {
    let username = state.admin.authUser?.username;
    if (username) {
        return state.selected.selectedCampaign?.campaign.dungeonMaster === username;
    }
    return false;
};

export const getSelectedSessionStorageRef = (state: RootReducerProp) => {
    console.log(state)
    if (state.selected.selectedCampaign && state.selected.selectedSession) {
        return storage.ref()
            .child("Campaigns")
            .child(state.selected.selectedCampaign?.campaign?.title)
            .child("Sessions")
            .child(state.selected.selectedSession?.session?.title)
    }
}
export const getSelectedSessionDatabaseRef = (state: RootReducerProp) => {
    if (state.selected.selectedCampaign && state.selected.selectedSession) {
        return campaignsRef
            .child(state.selected?.selectedCampaign?.id)
            .child("sessions")
            .child(state.selected?.selectedSession?.id)
    }

}
export const getSelectedCampaignDatabaseRef = (state: RootReducerProp) => {
    if (state.selected.selectedCampaign) {
        return campaignsRef
            .child(state.selected?.selectedCampaign?.id)
    }
}

export const getPlayerCharacter = (state: RootReducerProp) => {
    let players;
    if (state.selected.selectedCampaign) {
        players = state.selected.selectedCampaign.campaign.characters?.filter((character: ICharacter) => character.isPlayer === "TRUE")
    }
    return players ? players : []

}
export const getNpc = (state: RootReducerProp) => {
    let npc;
    if (state.selected.selectedCampaign) {
        npc = state.selected.selectedCampaign.campaign.characters?.filter((character: ICharacter) => character.isUnique === "TRUE")
    }
    return npc ? npc : []

}