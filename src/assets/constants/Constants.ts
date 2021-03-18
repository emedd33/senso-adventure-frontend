export const MAX_NUM_SCROLLS_HOMEPAGE = 10;
export const OLD_WHITE = "#FAEBD7";
export const OLD_WHITE_DARK = "#E4D6C4"
export const OLD_WHITE_TRANSPARENT = "rgba(250, 235, 215,0.7)";
export const DEEP_RED = "#750615";
export const LIGHT_PINK = "#AB9696";
export const LIGHT_PURPLe = "#AB9696";
export const HOST = "https://senso-adventure.web.app/"

export const NEW_LOCATION: ILocation = {
    name: "",
    nickNames: [],
    isPublished: "FALSE",
    slug: "",
    summary: "",
    characters: [],
    keyElements: [],
    resources: [],
    connectedPlaces: []
}

export const NEW_SESSION: ISession = {
    date: new Date().toDateString(),
    title: "",
    isPublished: "FALSE",
    subTitle: "",
    campaignTitle: "",
    sessionDay: 1,
    slug: "",
}
export const NEW_MONSTER: IMonster = {
    name: "",
    nickNames: [],
    isPublished: "FALSE",
    summary: "",
    slug: "",
    race: "Human",
    alignment: "True neutral",
    isUnique: "TRUE",
    languages: ["Common"],
    isDead: "FALSE",
    actions: [],
    description: "",
    stats: {
        armorClass: 12,
        speed: 30,
        hitPoints: 10,
        proficiency: 2,
        passivePerception: 10,
        strength: { value: 10, isProficient: "FALSE" },
        dexterity: { value: 10, isProficient: "FALSE" },
        wisdom: { value: 10, isProficient: "FALSE" },
        constitution: { value: 10, isProficient: "FALSE" },
        intelligence: { value: 10, isProficient: "FALSE" },
        charisma: { value: 10, isProficient: "FALSE" },
        skills: {
            athletics: { proficient: "FALSE" },
            acrobatics: { proficient: "FALSE" },
            sleightOfHand: { proficient: "FALSE" },
            stealth: { proficient: "FALSE" },
            arcana: { proficient: "FALSE" },
            history: { proficient: "FALSE" },
            investigation: { proficient: "FALSE" },
            nature: { proficient: "FALSE" },
            religion: { proficient: "FALSE" },
            animalHandling: { proficient: "FALSE" },
            insight: { proficient: "FALSE" },
            medicine: { proficient: "FALSE" },
            perception: { proficient: "FALSE" },
            survival: { proficient: "FALSE" },
            deception: { proficient: "FALSE" },
            intimidation: { proficient: "FALSE" },
            performance: { proficient: "FALSE" },
            persuasion: { proficient: "FALSE" },
        },
    },
};


export const NEW_PLAYER: IPlayer = {
    name: "",
    nickNames: [],
    isPublished: "FALSE",
    summary: "",
    slug: "",
    race: "Human",
    alignment: "True neutral",
    isUnique: "TRUE",
    languages: ["Common"],
    isDead: "FALSE",
    actions: [],
    level: 1,
    description: "",
    stats: {
        armorClass: 12,
        speed: 30,
        hitPoints: 10,
        proficiency: 2,
        passivePerception: 10,
        strength: { value: 10, isProficient: "FALSE" },
        dexterity: { value: 10, isProficient: "FALSE" },
        wisdom: { value: 10, isProficient: "FALSE" },
        constitution: { value: 10, isProficient: "FALSE" },
        intelligence: { value: 10, isProficient: "FALSE" },
        charisma: { value: 10, isProficient: "FALSE" },
        skills: {
            athletics: { proficient: "FALSE" },
            acrobatics: { proficient: "FALSE" },
            sleightOfHand: { proficient: "FALSE" },
            stealth: { proficient: "FALSE" },
            arcana: { proficient: "FALSE" },
            history: { proficient: "FALSE" },
            investigation: { proficient: "FALSE" },
            nature: { proficient: "FALSE" },
            religion: { proficient: "FALSE" },
            animalHandling: { proficient: "FALSE" },
            insight: { proficient: "FALSE" },
            medicine: { proficient: "FALSE" },
            perception: { proficient: "FALSE" },
            survival: { proficient: "FALSE" },
            deception: { proficient: "FALSE" },
            intimidation: { proficient: "FALSE" },
            performance: { proficient: "FALSE" },
            persuasion: { proficient: "FALSE" },
        },
    },
};