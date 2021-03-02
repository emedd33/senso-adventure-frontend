import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getSelectedCampaign, getSelectedCampaignCharacters, isDungeonMasterSelector } from "../../store/selected/selectedSelectors";
import styled from "styled-components";

import { OLD_WHITE } from "../../assets/constants/Constants";
import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Button, Typography } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
type CampaignCharactersProps = {};
const CampaignCharacters: FunctionComponent<CampaignCharactersProps> = () => {
    const isDungeonMaster = useSelector(isDungeonMasterSelector)
    const characters = useSelector(getSelectedCampaignCharacters)
    const selectedCampaign = useSelector(getSelectedCampaign)

    return (
        <>
            <Container >
                {characters && selectedCampaign ? Object.entries(characters).map(([id, character]: [string, ICharacter,]) => (
                    <Accordion >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Typography style={{ flexBasis: '33.33%', flexShrink: 0, }} >{character.name}</Typography>
                            <Typography style={{ fontSize: "1rem", color: "gray" }}>{character.isPlayer === "TRUE" ? "Player" : "NPC"}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {character.summary}
                        </AccordionDetails>
                        {isDungeonMaster ?
                            <AccordionActions>
                                <Link to={`/${selectedCampaign.campaign.slug}/characters/${character.slug}`}>
                                    <Button size="small" color="primary">
                                        <ArrowForwardIcon />
                                    </Button>
                                </Link>
                            </AccordionActions>
                            : null}
                    </Accordion>
                )
                )
                    : null}


            </Container>

        </>
    );
};
const Container = styled.div`
width: 70%;
padding: 1rem;
-webkit-box-shadow: 5px 5px 15px 5px #000000;
box-shadow: 5px 0px 15px 2px #000000;
background-color: ${OLD_WHITE};
display: grid;
grid-template-columns:1fr
min-height:20rem;
`;
const CharacterButton = styled(Button)`
display:grid;
grid-template-columns:1fr 1fr;
width:100%;
`
export default CampaignCharacters;
