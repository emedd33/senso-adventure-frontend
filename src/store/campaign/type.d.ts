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
    id: string
    dungeonMaster: string
    sessions: ISession[],
    players: IPlayer[]
}
type CampaignState = {
    curseOfStrahd: ICampaign,
    fireAndFury: ICampaign
}

type CampaignAction = {
    type: string,
    payload: any
}


type AdventureDispatchType = (args: CampaignAction) => CampaignAction 