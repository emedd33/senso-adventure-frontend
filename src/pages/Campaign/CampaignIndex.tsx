import React, { FunctionComponent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import Campaign from "./Campaign";
import CampaignSessionEdit from "./CampaignSessionEdit";
import CampaignSessionNew from "./CampaignSessionNew";
import CampaignSession from "./CampaignSession";
import { getSelectedCampaign, isDungeonMasterSelector } from "../../store/selected/selectedSelectors";
import MiscBox from "../../components/MiscBox/MiscBox";
import { storage } from "../../firebase";
import { setSelectedCampaign, setSelectedSession } from "../../store/selected/selectedCreators";
import isValidSessionSlug from "../../utils/isValidSessionslug"
import { setIsLoading } from "../../store/admin/adminCreator";
import IsLoading from "../../components/IsLoading/IsLoading";
import { getIsLoading } from "../../store/admin/adminSelectors";

type CampaignIndexProps = {};
const CampaignIndex: FunctionComponent<CampaignIndexProps> = () => {
  const location = useLocation();
  const dispatch = useDispatch()
  const isLoading = useSelector(getIsLoading)
  const campaigns = useSelector((state: RootReducerProp) => state.rootCampaigns.campaigns)
  const selectedCampaign = useSelector(getSelectedCampaign);
  const isDungeonMaster = useSelector(isDungeonMasterSelector);
  const [imageUrl, setImageUrl] = useState("");
  const [campaignTitleImage, setCampaignTitleImage] = useState<string>("");

  useEffect(() => {
    let pathArray = location.pathname.split("/")
    if (pathArray.length >= 2) {
      let filteredCampaign = Object.entries(campaigns)
        .filter(([, campaign]: [string, ICampaign]) => {
          return campaign.slug === pathArray[1]
        })
        .map(([id, campaign]: [string, ICampaign]) => { return { id: id, campaign: campaign } })
      if (filteredCampaign.length >= 1) {
        let campaign = { id: filteredCampaign[0].id, campaign: filteredCampaign[0].campaign }
        if (campaign.id !== selectedCampaign.id) {
          dispatch(setSelectedCampaign(campaign))
        }
        if (pathArray.length >= 3 && isValidSessionSlug(pathArray[2])) {
          let filteredSession = Object.entries(campaign.campaign.sessions)
            .filter(([, session]: [string, ISession]) => session.slug === pathArray[2])
            .map(([id, session]: [string, ISession]) => { return { id: id, session: session } })
          if (filteredSession.length >= 1) {
            let session = { id: filteredSession[0].id, session: filteredSession[0].session }
            dispatch(setSelectedSession(session))
          }
        } else {
        }
      } else {
      }
    }
  }, [location, campaigns, dispatch, selectedCampaign])
  useEffect(() => {
    let campaignRef = storage
      .ref("Campaigns")
      .child(selectedCampaign.campaign.title);

    // Fetching BackgroundImage
    campaignRef
      .child("BackgroundImage")
      .getDownloadURL()
      .then((url: string) => {
        console.log(url);
        setImageUrl(url);
      })
      .catch((e) => console.log("could not fetch background image"))
    // Fetching Title Image
    dispatch(setIsLoading(true))
    campaignRef
      .child("TitleImage")
      .getDownloadURL()
      .then((url) => {
        setCampaignTitleImage(url);
      })
      .catch((e) => console.log("Could not fetch Campaign image"))
      .finally(() => dispatch(setIsLoading(false)));
  },
    [selectedCampaign, dispatch])
  if (isLoading) {
    return <IsLoading />
  }
  if (!isLoading && !selectedCampaign.id) {
    return <Redirect to="/" />
  }
  return (
    <Container style={{ backgroundImage: "url(" + imageUrl + ")" }}>
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
      <>
        <Switch>
          <Route exact path="/:campaignSlug/new">
            {isDungeonMaster ? <CampaignSessionNew /> : <Redirect to={"/"} />}
          </Route>
          <Route exact path="/:campaignSlug/:sessionSlug">
            <CampaignSession />
          </Route>
        </Switch>
        <Route exact path="/:campaignSlug/:sessionSlug/edit">
          {isDungeonMaster ? <CampaignSessionEdit /> : <Redirect to={"/"} />}
        </Route>
        <Route exact path="/:campaignSlug">
          <Campaign />
        </Route>
        {selectedCampaign && isDungeonMaster ? <MiscBox /> : null}
      </>
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

export default CampaignIndex;
