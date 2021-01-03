interface IAdventure {
    id: number
    title: string
    body: string
    story: string
    //date: string
}
type CampaignState = {
    adventures: IAdventure[]
}

type AdventureAction = {
    type: string,
    payload: any
}


type AdventureDispatchType = (args: AdventureAction) => AdventureAction 