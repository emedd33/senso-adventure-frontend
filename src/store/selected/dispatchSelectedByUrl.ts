import {
  setSelectedCampaign,
  setSelectedMonster,
  setSelectedLocation,
  setSelectedPlayer,
  setSelectedSession,
} from "./selectedCreators";

export const dispatchSelectedCampaignByUrl = (
  pathArray: string[],
  dispatch: any,
  campaigns?: any[]
) => {
  if (pathArray.length >= 4 && campaigns) {
    let filteredCampaign = Object.entries(campaigns)
      .filter(([, campaign]: [string, ICampaign]) => {
        return campaign.slug === pathArray[4];
      })
      .map(([id, campaign]: [string, ICampaign]) => {
        return { id: id, campaign: campaign };
      });
    if (filteredCampaign.length >= 1) {
      let campaign = {
        id: filteredCampaign[0].id,
        campaign: filteredCampaign[0].campaign,
      };
      dispatch(setSelectedCampaign(campaign));
    }
  } else {
    dispatch(setSelectedCampaign());

  }
};

export const dispatchSelectedPlayerByUrl = (
  pathArray: string[],
  dispatch: any,
  players: any[]
) => {
  if (pathArray.length > 6 && players) {
    if (pathArray[5] === "players") {
      let filteredPlayers = Object.entries(players)
        .filter(([, player]: [string, IPlayer]) => player.slug === pathArray[6])
        .map(([id, player]: [string, IPlayer]) => {
          return { id: id, player: player };
        });
      if (filteredPlayers.length >= 1) {
        let player: ISelectedPlayer = {
          id: filteredPlayers[0].id,
          player: filteredPlayers[0].player,
        };
        dispatch(setSelectedPlayer(player));
      }
    }
  }
};
export const dispatchSelectedMonsterByUrl = (
  pathArray: string[],
  dispatch: any,
  monsters: any[]
) => {
  if (pathArray.length > 6 && monsters) {
    if (pathArray[5] === "monsters") {
      let filteredMonsters = Object.entries(monsters)
        .filter(
          ([, monster]: [string, IMonster]) => monster.slug === pathArray[6]
        )
        .map(([id, monster]: [string, IMonster]) => {
          return { id: id, monster: monster };
        });
      if (filteredMonsters.length >= 1) {
        let monster: ISelectedMonster = {
          id: filteredMonsters[0].id,
          monster: filteredMonsters[0].monster,
        };
        dispatch(setSelectedMonster(monster));
      }
    }
  }
};

export const dispatchSelectedLocationByUrl = (
  pathArray: string[],
  dispatch: any,
  locations: any[]
) => {
  if (pathArray[5] === "locations" && locations) {
    let filteredLocation = Object.entries(locations)
      .filter(
        ([, location]: [string, ILocation]) => location.slug === pathArray[6]
      )
      .map(([id, location]: [string, ILocation]) => {
        return { id: id, location: location };
      });
    if (filteredLocation.length >= 1) {
      let location = {
        id: filteredLocation[0].id,
        location: filteredLocation[0].location,
      };
      dispatch(setSelectedLocation(location));
    }
  }
};
export const dispatchSelectedSessionByUrl = (
  pathArray: string[],
  dispatch: any,
  sessions: any[]
) => {
  if (pathArray[5] === "sessions" && sessions) {
    let filteredSession = Object.entries(sessions)
      .filter(
        ([, session]: [string, ISession]) => session.slug === pathArray[6]
      )
      .map(([id, session]: [string, ISession]) => {
        return { id: id, session: session };
      });
    if (filteredSession.length >= 1) {
      let session = {
        id: filteredSession[0].id,
        session: filteredSession[0].session,
      };
      dispatch(setSelectedSession(session));
    }
  }
};
