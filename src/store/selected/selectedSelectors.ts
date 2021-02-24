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