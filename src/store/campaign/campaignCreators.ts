import { Dispatch } from "redux";
import { campaignsRef, firebaseAuth } from "../../firebase";
import { SET_AUTH_USER, SET_IS_LOADING } from "../admin/adminActions";
import { setIsLoading } from "../admin/adminCreator";
import { refreshSelectedCampaign } from "../selected/selectedCreators";
import { SET_CAMPAIGNS, SET_SESSIONS } from "./campaignActions";

// Thunk function
export async function fetchFromFirebase(dispatch: any) {
  dispatch({ type: SET_IS_LOADING, payload: true });

  // Database
  campaignsRef.on("value", (snapshot) => {
    let campaigns = snapshot.val();
    if (campaigns) {
      dispatch({ type: SET_CAMPAIGNS, payload: campaigns });
      // Porcessing campaigns to extract all sessions
      const sessions = getSessionsFromCampaign(campaigns);
      dispatch(refreshSelectedCampaign(campaigns))
      dispatch({ type: SET_SESSIONS, payload: sessions });
    }
  });

  // Auth
  firebaseAuth.onAuthStateChanged(function (user) {
    if (user) {
      dispatch({
        type: SET_AUTH_USER,
        payload: {
          username: user.displayName,
          email: user.email,
        },
      });
    }
  });
}
export async function getSessionsFromCampaign(campaigns: ICampaign) {
  const sessions = Object.entries(campaigns)
    .map(([campaignId, campaign]) => {
      if (campaign.sessions) {
        return Object.entries(campaign.sessions).map(([sessionId, session]) => {
          return {
            campaignId: campaignId,
            sessionId: sessionId,
            session: session,
          };
        });
      }
      return null;
    })
    .flat()
    .filter((e) => e !== null);
  if (sessions) {
    return sessions;
  }
  return null;
}

export const dispatchLevelUpCharacters = (selectedCampaign: any) => {
  return async (dispatch: Dispatch) => {
    dispatch(setIsLoading(true));
    Object.entries(selectedCampaign.campaign.players).forEach((elem: any) => {
      let id = elem[0];
      let player = elem[1];
      if (player.isDead === "FALSE") {
        let new_level = parseInt(player.level);
        new_level += 1;
        player.level = new_level;
        campaignsRef
          .child(selectedCampaign.id + "/players/")
          .child(id)
          .set(player);
      }
    });
    dispatch(setIsLoading(false));
  };
};
