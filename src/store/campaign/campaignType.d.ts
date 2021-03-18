
interface ICampaign {
  slug: string;
  title: string;
  subTitle: string;
  slug: string;
  isNew: boolean;
  id: string;
  dungeonMaster: { username: string, uid: string };
  sessions?: ISession[];
  characters?: ICharacter[];
  players?: IPlayer[];
  locations?: ILocation[];

}
