import { MentionData } from "@draft-js-plugins/mention";

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
  let authUser = state.admin.authUser;
  if (authUser) {
    return (
      state.selected.selectedCampaign?.campaign.dungeonMaster.uid ===
      authUser.uid
    );
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
          ([id, monster]: [string, IMonster]) => monster.isPublished === "TRUE"
        );
      }
    }
  }
};

export const getSelectedCampaignPlayers = (state: RootReducerProp) => {
  if (isDungeonMasterSelector(state)) {
    if (state.selected.selectedCampaign) {
      if (state.selected.selectedCampaign.campaign.players) {
        return Object.entries(state.selected.selectedCampaign.campaign.players);
      }
    }
  } else {
    if (state.selected.selectedCampaign) {
      if (state.selected.selectedCampaign.campaign.players) {
        return Object.entries(
          state.selected.selectedCampaign.campaign.players
        ).filter(
          ([id, player]: [string, IPlayer]) => player.isPublished === "TRUE"
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
          ([id, session]: [string, ISession]) => session.isPublished === "TRUE"
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

// CAMPAIGN PATHS
export const getSelectedCampaignStoragePath = (state: RootReducerProp) => {
  if (state.selected.selectedCampaign) {
    return `users/${state.selected.selectedCampaign.campaign.dungeonMaster.username}/campaigns/${state.selected.selectedCampaign?.campaign?.slug}`;
  }
};

export const getSelectedCampaignDatabasePath = (state: RootReducerProp) => {
  if (state.selected.selectedCampaign) {
    return `users/${state.selected.selectedCampaign.campaign.dungeonMaster.username}/campaigns/${state.selected?.selectedCampaign?.id}`;
  }
};

// LOCATION PATH

export const getSelectedLocationStoragePath = (state: RootReducerProp) => {
  if (state.selected.selectedCampaign && state.selected.selectedLocation) {
    return `users/${state.selected.selectedCampaign.campaign.dungeonMaster.username}/campaigns/${state.selected.selectedCampaign?.campaign?.slug}/locations/${state.selected.selectedLocation?.location.slug}`;
  }
};

export const getSelectedLocationDatabasePath = (state: RootReducerProp) => {
  if (state.selected.selectedCampaign && state.selected.selectedLocation) {
    return `users/${state.selected.selectedCampaign.campaign.dungeonMaster.username}/campaigns/${state.selected.selectedCampaign?.id}/locations/${state.selected.selectedLocation?.id}`;
  }
};
// MONSTER PATHS

export const getSelectedMonsterStoragePath = (state: RootReducerProp) => {
  if (state.selected.selectedCampaign && state.selected.selectedMonster) {
    return `users/${state.selected.selectedCampaign.campaign.dungeonMaster.username}/campaigns/${state.selected.selectedCampaign?.campaign?.slug}/monsters/${state.selected.selectedMonster?.monster.slug}`;
  }
};

export const getSelectedMonsterDatabasePath = (state: RootReducerProp) => {
  if (state.selected.selectedCampaign && state.selected.selectedMonster) {
    return `users/${state.selected.selectedCampaign.campaign.dungeonMaster.username}/campaigns/${state.selected.selectedCampaign?.id}/monsters/${state.selected.selectedMonster?.id}`;
  }
};

// PLAYER PATHS

export const getSelectedPlayerStoragePath = (state: RootReducerProp) => {
  if (state.selected.selectedCampaign && state.selected.selectedPlayer) {
    return `users/${state.selected.selectedCampaign.campaign.dungeonMaster.username}/campaigns/${state.selected.selectedCampaign?.campaign?.slug}/players/${state.selected.selectedPlayer?.player.slug}`;
  }
};

export const getSelectedPlayerDatabasePath = (state: RootReducerProp) => {
  if (state.selected.selectedCampaign) {
    return `users/${state.selected.selectedCampaign.campaign.dungeonMaster.username}/campaigns/${state.selected.selectedCampaign?.id}/players/${state.selected.selectedPlayer?.id}`;
  }
};

// SESSION PATHS

export const getSelectedSessionDatabasePath = (state: RootReducerProp) => {
  if (state.selected.selectedCampaign && state.selected.selectedSession) {
    return `users/${state.selected.selectedCampaign.campaign.dungeonMaster.username}/campaigns/${state.selected.selectedCampaign?.id}/sessions/${state.selected.selectedSession?.id}`;
  }
};
export const getSelectedSessionStoragePath = (state: RootReducerProp) => {
  if (state.selected.selectedCampaign && state.selected.selectedSession) {
    return `users/${state.selected.selectedCampaign.campaign.dungeonMaster.username}/campaigns/${state.selected.selectedCampaign?.campaign?.slug}/sessions/${state.selected.selectedSession?.session.slug}`;
  }
};

// MENTION LISTS

export const getSelectedCampaignMonsterMentionList = (
  state: RootReducerProp
) => {
  let mentions: MentionData[] = [];
  if (state.selected.selectedCampaign) {
    if (state.selected.selectedCampaign?.campaign.monsters) {
      mentions = Object.values(
        state.selected.selectedCampaign?.campaign.monsters
      ).map((monster: IMonster) => ({
        name: monster.name,
        link: `/user/${state.selected.selectedCampaign?.campaign.dungeonMaster.username}/campaigns/${state.selected.selectedCampaign?.campaign.slug}/monsters/${monster.slug}`,
      }));
    }
  }
  return mentions;
};
export const getSelectedCampaignPlayerMentionList = (
  state: RootReducerProp
) => {
  let mentions: MentionData[] = [];
  if (state.selected.selectedCampaign) {
    if (state.selected.selectedCampaign?.campaign.players) {
      mentions = Object.values(
        state.selected.selectedCampaign?.campaign.players
      ).map((player: IPlayer) => ({
        name: player.name,
        link: `/user/${state.selected.selectedCampaign?.campaign.dungeonMaster.username}/campaigns/${state.selected.selectedCampaign?.campaign.slug}/players/${player.slug}`,
      }));
    }
  }
  return mentions;
};
export const getSelectedCampaignLocationMentionList = (
  state: RootReducerProp
) => {
  let mentions: MentionData[] = [];
  if (state.selected.selectedCampaign) {
    if (state.selected.selectedCampaign?.campaign.locations) {
      mentions = Object.values(
        state.selected.selectedCampaign?.campaign.locations
      ).map((location: ILocation) => ({
        name: location.name,
        link: `/user/${state.selected.selectedCampaign?.campaign.dungeonMaster.username}/campaigns//${state.selected.selectedCampaign?.campaign.slug}/locations/${location.slug}`,
      }));
    }
  }
  return mentions;
};
