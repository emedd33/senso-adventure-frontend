
interface ICampaign {
  slug: string;
  title: string;
  subTitle: string;
  slug: string;
  isNew: boolean;
  id: string;
  dungeonMaster: { username: string, uid: string };
  sessions?: ISession[];
  characters?: IMonster[];
  players?: IPlayer[];
  locations?: ILocation[];

}
