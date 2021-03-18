type SelectedState = {
  selectedCampaign?: { id: string; campaign: ICampaign };
  selectedSession?: ISelectedSession;
  selectedMonster?: ISelectedMonster;
  selectedPlayer?: ISelectedPlayer;
  selectedLocation?: ISelectedLocation,
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
type ISelectedMonster = {
  monster: IMonster;
  id: string;
};

type ISelectedPlayer = {
  player: IPlayer;
  id: string;
}
type ISelectedLocation = {
  location: ILocation;
  id: string;
}
