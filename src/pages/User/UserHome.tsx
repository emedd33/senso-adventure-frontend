import React, { FunctionComponent, useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
    getAllCampaigns,
} from "../../store/campaign/campaignSelectors";
import {
    OLD_WHITE_TRANSPARENT,
} from "../../assets/constants/Constants";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import BackgroundImage from "../../assets/Images/background_home.jpg";
import { getUrlFromStorage } from "../../services/Firebase/storage";
import useOwner from "../../store/hooks/useOwner"; 
type UserHomeProps = {};
const UserHome: FunctionComponent<UserHomeProps> = () => {
    const campaigns = useSelector(getAllCampaigns);
    const [campaignUrls, setCampaignUrls] = useState<any[]>([])
    const owner = useOwner()
    useEffect(() => {
        if (campaigns) {

            let urlPromises: Promise<any>[] = Object.values(campaigns).map((campaign: ICampaign) => {
                return getUrlFromStorage(`users/${owner}/campaigns/${campaign.slug}/TitleImage`)
                    .then((url) => {
                        return { slug: campaign.slug, title: campaign.title, url: url }

                    }
                    )
                    .catch(() => ({ slug: campaign.slug, title: campaign.title, url: "" }))

            }
            )
            Promise.all(urlPromises).then(val => {
                setCampaignUrls(val)
            })
        }
        return () => setCampaignUrls([])
    }, [campaigns, owner]);
    const renderCampaignUrls = useCallback(
        () => {
            if (campaignUrls) {
                return Object.values(campaignUrls).map(
                    (campaign: { slug: string; title: string, url?: string }, index: number) => (
                        <Link to={`/user/${owner}/campaigns/${campaign.slug}`} key={index} style={{textDecoration:"none",}}>
                            <Button style={{ marginLeft: "2rem", marginRight: "2rem", width: "17rem",  textTransform:"none" }}>
                                {campaign.url ? (
                                    <CampaignImg src={campaign.url} />
                                ) : (
                                    <h1>{campaign.title}</h1>
                                )}
                            </Button>
                        </Link>
                    )
                )
            } else {
                return null
            }

        },
        [campaignUrls, owner],
    )
  
    return (
        <Container>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: OLD_WHITE_TRANSPARENT,
                    margin: "5rem",
                    minHeight: "15rem",
                    flexDirection: "row",
                    flexWrap: "wrap"
                }}
            >

                {renderCampaignUrls()}
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
