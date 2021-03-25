import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
    getSelectedCampaign,
    getSelectedCampaignPlayers,
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
type PlayerProps = {};
const Player: FunctionComponent<PlayerProps> = () => {
    const players = useSelector(getSelectedCampaignPlayers);
    const selectedCampaign = useSelector(getSelectedCampaign);
    const owner = useOwner()
    console.log("players");

    return (
        <Container>
            {players && selectedCampaign
                ? players.map(([, player]: [string, IPlayer], index: number) => (
                    <Accordion
                        key={index}
                        style={
                            player.isPublished === "TRUE"
                                ? { backgroundColor: OLD_WHITE }
                                : { backgroundColor: OLD_WHITE, opacity: 0.7 }
                        }
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Typography style={{ flexBasis: "33.33%", flexShrink: 0 }}>
                                {player.name}
                            </Typography>

                        </AccordionSummary>
                        <AccordionDetails
                            style={{ display: "grid", gridTemplateColumns: "3fr 1fr 5fr" }}
                        >
                            <p>{player.summary}</p>
                        </AccordionDetails>
                        <AccordionActions>
                            <Link
                                to={`/user/${owner}/campaigns/${selectedCampaign.campaign.slug}/players/${player.slug}`}
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
export default Player;
