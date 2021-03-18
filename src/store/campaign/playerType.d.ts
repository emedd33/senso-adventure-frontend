
interface IPlayer {
    name: string;
    nickNames: string[];
    isPublished: string;
    summary: string;
    slug: string;
    isPlayer: string;
    race: string;
    alignment: string;
    languages?: string[];
    isDead?: string;
    immunities?: string[];
    stats: IStats;
    actions?: IAction[];
    senses?: string[];
    isUnique: string;
    challengeRating?: string;
    playerName?: string;
    level?: number;
    class?: string;
    description: string;
}
interface IStats {
    armorClass: number;
    speed: number;
    hitPoints: number;
    proficiency: number;
    passivePerception: number;
    inspiration?: string;
    strength: IAbility;
    dexterity: IAbility;
    wisdom: IAbility;
    constitution: IAbility;
    intelligence: IAbility;
    charisma: IAbility;
    skills: ISkills;
}
interface IAction {
    name: string;
    description: string;
}
interface IAbility {
    value: number;
    isProficient: string;
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
    medicine: ISkillInfo;
    perception: ISkillInfo;
    survival: ISkillInfo;
    deception: ISkillInfo;
    intimidation: ISkillInfo;
    performance: ISkillInfo;
    persuasion: ISkillInfo;
}

interface ISkillInfo {
    value?: number;
    proficient: string;
}
