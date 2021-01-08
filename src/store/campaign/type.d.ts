interface ISession {
    title: string
    story: string
    date: string
    campaign: string
}
interface IPlayer {
    playerName: string,
    characterName: string,
    race: string,
    class: string,
    level: number,
    isDead: string,
}
interface ICampaign {
    sessions: ISession[],
    players: IPlayer[]
}
type CampaignState = {
    curseOfStrahd: ICampaign,
    fireAndFury: ICampaign
}

type AdventureAction = {
    type: string,
    payload: any
}


type AdventureDispatchType = (args: AdventureAction) => AdventureAction 