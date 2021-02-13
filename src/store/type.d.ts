
type RootReducerProp = {
  rootCampaigns: {
    campaigns: ICampaign[];
    sessions: ISession[];
  };
  admin: AdminState;
  selected: SelectedState;
};
