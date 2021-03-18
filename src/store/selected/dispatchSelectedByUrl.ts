import { setSelectedCampaign, setSelectedCharacter, setSelectedLocation, setSelectedPlayer, setSelectedSession } from "./selectedCreators";

const dispatchSelectedByUrl = (pathArray: string[], dispatch: any, campaigns: any[],) => {
    if (pathArray.length >= 2) {
        let filteredCampaign = Object.entries(campaigns)
            .filter(([, campaign]: [string, ICampaign]) => {
                return campaign.slug === pathArray[1];
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
            if (pathArray.length >= 4) {
                if (pathArray[2] === "characters") {
                    if (isValidSlug(pathArray[3]) && campaign.campaign.characters) {
                        let filteredCharacter = Object.entries(
                            campaign.campaign.characters
                        )
                            .filter(
                                ([, character]: [string, ICharacter]) =>
                                    character.slug === pathArray[3]
                            )
                            .map(([id, character]: [string, ICharacter]) => {
                                return { id: id, character: character };
                            });
                        if (filteredCharacter.length >= 1) {
                            let character: ISelectedCharacter = {
                                id: filteredCharacter[0].id,
                                character: filteredCharacter[0].character,
                            };
                            dispatch(setSelectedCharacter(character));
                        }
                    }
                }

                if (pathArray[2] === "players") {
                    if (isValidSlug(pathArray[3]) && campaign.campaign.players) {
                        let filteredPlayers = Object.entries(
                            campaign.campaign.players
                        )
                            .filter(
                                ([, player]: [string, IPlayer]) =>
                                    player.slug === pathArray[3]
                            )
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
                if (pathArray[2] === "sessions") {
                    if (
                        isValidSlug(pathArray[3]) &&
                        campaign.campaign.sessions
                    ) {
                        let filteredSession = Object.entries(campaign.campaign.sessions)
                            .filter(
                                ([, session]: [string, ISession]) =>
                                    session.slug === pathArray[3]
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
                }
                if (pathArray[2] === "locations") {
                    if (
                        isValidSlug(pathArray[3]) &&
                        campaign.campaign.locations
                    ) {
                        let filteredLocation = Object.entries(campaign.campaign.locations)
                            .filter(
                                ([, location]: [string, ILocation]) =>
                                    location.slug === pathArray[3]
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
                }
            }
        }
    }
}
const isValidSlug = (slug: string) => {
    if (slug) {
        if (slug !== "new") {
            return true;
        }
    }
    return false;
};


export default dispatchSelectedByUrl
