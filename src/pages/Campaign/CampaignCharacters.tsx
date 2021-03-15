import { FunctionComponent } from "react";
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
        ? characters.map(([, character]: [string, ICharacter], index: number) => (
          <Accordion
            key={index}
            style={
              character.isPublished === "TRUE"
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
                {character.name}
              </Typography>
              <Typography style={{ fontSize: "1rem", opacity: 0.7 }}>
                {character.isPlayer === "TRUE" ? "Player" : "NPC"}
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              style={{ display: "grid", gridTemplateColumns: "3fr 1fr 5fr" }}
            >
              <p>{character.summary}</p>
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
