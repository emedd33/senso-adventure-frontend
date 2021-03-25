import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    getSelectedCampaign,
    getSelectedCampaignLocations,
} from "../../../../store/selected/selectedSelectors";
import styled from "styled-components";

import { OLD_WHITE } from "../../../../assets/constants/Constants";
import {
    Accordion,
    AccordionActions,
    AccordionDetails,
    AccordionSummary,
    Button,
    Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import useOwner from "../../../../store/hooks/useOwner";
type CampaignLocationsProps = {};
const CampaignLocations: FunctionComponent<CampaignLocationsProps> = () => {
    const locations = useSelector(getSelectedCampaignLocations);
    const selectedCampaign = useSelector(getSelectedCampaign);
    const owner = useOwner()

    return (
        <Container>
            {locations && selectedCampaign
                ? locations.map(([, location]: [string, ILocation], index: number) => (
                    <Accordion
                        key={index}
                        style={
                            location.isPublished === "TRUE"
                                ? { backgroundColor: OLD_WHITE }
                                : { backgroundColor: OLD_WHITE, opacity: 0.5 }
                        }
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Typography style={{ flexBasis: "33.33%", flexShrink: 0 }}>
                                {location.name}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails
                            style={{ display: "grid", gridTemplateColumns: "3fr 1fr 5fr" }}
                        >
                            <div>
                                <p>{location.description}</p>
                            </div>
                        </AccordionDetails>
                        <AccordionActions>
                            <Link
                                to={`/user/${owner}/campaigns/${selectedCampaign.campaign.slug}/locations/${location.slug}`}
                            >
                                <Button size="small" color="primary">
                                    <ArrowForwardIcon />
                                </Button>
                            </Link>
                        </AccordionActions>
                    </Accordion>
                ))
                : null}
        </Container>
    );
};

const Container = styled.div`
  width: 70%;
  padding: 1rem;

  display: grid;
`;
export default CampaignLocations;
