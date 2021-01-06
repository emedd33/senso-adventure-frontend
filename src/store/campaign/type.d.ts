interface ISession {
    title: string
    story: string
    date: string
}
interface ICampaign {
    sessions: ISession[]
}
type CampaignState = {
    curseOfStrahd: ICampaign
}

type AdventureAction = {
    type: string,
    payload: any
}


type AdventureDispatchType = (args: AdventureAction) => AdventureAction 