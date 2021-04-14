import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  getSelectedCampaign,
  getSelectedCampaignPlayers,
  isDungeonMasterSelector,
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
import SensoPlayerShort from "../../../../components/SensoContainers/SensoPlayerShort";
import { useTranslation } from "react-i18next";
type PlayerProps = {};
const Player: FunctionComponent<PlayerProps> = () => {
  const translate = useTranslation()
  const players = useSelector(getSelectedCampaignPlayers);
  const selectedCampaign = useSelector(getSelectedCampaign);
  const owner = useOwner();
  const isDungeonMaster = useSelector(isDungeonMasterSelector);
  return (
    <Container>
      {selectedCampaign
        ? <> 
        <div style={{display:"flex", justifyContent:"center"}}>

      <Link to={`/user/${owner}/campaigns/${selectedCampaign.campaign.slug}/new-player/`} style={{textDecoration:"none"}}>
      <Button variant="contained" color="primary" style={{textTransform:"none"}}>
            {translate.t('New player')}
      </Button>
      </Link>
        </div>
       { players?
        players.map(([, player]: [string, IPlayer], index: number) => (
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
            <AccordionDetails>
              <SensoPlayerShort
                player={player}
                isDungeonMaster={isDungeonMaster}
              />
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
        )):null}
        </>
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
