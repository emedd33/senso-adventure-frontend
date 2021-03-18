import { MentionData } from "@draft-js-plugins/mention";
import { database, storage } from "../../firebase";
import { getHost } from "../../utils/getHost";

export const getSelectedSession = (state: RootReducerProp) =>
    state.selected.selectedSession;

export const getSelectedCampaign = (state: RootReducerProp) => {
    return state.selected.selectedCampaign;
};
export const getSelectedCampaignSlug = (state: RootReducerProp) => {
    return state.selected.selectedCampaign?.campaign.slug;
};
export const getSelectedMonster = (state: RootReducerProp) => {
    return state.selected.selectedMonster;
};
export const getSelectedPlayer = (state: RootReducerProp) => {
    return state.selected.selectedPlayer;
};
export const getSelectedLocation = (state: RootReducerProp) => {
    return state.selected.selectedLocation;
};

export const isDungeonMasterSelector = (state: RootReducerProp) => {
    let uid = state.admin.authUser?.uid;
    if (uid) {
        return state.selected.selectedCampaign?.campaign.dungeonMaster.uid === uid;
    }
    return false;
};

export const getSelectedCampaignMonsters = (state: RootReducerProp) => {
    if (isDungeonMasterSelector(state)) {
        if (state.selected.selectedCampaign) {
            if (state.selected.selectedCampaign.campaign.monsters) {
                return Object.entries(
                    state.selected.selectedCampaign.campaign.monsters
                );
            }
        }
    } else {
        if (state.selected.selectedCampaign) {
            if (state.selected.selectedCampaign.campaign.monsters) {
                return Object.entries(
                    state.selected.selectedCampaign.campaign.monsters
                ).filter(
                    ([id, monster]: [string, IMonster]) =>
                        monster.isPublished === "TRUE"
                );
            }
        }
    }
};

export const getSelectedCampaignPlayers = (state: RootReducerProp) => {
    if (isDungeonMasterSelector(state)) {
        if (state.selected.selectedCampaign) {
            if (state.selected.selectedCampaign.campaign.players) {
                return Object.entries(
                    state.selected.selectedCampaign.campaign.players
                );
            }
        }
    } else {
        if (state.selected.selectedCampaign) {
            if (state.selected.selectedCampaign.campaign.players) {
                return Object.entries(
                    state.selected.selectedCampaign.campaign.players
                ).filter(
                    ([id, player]: [string, IPlayer]) =>
                        player.isPublished === "TRUE"
                );
            }
        }
    }
};




export const getSelectedCampaignSessions = (state: RootReducerProp) => {
    if (isDungeonMasterSelector(state)) {
        if (state.selected.selectedCampaign) {
            if (state.selected.selectedCampaign.campaign.sessions) {
                return Object.entries(
                    state.selected.selectedCampaign.campaign.sessions
                );
            }
        }
    } else {
        if (state.selected.selectedCampaign) {
            if (state.selected.selectedCampaign.campaign.sessions) {
                return Object.entries(
                    state.selected.selectedCampaign.campaign.sessions
                ).filter(
                    ([id, session]: [string, ISession]) =>
                        session.isPublished === "TRUE"
                );
            }
        }
    }
};



export const getSelectedCampaignLocations = (state: RootReducerProp) => {
    if (isDungeonMasterSelector(state)) {
        if (state.selected.selectedCampaign) {
            if (state.selected.selectedCampaign.campaign.locations) {
                return Object.entries(
                    state.selected.selectedCampaign.campaign.locations
                );
            }
        }
    } else {
        if (state.selected.selectedCampaign) {
            if (state.selected.selectedCampaign.campaign.locations) {
                return Object.entries(
                    state.selected.selectedCampaign.campaign.locations
                ).filter(
                    ([id, location]: [string, ILocation]) =>
                        location.isPublished === "TRUE"
                );
            }
        }
    }
};

