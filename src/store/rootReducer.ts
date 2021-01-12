import { combineReducers } from "redux";
import adminReducer from "./admin/adminReducers";
import adventureReducer from "./campaign/campaignReducer";
import selectedReducer from "./selected/selectedReducer";

const rootReducer = combineReducers({ campaigns: adventureReducer, admin: adminReducer, selected: selectedReducer })
export default rootReducer
