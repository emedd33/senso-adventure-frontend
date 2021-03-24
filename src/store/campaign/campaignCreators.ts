import { onDatabaseChange } from "../../services/Firebase/database";
import { database, authentication } from "../../services/Firebase/firebase";
import { SET_AUTH_USER } from "../admin/adminActions";
import { SET_CAMPAIGNS } from "./campaignActions";

// Thunk function
export async function fetchFromFirebase(dispatch: any, authUserDisplayName: any) {
  // Database

  onDatabaseChange(`users/${authUserDisplayName}/campaigns`).then(campaigns =>
    dispatch({ type: SET_CAMPAIGNS, payload: campaigns })
  );

  // Auth 
  authentication.onAuthStateChanged(function (user) {
    if (user) {
      dispatch({
        type: SET_AUTH_USER,
        payload: user,
      });
    }
  });
}
