import {
  SET_IS_LOADING,
  SET_ALERT_DIALOG,
  SET_AUTH_USER,
  SET_IS_SIDEBAR_SHOWN
} from "./adminActions";

const initialState: AdminState = {
  isLoading: false,
  error: {
    isError: false,
    message: "",
    isOpen: false,
  },
  env: "http://localhost",
  port: "3000",
  isSidebarShown: false,
};

const adminReducer = (
  state: AdminState = initialState,
  action: any
): AdminState => {
  switch (action.type) {
    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case SET_ALERT_DIALOG:
      return {
        ...state,
        error: action.payload,
      };
    case SET_AUTH_USER:
      return {
        ...state,
        authUser: action.payload,
      };
    case SET_IS_SIDEBAR_SHOWN:
      return {
        ...state,
        isSidebarShown: action.payload,
      }
  }
  return state;
};
export default adminReducer;
