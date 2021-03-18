import { campaignsRef, firebaseAuth } from "../../firebase";
import { SET_AUTH_USER } from "../admin/adminActions";
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
        payload: user,
      });
    }
  });
}
