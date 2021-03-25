import { setSelectedCampaign, setSelectedMonster, setSelectedLocation, setSelectedPlayer, setSelectedSession } from "./selectedCreators";

const dispatchSelectedByUrl = (pathArray: string[], dispatch: any, campaigns: any[],) => {
    if (pathArray.length >= 4) {
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
            // if (pathArray.length >= 6) {
            //     if (pathArray[2] === "monsters") {
            //         if (isValidSlug(pathArray[5]) && campaign.campaign.monsters) {
            //             let filteredMonster = Object.entries(
            //                 campaign.campaign.monsters
            //             )
            //                 .filter(
            //                     ([, monster]: [string, IMonster]) =>
            //                         monster.slug === pathArray[3]
            //                 )
            //                 .map(([id, monster]: [string, IMonster]) => {
            //                     return { id: id, monster: monster };
            //                 });
            //             if (filteredMonster.length >= 1) {
            //                 let monster: ISelectedMonster = {
            //                     id: filteredMonster[0].id,
            //                     monster: filteredMonster[0].monster,
            //                 };
            //                 dispatch(setSelectedMonster(monster));
            //             }
            //         }
            //     }

            //     if (pathArray[4] === "players") {
            //         if (isValidSlug(pathArray[3]) && campaign.campaign.players) {
            //             let filteredPlayers = Object.entries(
            //                 campaign.campaign.players
            //             )
            //                 .filter(
            //                     ([, player]: [string, IPlayer]) =>
            //                         player.slug === pathArray[3]
            //                 )
            //                 .map(([id, player]: [string, IPlayer]) => {
            //                     return { id: id, player: player };
            //                 });
            //             if (filteredPlayers.length >= 1) {
            //                 let player: ISelectedPlayer = {
            //                     id: filteredPlayers[0].id,
            //                     player: filteredPlayers[0].player,
            //                 };
            //                 dispatch(setSelectedPlayer(player));
            //             }
            //         }
            //     }
            //     if (pathArray[4] === "sessions") {
            //         if (
            //             isValidSlug(pathArray[5]) &&
            //             campaign.campaign.sessions
            //         ) {
            //             let filteredSession = Object.entries(campaign.campaign.sessions)
            //                 .filter(
            //                     ([, session]: [string, ISession]) =>
            //                         session.slug === pathArray[3]
            //                 )
            //                 .map(([id, session]: [string, ISession]) => {
            //                     return { id: id, session: session };
            //                 });
            //             if (filteredSession.length >= 1) {
            //                 let session = {
            //                     id: filteredSession[0].id,
            //                     session: filteredSession[0].session,
            //                 };
            //                 dispatch(setSelectedSession(session));
            //             }
            //         }
            //     }
            //     if (pathArray[4] === "locations") {
            //         if (
            //             isValidSlug(pathArray[5]) &&
            //             campaign.campaign.locations
            //         ) {
            //             let filteredLocation = Object.entries(campaign.campaign.locations)
            //                 .filter(
            //                     ([, location]: [string, ILocation]) =>
            //                         location.slug === pathArray[3]
            //                 )
            //                 .map(([id, location]: [string, ILocation]) => {
            //                     return { id: id, location: location };
            //                 });
            //             if (filteredLocation.length >= 1) {
            //                 let location = {
            //                     id: filteredLocation[0].id,
            //                     location: filteredLocation[0].location,
            //                 };
            //                 dispatch(setSelectedLocation(location));
            //             }
            //         }
            //     }
            // }
        }
    }
}
const dispatchSelectedCampaign = (pathArray: string[], dispatch: any, campaigns: any[],) => {

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
