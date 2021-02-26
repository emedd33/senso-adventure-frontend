type SelectedState = {
  selectedCampaign?: { id: string; campaign: ICampaign };
  selectedSession?: ISelectedSession;
  selectedCharacter?: ISelectedCharacter;
  backgroundImage?: string;
};

type ISelectedCampaign = {
  id: string;
  campaign: ICampaign;
};
type ISelectedSession = {
  id: string;
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
