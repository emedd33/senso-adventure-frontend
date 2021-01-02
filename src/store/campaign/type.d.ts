interface IAdventure {
    id: number
    title: string
    body: string
    //date: string
    //story: string
}
type CampaignState = {
    adventures: IAdventure[]
}

type AdventureAction = {
    type: string
    adventure: IAdventure
}


type AdventureDispatchType = (args: any) => AdventureAction