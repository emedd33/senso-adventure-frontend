type SelectedState = {
  selectedCampaign: { id: string; campaign: ICampaign };
  selectedSession: ISelectedSession;
  selectedPlayer: ISelectedPlayer;
  backgroundImage?: string;
};

type ISelectedSession = {
  id: string;
  index?: number;
  session: ISession;
};
type SelectedActions = {
  type: string;
  payload: any;
};
type SelectedPlayerAction = {
  type: string;
};
type ISelectedPlayer = {
  isNew: boolean;
  player: any;
  id?: string;
};
