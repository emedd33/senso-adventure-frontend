
interface IMonster {
    actions?: IMonsterAction[];
    alignment: string;
    conditionImmunities?: string[];
    challengeRating?: string;
    class?: string;
    damageImmunities?: string[];
    damageResistances?: string[];
    damageVulnerabilities?: string[];
    forms?: APIReference;
    index: string;
    isDead?: string;
    isPublished: string;
    isUnique?: string;
    languages?: string[];
    legendaryActions?: IMonsterAction[];
    name: string;
    nickNames?: string[];
    senses?: ISenses;
    slug: string;
    specialAbilities?: IMonsterAction[];
    stats: IMonsterStats;
    size?: string;
    subtype?: string;
    summary: string;
    type?: string;
    xp?: number;
}
interface IMonsterStats {
    armorClass: number;
    speed: IMonsterSpeed;
    hitPoints: number;
    hitDice?: string;
    strength: number;
    dexterity: number;
    wisdom: number;
    constitution: number;
    intelligence: number;
    charisma: number;
    proficiencies: IMonsterProficiency[]
}
interface IMonsterAction {
    name: string;
    desc: string;
    damage?: IMonsterDamage[]
    dc?: IMonsterDc;
    attack_options?: IChoose;
    attack_bonus: number;
    usage: { type: string }
}

interface IMonsterDamage {
    damage_dice: string;
    damage_type: APIReference
}
interface IMonsterSpeed {
    climb?: string;
    fly?: string;
    walk?: string;
    swim?: string;
}
interface ISenses {
    passive_perception?: number;
    darkvision?: string,
    blindsight?: string,
    tremorsense?: string,
    truesight?: string,
}
interface IMonsterDc {
    dc_type: APIReference;
    dc_value: number;
    success_type: string
}
interface IMonsterProficiency {
    value: number
    proficiency: APIReference
}

type APIReference = {
    index: string;
    name: string;
    url: string
}

interface IChoose {
    choose: number;
    type: string;
    from: APIReference[]
}

interface IClassAPIResource {
    index: string;
    class: string;
    url: string
}

interface ICost {
    quantity: number;
    unit: string
}

interface IAbilityBonus {
    bonus: number;
    ability_scrore: APIReference
}