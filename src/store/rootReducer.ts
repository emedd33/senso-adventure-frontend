import { combineReducers } from "redux";
import adminReducer from "./admin/adminReducers";
import adventureReducer from "./campaign/campaignReducer";

const rootReducer = combineReducers({ campaign: adventureReducer, admin: adminReducer })
export default rootReducer
