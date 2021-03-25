import React, { FunctionComponent, useMemo, useState } from "react";
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
import { Button } from "@material-ui/core";
import BackgroundImage from "../../assets/Images/background_home.jpg";
import { getSelectedCampaign } from "../../store/selected/selectedSelectors";
import { getUrlFromStorage } from "../../services/Firebase/storage";
import useOwner from "../../store/hooks/useOwner";
type UserHomeProps = {};
const UserHome: FunctionComponent<UserHomeProps> = () => {
    const history = useHistory();
    const campaigns = useSelector(getAllCampaigns);
    const [campaignUrls, setCampaignUrls] = useState<any[]>([])
    const owner = useOwner()
    const sessions = useSelector(getAllSessions);
    const selectedCampaign = useSelector(getSelectedCampaign)
    useMemo(() => {
        if (campaigns) {

            let urlPromises: Promise<any>[] = Object.values(campaigns).map((campaign: ICampaign) => {
                return getUrlFromStorage(`users/${owner}/campaigns/${campaign.slug}/TitleImage`)
                    .then((url) => {
                        return { campaignSlug: campaign.slug, url: url }

                    }
                    )
                    .catch(() => ({ campaignSlug: campaign.slug, url: "" }))

            }
            )
            Promise.all(urlPromises).then(val => {
                setCampaignUrls(val)
            })
        }
    }, [campaigns, owner]);

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
                            <Link to={`/user/${owner}/campaigns/${campaign.campaignSlug}`} key={index}>
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
                    : null}
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
  width:100%;
  min-height: 100vh;
`;

const CampaignImg = styled.img`
  max-height: 10rem;
  max-width:15rem;
 
`;

export default UserHome;
