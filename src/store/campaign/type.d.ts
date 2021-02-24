interface ISession {
  title: string;
  story: string;
  date: string;
  campaignTitle: string;
  sessionDay: number;
  date: string;
  subTitle?: string;
  slug: string;
}
interface IPlayer {
  playerName: string;
  characterName: string;
  race: string;
  class: string;
  level: number;
  isDead: string;
}
interface ICampaign {
  slug: string;
  title: string;
  subTitle: string;
  slug: string;
  isNew: boolean;
  id: string;
  dungeonMaster: string;
  sessions: ISession[];
  players: IPlayer[];
}
