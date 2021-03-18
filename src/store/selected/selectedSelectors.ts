import { MentionData } from "@draft-js-plugins/mention";
import { campaignsRef, storage } from "../../firebase";
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
            if (state.selected.selectedCampaign.campaign.characters) {
                return Object.entries(
                    state.selected.selectedCampaign.campaign.characters
                );
            }
        }
    } else {
        if (state.selected.selectedCampaign) {
            if (state.selected.selectedCampaign.campaign.characters) {
                return Object.entries(
                    state.selected.selectedCampaign.campaign.characters
                ).filter(
                    ([id, character]: [string, IMonster]) =>
                        character.isPublished === "TRUE"
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

export const getSelectedSessionStorageRef = (state: RootReducerProp) => {
    if (state.selected.selectedCampaign && state.selected.selectedSession) {
        return storage
            .ref()
            .child("Campaigns")
            .child(state.selected.selectedCampaign?.campaign?.slug)
            .child("Sessions")
            .child(state.selected.selectedSession?.session?.title); // TODO: Change to slug
    }
};

export const getSelectedLocationStorageRef = (state: RootReducerProp) => {
    if (state.selected.selectedCampaign && state.selected.selectedLocation) {
        return storage
            .ref()
            .child("Campaigns")
            .child(state.selected.selectedCampaign?.campaign?.slug)
            .child("Locations")
            .child(state.selected.selectedLocation?.location?.slug)

    }
};


export const getSelectedCampaignMonsterMentionList = (state: RootReducerProp) => {
    const host = getHost()
    let mentions: MentionData[] = []
    if (state.selected.selectedCampaign) {
        if (state.selected.selectedCampaign?.campaign.characters) {

            mentions = Object.values(state.selected.selectedCampaign?.campaign.characters).map((character: IMonster) => ({
                name: character.name,
                link: `${host}/${state.selected.selectedCampaign?.campaign.slug}/monsters/${character.slug}`
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
export const getSelectedMonsterStorageRef = (state: RootReducerProp) => {
    if (state.selected.selectedCampaign && state.selected.selectedMonster) {
        return storage
            .ref()
            .child("Campaigns")
            .child(state.selected.selectedCampaign?.campaign?.slug)
            .child("characters")
            .child(state.selected.selectedMonster?.monster.name);
    }
};

export const getSelectedPlayerStorageRef = (state: RootReducerProp) => {
    if (state.selected.selectedCampaign && state.selected.selectedPlayer) {
        return storage
            .ref()
            .child("Campaigns")
            .child(state.selected.selectedCampaign?.campaign?.slug)
            .child("players")
            .child(state.selected.selectedPlayer?.player.name);
    }
};
export const getSelectedSessionDatabaseRef = (state: RootReducerProp) => {
    if (state.selected.selectedCampaign && state.selected.selectedSession) {
        return campaignsRef
            .child(state.selected?.selectedCampaign?.id)
            .child("sessions")
            .child(state.selected?.selectedSession?.id);
    }
};

export const getSelectedLocationDatabaseRef = (state: RootReducerProp) => {
    if (state.selected.selectedCampaign && state.selected.selectedLocation) {
        return campaignsRef
            .child(state.selected?.selectedCampaign?.id)
            .child("locations")
            .child(state.selected?.selectedLocation?.id);
    }
};
export const getSelectedCampaignDatabaseRef = (state: RootReducerProp) => {
    if (state.selected.selectedCampaign) {
        return campaignsRef.child(state.selected?.selectedCampaign?.id);
    }
};

export const getSelectedMonsterDatabaseRef = (state: RootReducerProp) => {
    if (state.selected.selectedCampaign && state.selected.selectedMonster) {
        return campaignsRef
            .child(state.selected?.selectedCampaign?.id)
            .child("characters")
            .child(state.selected.selectedMonster.id);
    }
};

export const getPlayerCharacters = (state: RootReducerProp) => {
    let players;
    if (
        state.selected.selectedCampaign &&
        state.selected.selectedCampaign.campaign.players
    ) {
        players = Object.entries(
            state.selected.selectedCampaign.campaign.players
        )
            .map((player) => {
                return { id: player[0], character: player[1] };
            });
    }
    return players ? players : [];
};
export const getUniqueNpc = (state: RootReducerProp) => {
    let npcs;
    if (
        state.selected.selectedCampaign &&
        state.selected.selectedCampaign.campaign.characters
    ) {
        npcs = Object.entries(state.selected.selectedCampaign.campaign.characters)
            .filter(([, character]) => character.isUnique === "TRUE")
            .map(([id, character]) => {
                return { id: id, character: character };
            });
    }
    return npcs ? npcs : [];
};
