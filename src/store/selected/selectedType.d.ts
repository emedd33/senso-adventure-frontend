type SelectedState = {
  selectedCampaign?: { id: string; campaign: ICampaign };
  selectedSession?: ISelectedSession;
  selectedCharacter?: ISelectedCharacter;
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
type ISelectedCharacter = {
  character: ICharacter;
  id: string;
};

type ISelectedLocation = {
  location: ILocation;
  id: string;
}