// STORAGE REF
export const getSelectedSessionStorageRef = (state: RootReducerProp) => {
    if (state.selected.selectedCampaign && state.selected.selectedSession) {
        return storage.ref(`Campaigns/${state.selected.selectedCampaign?.campaign?.slug}/session/${state.selected.selectedSession?.session.slug}`)

    }
};

export const getSelectedLocationStorageRef = (state: RootReducerProp) => {
    if (state.selected.selectedCampaign && state.selected.selectedLocation) {
        return storage.ref(`Campaigns/${state.selected.selectedCampaign?.campaign?.slug}/locations/${state.selected.selectedLocation?.location.slug}`)
    }
};


export const getSelectedMonsterStorageRef = (state: RootReducerProp) => {
    if (state.selected.selectedCampaign && state.selected.selectedMonster) {
        return storage.ref(`Campaigns/${state.selected.selectedCampaign?.campaign?.slug}/monsters/${state.selected.selectedMonster?.monster.slug}`)

    }
};

export const getSelectedPlayerStorageRef = (state: RootReducerProp) => {
    if (state.selected.selectedCampaign && state.selected.selectedPlayer) {
        return storage.ref(`Campaigns/${state.selected.selectedCampaign?.campaign?.slug}/players/${state.selected.selectedPlayer?.player.slug}`)
    }
};



// DATABASE REF
export const getSelectedSessionDatabaseRef = (state: RootReducerProp) => {
    if (state.selected.selectedCampaign && state.selected.selectedSession) {
        return database.ref(`campaigns/${state.selected?.selectedCampaign?.id}/sessions/${state.selected?.selectedSession?.id}`)
    }
};

export const getSelectedLocationDatabaseRef = (state: RootReducerProp) => {
    if (state.selected.selectedCampaign && state.selected.selectedLocation) {
        return database.ref(`campaigns/${state.selected?.selectedCampaign?.id}/location/${state.selected?.selectedLocation?.id}`)
    }
};
export const getSelectedCampaignDatabaseRef = (state: RootReducerProp) => {
    if (state.selected.selectedCampaign) {
        return database.ref(`campaigns/${state.selected?.selectedCampaign?.id}`)
    }
};

export const getSelectedMonsterDatabaseRef = (state: RootReducerProp) => {
    if (state.selected.selectedCampaign && state.selected.selectedMonster) {
        return database.ref(`campaigns/${state.selected?.selectedCampaign?.id}/monsters/${state.selected?.selectedMonster?.id}`)
    }
};
export const getSelectedCampaignMonsterMentionList = (state: RootReducerProp) => {
    const host = getHost()
    let mentions: MentionData[] = []
    if (state.selected.selectedCampaign) {
        if (state.selected.selectedCampaign?.campaign.monsters) {

            mentions = Object.values(state.selected.selectedCampaign?.campaign.monsters).map((monster: IMonster) => ({
                name: monster.name,
                link: `${host}/${state.selected.selectedCampaign?.campaign.slug}/monsters/${monster.slug}`
            }))

        }
    }
    return mentions
}
export const getSelectedCampaignPlayerMentionList = (state: RootReducerProp) => {
    const host = getHost()
    let mentions: MentionData[] = []
    if (state.selected.selectedCampaign) {
        if (state.selected.selectedCampaign?.campaign.players) {

            mentions = Object.values(state.selected.selectedCampaign?.campaign.players).map((player: IPlayer) => ({
                name: player.name,
                link: `${host}/${state.selected.selectedCampaign?.campaign.slug}/players/${player.slug}`
            }))

        }
    }
    return mentions
}
export const getSelectedCampaignLocationMentionList = (state: RootReducerProp) => {
    const host = getHost()
    let mentions: MentionData[] = []
    if (state.selected.selectedCampaign) {
        if (state.selected.selectedCampaign?.campaign.locations) {

            mentions = Object.values(state.selected.selectedCampaign?.campaign.locations).map((location: ILocation) => ({
                name: location.name,
                link: `${host}/${state.selected.selectedCampaign?.campaign.slug}/locations/${location.slug}`
            }))

        }
    }
    return mentions
}