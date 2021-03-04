import { Dispatch } from "redux";
import { campaignsRef, firebaseAuth } from "../../firebase";
import { SET_AUTH_USER, SET_IS_LOADING } from "../admin/adminActions";
import { setIsLoading } from "../admin/adminCreator";
import { SET_CAMPAIGNS } from "./campaignActions";

// Thunk function
export async function fetchFromFirebase(dispatch: any) {

  // Database
  campaignsRef.on("value", (snapshot) => {
    let campaigns = snapshot.val();
    if (campaigns) {
      dispatch({ type: SET_CAMPAIGNS, payload: campaigns });
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

export const dispatchLevelUpCharacters = (selectedCampaign: any) => {
  return async (dispatch: Dispatch) => {
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
  };
};
