import React, { FunctionComponent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import sortSessionsByDateValue from "../../utils/sortArrayDyDate";
import { Link, useHistory } from "react-router-dom";

import Scroll from "../../components/Scroll/Scroll";
import { getAllSessions, getAllCampaigns } from "../../store/campaign/campaignSelectors";
import { MAX_NUM_SCROLLS_HOMEPAGE, OLD_WHITE_TRANSPARENT } from "../../assets/constants/Constants";
import styled from "styled-components";
import { storage } from "../../firebase";
import { Button } from "@material-ui/core";

type HomeProps = {};
const Home: FunctionComponent<HomeProps> = () => {
  const history = useHistory();
  const campaigns = useSelector(getAllCampaigns)
  const sessions = useSelector(getAllSessions);
  const [campaignUrls, setCampaignUrls] = useState<{ campaignSlug: string, url?: string }[]>([])
  const [imageUrl, setImageUrl] = useState("")

  useEffect(() => {
    storage
      .ref("Images/Background/dnd_background.jpg")
      .getDownloadURL()
      .then((url: string) => setImageUrl(url))
  }, []);
  useEffect(() => {
    if (campaigns) {

      Object.values(campaigns).map((campaign: ICampaign) =>
        storage.ref()
          .child("Campaigns")
          .child(campaign.title)
          .child("TitleImage")
          .getDownloadURL()
          .then(url => setCampaignUrls((existingUrls: { campaignSlug: string, url?: string }[]) => [...existingUrls, { campaignSlug: campaign.slug, url: url }]))
          .catch(() => setCampaignUrls((existingUrls: { campaignSlug: string, url?: string }[]) => [...existingUrls, { campaignSlug: campaign.slug }])))
    }
    return () => { setCampaignUrls([]) }
  }, [campaigns])

  const renderScrolls = () => {
    if (sessions) {
      let sortedSessions = sortSessionsByDateValue(sessions);
      return sortedSessions
        .slice(0, MAX_NUM_SCROLLS_HOMEPAGE)
        .map((session: any, index: number) => {
          return (
            <Scroll
              key={session.session.sessionId}
              id={session.sessionId}
              title={session.session.title}
              subTitle={session.session.subTitle}
              date={session.session.date}
              campaignTitle={session.session.campaignTitle}
              sessionDay={session.session.sessionDay}
              onClick={() => {
                history.push(`${session.session.campaignTitle.replace(/\s/g, '')}/sessions/${session.session.slug}`);
              }}
            />
          );
        });
    }
  };
  return (

    <Container style={{ backgroundImage: "url(" + imageUrl + ")" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", justifyContent: "space-between", alignItems: "center", background: OLD_WHITE_TRANSPARENT, margin: "5rem", height: "10rem" }}>
        {campaignUrls ? Object.values(campaignUrls).map((campaign: { campaignSlug: string, url?: string }) => (
          <Link to={`/${campaign.campaignSlug}`}>
            <Button style={{ marginLeft: "2rem", marginRight: "2rem" }}>
              {campaign.url ?
                <CampaignImg src={campaign.url} />
                : <h1>{campaign.campaignSlug}</h1>
              }
            </Button>
          </Link>
        )) : null}
      </div>
      <div style={{ minWidth: "20rem", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
        {sessions ? renderScrolls() : null}
      </div>
    </Container>
  );
}
const Container = styled.div`
  z-index: 300;
  display: flex;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  padding-top:10rem;
  min-height: 100vh;
`;

const CampaignImg = styled.img`
max-height:20rem;
width:90%;
&:hover {
  width: 100%;
}
`

export default Home;
