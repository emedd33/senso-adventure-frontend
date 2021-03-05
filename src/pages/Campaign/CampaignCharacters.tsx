import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getSelectedCampaign,
  getSelectedCampaignCharacters,
} from "../../store/selected/selectedSelectors";
import styled from "styled-components";

import { OLD_WHITE } from "../../assets/constants/Constants";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
  Divider,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
type CampaignCharactersProps = {};
const CampaignCharacters: FunctionComponent<CampaignCharactersProps> = () => {
  const characters = useSelector(getSelectedCampaignCharacters);
  const selectedCampaign = useSelector(getSelectedCampaign);

  return (
    <Container>
      {characters && selectedCampaign
        ? characters.map(([, character]: [string, ICharacter]) => (
            <Accordion
              style={
                character.isPublished === "TRUE"
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
                  {character.name}
                </Typography>
                <Typography style={{ fontSize: "1rem", opacity: 0.7 }}>
                  {character.isPlayer === "TRUE" ? "Player" : "NPC"}
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                style={{ display: "grid", gridTemplateColumns: "3fr 1fr 5fr" }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(6,1fr) ",
                  }}
                >
                  <div>STR</div>
                  <div>DEX</div>
                  <div>CON</div>
                  <div>INT</div>
                  <div>WIS</div>
                  <div>CHA</div>
                  <div>{character.stats.strength.value}</div>
                  <div>{character.stats.dexterity.value}</div>
                  <div>{character.stats.constitution.value}</div>
                  <div>{character.stats.intelligence.value}</div>
                  <div>{character.stats.wisdom.value}</div>
                  <div>{character.stats.charisma.value}</div>
                </div>
                <Divider orientation="vertical" />
                <div>
                  <p>{character.summary}</p>
                </div>
              </AccordionDetails>
              <AccordionActions>
                <Link
                  to={`/${selectedCampaign.campaign.slug}/characters/${character.slug}`}
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
export default CampaignCharacters;
