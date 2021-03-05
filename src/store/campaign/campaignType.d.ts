
interface ICampaign {
  slug: string;
  title: string;
  subTitle: string;
  slug: string;
  isNew: boolean;
  id: string;
  dungeonMaster: string;
  sessions?: ISession[];
  characters?: ICharacter[];
  locations?: ILocation[];

}
