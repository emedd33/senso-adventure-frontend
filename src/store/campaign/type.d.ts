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
  summary: string;
  slug: string;
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
  armorClass: number;
  speed: number;
  hitPoints: number;
  tempHitPoints?: number;
  proficiency: number;
  passivePerception: number;
  inspiration?: string;
  strength: number;
  dexterity: number;
  wisdom: number;
  constitution: number;
  intelligence: number;
  charisma: number;
  savingThrows: ISavingThrows;
  skills: ISkills;
}
interface ISavingThrows {
  strength: ISavingThrowsInfo;
  dexterity: ISavingThrowsInfo;
  wisdom: ISavingThrowsInfo;
  constitution: ISavingThrowsInfo;
  intelligence: ISavingThrowsInfo;
  charisma: ISavingThrowsInfo;
}
interface ISkills {
  athletics: ISkillInfo;
  acrobatics: ISkillInfo;
  sleightOfHand: ISkillInfo;
  stealth: ISkillInfo;
  arcana: ISkillInfo;
  history: ISkillInfo;
  investigation: ISkillInfo;
  nature: ISkillInfo;
  religion: ISkillInfo;
  animalHandling: ISkillInfo;
  insight: ISkillInfo;
  medicine: numISkillInfober;
  perception: ISkillInfo;
  survival: ISkillInfo;
  deception: ISkillInfo;
  intimidation: ISkillInfo;
  performance: ISkillInfo;
  persuasion: ISkillInfo;
}
interface ISavingThrowsInfo {
  value: number;
  proficient: string;
}
interface ISkillInfo {
  value: number;
  proficient: string;
}
