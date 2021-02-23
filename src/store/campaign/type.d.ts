interface ISession {
  title: string;
  story: string;
  date: string;
  campaign: any;
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
  slug: unknown;
  title: string;
  subTitle: string;
  slug: string;
  isNew: boolean;
  id: string;
  dungeonMaster: string;
  sessions: ISession[];
  players: IPlayer[];
}
