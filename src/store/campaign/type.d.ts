interface ISession {
    title: string
    story: string
    date: string
    campaign: any
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
    campaignTitle: any
    id: string
    dungeonMaster: string
    sessions: ISession[],
    players: IPlayer[],
    backgroundImage: string,
}
type CampaignState = {
    curseOfStrahd: ICampaign,
}

type CampaignAction = {
    type: string,
    payload: any
}


type AdventureDispatchType = (args: CampaignAction) => CampaignAction 