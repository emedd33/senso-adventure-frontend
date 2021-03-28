export const MAX_NUM_SCROLLS_HOMEPAGE = 10;
export const OLD_WHITE = "#FAEBD7";
export const OLD_WHITE_LIGHT = "#FCF7F0";
export const OLD_WHITE_DARK = "#E4D6C4";
export const OLD_WHITE_TRANSPARENT = "rgba(250, 235, 215,0.7)";
export const DEEP_RED = "#750615";
export const LIGHT_PINK = "#AB9696";
export const LIGHT_PURPLe = "#AB9696";

export const LOGIN_BACKGROUND_IMAGE_STORAGE_PATH =
  "Images/Background/dnd_login.jpg";
export const MONSTER_DATABASE_API = "https://www.dnd5eapi.co";
export const NEW_LOCATION: ILocation = {
  name: "",
  nickNames: [],
  isPublished: "FALSE",
  slug: "",
  description: "",
  characters: [],
  keyElements: [],
  resources: [],
  connectedPlaces: [],
};

export const NEW_SESSION: ISession = {
  date: new Date().toDateString(),
  title: "",
  isPublished: "FALSE",
  subTitle: "",
  campaignTitle: "",
  sessionDay: 1,
  slug: "",
};
export const NEW_MONSTER: IMonster = {
  alignment: "True neutral",
  isPublished: "FALSE",
  slug: "",
  index: "",
  name: "",
  stats: {
    armorClass: 12,
    speed: { climb: "10 ft", swim: "15 ft", walk: "30 ft" },
    hitPoints: 10,
    strength: 10,
    dexterity: 10,
    wisdom: 10,
    constitution: 10,
    intelligence: 10,
    charisma: 10,
    proficiencies: [
      {
        value: 0,
        proficiency: {
          index: "saving-throw-str",
          name: "Saving Throw: STR",
          url: "",
        },
      },
      {
        value: 0,
        proficiency: {
          index: "saving-throw-dex",
          name: "Saving Throw: DEX",
          url: "",
        },
      },
      {
        value: 0,
        proficiency: {
          index: "saving-throw-con",
          name: "Saving Throw: CON",
          url: "",
        },
      },
      {
        value: 0,
        proficiency: {
          index: "saving-throw-wis",
          name: "Saving Throw: WIS",
          url: "",
        },
      },
      {
        value: 0,
        proficiency: {
          index: "saving-throw-int",
          name: "Saving Throw: INT",
          url: "",
        },
      },
      {
        value: 0,
        proficiency: {
          index: "saving-throw-cha",
          name: "Saving Throw: CHA",
          url: "",
        },
      },
    ],
  },
  description: "",
};

export const NEW_PLAYER: IPlayer = {
  name: "",
  nickNames: [],
  isPublished: "FALSE",
  description: "",
  slug: "",
  race: "Human",
  alignment: "True neutral",
  isUnique: "TRUE",
  languages: ["Common"],
  isDead: "FALSE",
  actions: [],
  level: 1,
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
