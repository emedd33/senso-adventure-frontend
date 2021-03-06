import React from "react";
import {
    // useDispatch, 
    useSelector
} from "react-redux";
import { useHistory } from "react-router-dom";
import { OLD_WHITE } from "../../assets/constants/Constants";
import IsLoading from "../../components/IsLoading/IsLoading";
import styled from "styled-components";
import {
    getSelectedLocation,
    getSelectedCampaign,
    isDungeonMasterSelector
} from "../../store/selected/selectedSelectors";
import {
    Accordion,
    AccordionActions,
    AccordionDetails,
    AccordionSummary,
    Button,
    Typography,
    Divider,
} from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Link } from "react-router-dom";

export interface CampaignLocationNewProps { }


const CampaignLocationNew: React.FC<CampaignLocationNewProps> = () => {
    // const dispatch = useDispatch();
    const history = useHistory();

    const selectedCampaign = useSelector(getSelectedCampaign);
    const selectedLocation = useSelector(getSelectedLocation)
    const isDungeonMaster = useSelector(isDungeonMasterSelector)


    if (!selectedLocation) {
        return <IsLoading />;
    }
    return (
        <Container>

            <div>
                <h1 style={{ marginBottom: "0" }}>
                    {selectedLocation.location.name}
                    {selectedLocation.location.isPublished === "FALSE"
                        ? "(Unpublished)"
                        : null}
                </h1>
            </div>
            <div>
                {isDungeonMaster ? (
                    <>
                        <div
                            style={{
                                flex: 1,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-end",
                            }}
                        >
                            <Button
                                onClick={() =>
                                    history.push(`${selectedLocation.location.slug}/edit`)
                                }
                                variant="contained"
                                color="primary"
                                style={{ maxHeight: "2rem", maxWidth: "3rem" }}
                            >
                                Edit
                  </Button>
                        </div>
                    </>
                ) : null}
            </div>
            {selectedLocation.location.characters && selectedCampaign
                ? Object.values(selectedLocation.location.characters).map((character: { role: string, character: ICharacter }) => (
                    <Accordion
                        style={
                            character.character.isPublished === "TRUE"
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
                                {character.character.name}
                            </Typography>
                            <Typography style={{ flexBasis: "33.33%", flexShrink: 0 }}>
                                {character.role}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails
                            style={{ display: "grid", gridTemplateColumns: "3fr 1fr 5fr" }}
                        >
                            {isDungeonMaster ?
                                <>
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
                                        <div>{character.character.stats.strength.value}</div>
                                        <div>{character.character.stats.dexterity.value}</div>
                                        <div>{character.character.stats.constitution.value}</div>
                                        <div>{character.character.stats.intelligence.value}</div>
                                        <div>{character.character.stats.wisdom.value}</div>
                                        <div>{character.character.stats.charisma.value}</div>
                                    </div>
                                    <Divider orientation="vertical" />
                                </>
                                : null}
                            <div>
                                <p>{character.character.summary}</p>
                            </div>
                        </AccordionDetails>
                        <AccordionActions>
                            <Link
                                to={`/${selectedCampaign.campaign.slug}/characters/${character.character.slug}`}
                            >
                                <Button size="small" color="primary">
                                    <ArrowForwardIcon />
                                </Button>
                            </Link>
                        </AccordionActions>
                    </Accordion>
                )) : null}
        </Container>
    );
};
const Container = styled.div`
  width: 70%;
  padding: 1rem;
  -webkit-box-shadow: 5px 5px 15px 5px #000000;
  box-shadow: 5px 0px 15px 2px #000000;
  background-color: ${OLD_WHITE};
  display: grid;
  grid-template-columns: 1fr;
  justify-content: space-between;
  align-center: center;
  flex-wrap: wrap;
  min-height: 20rem;
`;
export default CampaignLocationNew;
