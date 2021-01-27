import { Dispatch } from "redux"
import { campaignsRef, CrestImageFileLocation, firebaseAuth, storage } from "../../firebase"
import { SET_AUTH_USER, SET_IS_LOADING } from "../admin/adminActions"
import { SET_CAMPAIGNS, SET_CAMPAIGN_CRESTS, SET_SESSIONS } from "./campaignActions"



// Thunk function
export async function fetchFromFirebase(dispatch: any) {
    dispatch({ type: SET_IS_LOADING, payload: true })

    // Database
    campaignsRef.on('value', (snapshot) => {
        let campaigns = snapshot.val();
        if (campaigns) {
            dispatch({ type: SET_CAMPAIGNS, payload: campaigns })

            // Porcessing campaigns to extract all sessions
            const sessions = getSessionsFromCampaign(campaigns)
            dispatch({ type: SET_SESSIONS, payload: sessions })
        }
    })
    // Storage
    dispatch(getCampaignCrestFromFirebase)

    // Auth
    firebaseAuth.onAuthStateChanged(function (user) {
        if (user) {
            dispatch({
                type: SET_AUTH_USER,
                payload: {
                    username: user.displayName,
                    email: user.email
                }
            })
        }
    });
    dispatch({ type: SET_IS_LOADING, payload: false })
}
export async function getSessionsFromCampaign(campaigns: ICampaign) {
    const sessions = (Object.entries(campaigns).map(([campaignId, campaign]) => {
        if (campaign.sessions) {
            return Object.entries(campaign.sessions).map(([sessionId, session]) => {
                return {
                    "campaignId": campaignId,
                    "sessionId": sessionId,
                    "session": session
                }
            })
        }
        return null
    })).flat().filter(e => e !== null)
    if (sessions) {
        return sessions
    }
    return null
}
let campaignCrestFiles: CrestObjectType[] = []
export const getCampaignCrestFromFirebase = async (dispatch: Dispatch) => {
    await storage.ref(CrestImageFileLocation).listAll()
        .then(crestFiles => crestFiles.items
            .map(crestFile => crestFile.getDownloadURL()
                .then(url => url).then(async (url) => crestFile.getMetadata()
                    .then(data => {
                        if (data.customMetadata !== undefined && data.customMetadata.campaignTitle !== undefined) {
                            campaignCrestFiles.push(
                                { title: data.customMetadata.campaignTitle, url: url }
                            )
                        }
                        return campaignCrestFiles
                    }
                    )
                )
                .then(crestFiles => dispatch(setCampaignCrestImageUrl(crestFiles))
                )
            )
        ).catch(e => console.log(e))
}

export const setCampaignCrestImageUrl = (crestFiles: CrestObjectType[]) => {
    return {
        type: SET_CAMPAIGN_CRESTS,
        payload: crestFiles
    }
}