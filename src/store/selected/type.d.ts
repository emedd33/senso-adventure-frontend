
type SelectedState = {
    selectedCampaign?: ICampaign
    selectedSession?: ISession
    selectedPlayer?: ISelectedPlayer
}
type SelectedActions = {
    type: string,
    payload: any
}
type SelectedPlayerAction = {
    type: string,
}
type ISelectedPlayer = {
    isNew: boolean,
    player: any,
    id?: string,
}