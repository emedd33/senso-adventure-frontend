interface ISession {
    title: string
    story: string
    date: string
    campaign: any
    subtitle?: string
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
    title: string
    campaignTitleImageFile: string
    campaignBackgroundImageFile: string
    campaignCrestImageFile: string
    isNew: boolean
    id: string
    dungeonMaster: string
    sessions: ISession[],
    players: IPlayer[],
}


type CampaignAction = {
    type: string,
    payload: any
}


type AdventureDispatchType = (args: CampaignAction) => CampaignAction 