export const getIsLoading = (state: RootReducerProp) => {
  return state.admin.isLoading;
};
export const getAuthUser = (state: RootReducerProp) => {
  return state.admin.authUser;
};

export const getAuthUserPath = (state: RootReducerProp) => {
  if (state.admin.authUser) {
    return `/user/${state.admin.authUser.displayName}`;
  }
};

export const getIsSidebarShown = (state: RootReducerProp) => {
  return state.admin.isSidebarShown;
};

export const getIsUploading = (state: RootReducerProp) => {
  return state.admin.isUploading;
};
