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
interface CharacterAction {
  name: string,
  description: string,
  tags: string[]
}
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
  places?: IPlaces[];
}
interface ICharacter {
  name: string;
  isPlayer: string;
  race: string;
  alignment: string;
  languages?: string[];
  immunities?: string[];
  stats: IStats;
  actions?: CharacterAction[];
  senses?: string[];
  isUnique: string;
  challengeRating?: string;
  playerName?: string;
  level?: number;
  isDead?: string;
  class?: string;
  Inventory?: string;
}
interface IStats {
  armorClass: string;
  speed: string;
  hitPoints: string;
  proficiency: string;
  strength: number;
  dexterity: number;
  wisdom: number;
  constitution: number;
  intelligence: number;
  charisma: number;
  savingThrows: ISavingThrows
}
interface ISavingThrows {
  strength: number;
  dexterity: number;
  wisdom: number;
  constitution: number;
  intelligence: number;
  charisma: number;
}
