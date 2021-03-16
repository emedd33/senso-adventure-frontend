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
export const getSelectedCharacter = (state: RootReducerProp) => {
    return state.selected.selectedCharacter;
};
export const getSelectedLocation = (state: RootReducerProp) => {
    return state.selected.selectedLocation;
};
export const getSelectedCharacterIsPlayer = (state: RootReducerProp) => {
    return state.selected.selectedCharacter?.character.isPlayer === "TRUE";
};

export const isDungeonMasterSelector = (state: RootReducerProp) => {
    let username = state.admin.authUser?.username;
    if (username) {
        return state.selected.selectedCampaign?.campaign.dungeonMaster === username;
    }
    return false;
};

export const getSelectedCampaignCharacters = (state: RootReducerProp) => {
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
                    ([id, character]: [string, ICharacter]) =>
                        character.isPublished === "TRUE"
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


export const getSelectedCampaignCharacterMentionList = (state: RootReducerProp) => {
    const host = getHost()
    let mentions: MentionData[] = []
    if (state.selected.selectedCampaign) {
        if (state.selected.selectedCampaign?.campaign.characters) {

            mentions = Object.values(state.selected.selectedCampaign?.campaign.characters).map((character: ICharacter) => ({
                name: character.name,
                link: `${host}/${state.selected.selectedCampaign?.campaign.slug}/characters/${character.slug}`
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
export const getSelectedCharacterStorageRef = (state: RootReducerProp) => {
    if (state.selected.selectedCampaign && state.selected.selectedCharacter) {
        return storage
            .ref()
            .child("Campaigns")
            .child(state.selected.selectedCampaign?.campaign?.slug)
            .child("characters")
            .child(state.selected.selectedCharacter?.character.name);
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

export const getSelectedCharacterDatabaseRef = (state: RootReducerProp) => {
    if (state.selected.selectedCampaign && state.selected.selectedCharacter) {
        return campaignsRef
            .child(state.selected?.selectedCampaign?.id)
            .child("characters")
            .child(state.selected.selectedCharacter.id);
    }
};

export const getPlayerCharacters = (state: RootReducerProp) => {
    let players;
    if (
        state.selected.selectedCampaign &&
        state.selected.selectedCampaign.campaign.characters
    ) {
        players = Object.entries(
            state.selected.selectedCampaign.campaign.characters
        )
            .filter(([, character]) => character.isPlayer === "TRUE")
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
