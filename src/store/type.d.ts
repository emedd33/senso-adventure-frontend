type CrestObjectType = {
    title: string,
    url: string
}
type RootReducerProp = {
    rootCampaigns: { campaigns: ICampaign[], sessions: ISession[], campaignCrestFiles: CrestObjectType[] },
    admin: AdminState,
    selected: SelectedState
}