import React, { FunctionComponent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import sortSessionsByDateValue from "../../utils/sortArrayDyDate";
import { Link, useHistory } from "react-router-dom";

import Scroll from "../../components/Scroll/Scroll";
import {
    getAllSessions,
    getAllCampaigns,
} from "../../store/campaign/campaignSelectors";
import {
    MAX_NUM_SCROLLS_HOMEPAGE,
    OLD_WHITE_TRANSPARENT,
} from "../../assets/constants/Constants";
import styled from "styled-components";
import { storage } from "../../firebase";
import { Button, CircularProgress } from "@material-ui/core";
import BackgroundImage from "../../assets/Images/background_home.jpg";
import { getSelectedCampaign } from "../../store/selected/selectedSelectors";
type CampaignHomeProps = {};
const CampaignHome: FunctionComponent<CampaignHomeProps> = () => {
    const history = useHistory();
    const campaigns = useSelector(getAllCampaigns);
    const [campaignUrls, setCampaignUrls] = useState<any[]>([])
    const sessions = useSelector(getAllSessions);
    const selectedCampaign = useSelector(getSelectedCampaign)


    useEffect(() => {
        if (campaigns) {
            Object.values(campaigns).map((campaign: ICampaign) =>
                storage
                    .ref(`Campaigns/${campaign.slug}/TitleImage`)
                    .getDownloadURL()
                    .then((url) =>
                        setCampaignUrls(
                            (existingUrls: { campaignSlug: string; url?: string }[]) => [
                                ...existingUrls,
                                { campaignSlug: campaign.slug, url: url },
                            ]
                        )
                    )
                    .catch(() =>
                        setCampaignUrls(
                            (existingUrls: { campaignSlug: string; url?: string }[]) => [
                                ...existingUrls,
                                { campaignSlug: campaign.slug },
                            ]
                        )
                    )
            );
        }
        return () => {
            setCampaignUrls([]);
        };
    }, [campaigns]);

    const renderScrolls = () => {
        if (sessions && selectedCampaign) {
            let sortedSessions = sortSessionsByDateValue(sessions);

            return sortedSessions
                .slice(0, MAX_NUM_SCROLLS_HOMEPAGE)
                .map((session: any, index: number) => {
                    return (
                        <div key={index}>

                            <Scroll
                                title={session.session.title}
                                isOpaque={session.session.isPublished === "FALSE"}
                                subTitle={session.session.subTitle}
                                date={session.session.date}
                                campaignSlug={session.session.campaignTitle.replace(/\s/g, "")}
                                sessionDay={session.session.sessionDay}
                                onClick={() => {
                                    history.push(
                                        `${session.session.campaignTitle.replace(
                                            /\s/g,
                                            ""
                                        )}/sessions/${session.session.slug}`
                                    );
                                }}
                            />
                        </div>
                    );
                });
        }
    };
    return (
        <Container>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: OLD_WHITE_TRANSPARENT,
                    margin: "5rem",
                    minHeight: "15rem",
                }}
            >
                {campaignUrls
                    ? Object.values(campaignUrls).map(
                        (campaign: { campaignSlug: string; url?: string }, index: number) => (
                            <Link to={`/${campaign.campaignSlug}`} key={index}>
                                <Button style={{ marginLeft: "2rem", marginRight: "2rem", width: "17rem" }}>
                                    {campaign.url ? (
                                        <CampaignImg src={campaign.url} />
                                    ) : (
                                        <h1>{campaign.campaignSlug}</h1>
                                    )}
                                </Button>
                            </Link>
                        )
                    )
                    : <CircularProgress />}
            </div>
            <div
                style={{
                    minWidth: "20rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                }}
            >
                {sessions ? renderScrolls() : null}
            </div>
        </Container>
    );
};
const Container = styled.div`
  z-index: 300;
  display: flex;
  background-image: url(${BackgroundImage});
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  padding-top: 10rem;
  min-height: 100vh;
`;

const CampaignImg = styled.img`
  max-height: 10rem;
  max-width:15rem;
 
`;

export default CampaignHome;
