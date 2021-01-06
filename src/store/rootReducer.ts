import { combineReducers } from "redux";
import adminReducer from "./admin/adminReducers";
import adventureReducer from "./campaign/campaignReducer";

const rootReducer = combineReducers({ campaigns: adventureReducer, admin: adminReducer })
export default rootReducer
