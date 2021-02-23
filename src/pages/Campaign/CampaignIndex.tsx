import React, { FunctionComponent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import IsLoading from "../../components/IsLoading/IsLoading";
import { Redirect, Route, useHistory, useLocation } from "react-router-dom";
import Campaign from "./Campaign";
import CampaignSessionEdit from "./CampaignSessionEdit";
import CampaignSession from "./CampaignSession";
import { getCampaignByPathname, isDungeonMasterSelector } from "../../store/campaign/campaignSelectors";
import MiscBox from "../../components/MiscBox/MiscBox";
import { storage } from "../../firebase";
import { dispatchSelectedByLocation, setSelectedCampaign } from "../../store/selected/selectedCreators";

type CampaignIndexProps = {};
const CampaignIndex: FunctionComponent<CampaignIndexProps> = () => {
  const history = useHistory()
  const location = useLocation();
  const dispatch = useDispatch()
  const [imageUrl, setImageUrl] = useState("");
  const isLoading = useSelector(
    (state: RootReducerProp) => state.admin.isLoading
  );
  const selectedCampaign = useSelector((state: RootReducerProp) => getCampaignByPathname(state, history.location.pathname));
  const isDungeonMaster = useSelector(isDungeonMasterSelector);
  const [campaignTitleImage, setCampaignTitleImage] = useState<string>("");
  useEffect(() => {
    dispatch(dispatchSelectedByLocation(location.pathname))
  }, [location])

  useEffect(() => {
    if (selectedCampaign) {
      dispatch(setSelectedCampaign(selectedCampaign.id, selectedCampaign.campaign))
      storage
        .ref("Campaigns")
        .child(selectedCampaign.campaign.title)
        .child("BackgroundImage")
        .getDownloadURL()
        .then((url: string) => {
          console.log(url);
          setImageUrl(url);
        })
        .catch((e) => console.log("could not fetch background image"));
      storage
        .ref("Campaigns")
        .child(selectedCampaign.campaign.title)
        .child("TitleImage")
        .getDownloadURL()
        .then((url) => {
          setCampaignTitleImage(url);
        })
        .catch((e) => console.log("Could not fetch Campaign image"));
    }
  }, [history.location.pathname, dispatch])

  return (
    <Container style={{ backgroundImage: "url(" + imageUrl + ")" }}>
      <LeftGradientDiv style={{ left: 0 }} />
      <RightGradientDiv style={{ right: 0 }} />

      {campaignTitleImage ? (
        <img
          src={campaignTitleImage}
          alt="Campaign title"
          style={{
            minWidth: "20rem",
            width: "40%",
            maxHeight: "30rem",
            marginBottom: "1rem",
          }}
        />
      ) : null}
      {isLoading ? (
        <IsLoading />
      ) : (
          <>
            <Route exact path="/campaign/session">
              <CampaignSession />
            </Route>
            <Route exact path="/campaign/session/edit">
              {isDungeonMaster ? <CampaignSessionEdit /> : <Redirect to={"/"} />}
            </Route>
            <Route exact path="/:id">
              <Campaign />
            </Route>
          </>
        )}
      {selectedCampaign && isDungeonMaster ? <MiscBox /> : null}
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 10rem;
  width: 100%;
  height: 100%;
  padding-bottom: 10rem;
  min-height: 100vh;
`;
const LeftGradientDiv = styled.div`
  background: linear-gradient(to right, #000, transparent);
  width: 10vw;
  height: 100%;
  position: fixed;
  top: 0;
  backgroundcolor: black;
`;
const RightGradientDiv = styled.div`
  background: linear-gradient(to left, #000, transparent);
  width: 10vw;
  height: 100%;
  position: fixed;
  top: 0;
  backgroundcolor: black;
`;
export default CampaignIndex;
