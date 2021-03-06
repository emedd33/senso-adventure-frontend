import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getSelectedCampaign,
  getSelectedCampaignMonsters,
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
import { useTranslation } from "react-i18next";
import { SensoDescription } from "../../../../components/SensoContainers";
type CampaignMonstersProps = {};
const CampaignMonsters: FunctionComponent<CampaignMonstersProps> = () => {
  const selectedCampaign = useSelector(getSelectedCampaign);
  const translate = useTranslation()
  const monsters = useSelector(getSelectedCampaignMonsters);
  const owner = useOwner();
  return (
    <Container>{selectedCampaign
      ? <>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>

          <Link to={`/user/${owner}/campaigns/${selectedCampaign.campaign.slug}/new-session/`} style={{ textDecoration: "none" }}>
            <Button variant="contained" color="primary" style={{ textTransform: "none" }}>
              {translate.t('New monster/NPC')}
            </Button>
          </Link>
        </div>
        {monsters
          ? monsters.map(([, monster]: [string, IMonster], index: number) => (
            <Accordion
              key={index}
              style={
                monster.isPublished === "TRUE"
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
                  {monster.name}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <SensoDescription content={monster.description} />
              </AccordionDetails>
              <AccordionActions>
                <Link
                  to={`/user/${owner}/campaigns/${selectedCampaign.campaign.slug}/monsters/${monster.slug}`}
                >
                  <Button size="small" color="primary">
                    <ArrowForwardIcon />
                  </Button>
                </Link>
              </AccordionActions>
            </Accordion>
          ))
          : null}
      </> : null}
    </Container>
  );
};

const Container = styled.div`
  width: 70%;
  padding: 1rem;

  display: grid;
`;
export default CampaignMonsters;
