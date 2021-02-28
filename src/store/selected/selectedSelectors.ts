import { campaignsRef, storage } from "../../firebase";

export const getSelectedSession = (state: RootReducerProp) => state.selected.selectedSession

export const getSelectedCampaign = (state: RootReducerProp) => {
    return state.selected.selectedCampaign
}
export const getSelectedCharacter = (state: RootReducerProp) => {
    return state.selected.selectedCharacter
}
export const getSelectedCharacterIsPlayer = (state: RootReducerProp) => {
    return state.selected.selectedCharacter?.character.isPlayer === "TRUE"
}

export const isDungeonMasterSelector = (state: RootReducerProp) => {
    let username = state.admin.authUser?.username;
    if (username) {
        return state.selected.selectedCampaign?.campaign.dungeonMaster === username;
    }
    return false;
};

export const getSelectedSessionStorageRef = (state: RootReducerProp) => {
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

export const getSelectedCharacterDatabaseRef = (state: RootReducerProp) => {
    if (state.selected.selectedCampaign && state.selected.selectedCharacter) {
        return campaignsRef
            .child(state.selected?.selectedCampaign?.id)
            .child("characters")
            .child(state.selected.selectedCharacter.id)
    }
}

export const getPlayerCharacters = (state: RootReducerProp) => {
    let players;
    if (state.selected.selectedCampaign && state.selected.selectedCampaign.campaign.characters) {
        players = Object.entries(state.selected.selectedCampaign.campaign.characters)
            .filter(([, character]) => character.isPlayer === "TRUE")
            .map((player) => { return { id: player[0], character: player[1] } })
    }
    return players ? players : []

}
export const getUniqueNpc = (state: RootReducerProp) => {
    let npcs;
    if (state.selected.selectedCampaign && state.selected.selectedCampaign.campaign.characters) {
        npcs = Object.entries(state.selected.selectedCampaign.campaign.characters)
            .filter(([, character]) => character.isUnique === "TRUE")
            .map(([id, character]) => { return { id: id, character: character } })
    }
    return npcs ? npcs : []

}