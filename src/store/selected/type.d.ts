
type SelectedState = {
    selectedCampaign: ICampaign
    selectedSession: ISelectedSession
    selectedPlayer: ISelectedPlayer
}

type ISelectedSession = {
    id?: string,
    session: ISesson
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