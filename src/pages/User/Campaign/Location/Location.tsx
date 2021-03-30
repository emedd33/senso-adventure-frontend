import React from "react";
import {
    // useDispatch,
    useSelector,
} from "react-redux";
import { useHistory } from "react-router-dom";
import {
    OLD_WHITE,
    OLD_WHITE_DARK,
} from "../../../../assets/constants/Constants";
import IsLoading from "../../../../components/IsLoading/IsLoading";
import styled from "styled-components";
import {
    getSelectedLocation,
    getSelectedCampaign,
    isDungeonMasterSelector,
    getSelectedLocationStoragePath,
} from "../../../../store/selected/selectedSelectors";
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
import renderArrayOfString from "../../../../utils/renderArrayToString";
import useOwner from "../../../../store/hooks/useOwner";
import { SensoDescription } from "../../../../components/SensoContainers";
import SensoDraftJS from "../../../../components/SensoDraftJS/SensoDraftJS";
import { useTranslation } from "react-i18next";

export interface LocationProps { }

const Location: React.FC<LocationProps> = () => {
    const translate = useTranslation();
    const history = useHistory();

    const selectedCampaign = useSelector(getSelectedCampaign);
    const selectedLocation = useSelector(getSelectedLocation);
    const isDungeonMaster = useSelector(isDungeonMasterSelector);
    const locationPath = useSelector(getSelectedLocationStoragePath);
    const owner = useOwner();

    if (!selectedLocation) {
        return <IsLoading />;
    }
    return (
        <Container>
            <div>
                <h1 style={{ marginBottom: "0" }}>
                    {selectedLocation.location.name}
                    {selectedLocation.location.isPublished === "FALSE"
                        ? `(${translate.t(`Not published`)})`
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
                                {translate.t(`Edit`)}
                            </Button>
                        </div>
                    </>
                ) : null}
            </div>
            {selectedLocation.location.nickNames ?
                <div style={{ gridColumn: "1/3" }}>
                    <b>{translate.t(`Also known as`)}: </b>
                    <i>{renderArrayOfString(selectedLocation.location.nickNames)}</i>
                </div>
                : null}
            {selectedLocation.location.religion ?
                <div>
                    <b>{translate.t(`Religion/Belief system`)}: </b>
                    <i>{selectedLocation.location.religion}</i>
                </div>
                : null}
            {selectedLocation.location.governRule ?
                <div>
                    <b>{translate.t(`Governed rule`)}: </b>
                    <i>{selectedLocation.location.governRule}</i>
                </div>
                : null}
            <div style={{ gridColumn: "1/3" }}>
                <SensoDescription content={selectedLocation.location.description} />
            </div>

            <Divider style={{ gridColumn: "1/3", marginTop: "1rem" }} />

            {selectedLocation.location.characters && selectedCampaign ? (
                <>
                    <div style={{ gridColumn: "1/3" }}>
                        <h3>{`${translate.t("Characters in")} ${selectedLocation.location.name
                            }`}</h3>
                    </div>
                    {Object.values(selectedLocation.location.characters).map(
                        (character: { name: string; description: string }) => (
                            <Accordion
                                style={{ backgroundColor: OLD_WHITE_DARK, gridColumn: "1/3" }}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header"
                                >
                                    <Typography style={{ flexBasis: "33.33%", flexShrink: 0 }}>
                                        {character.name}
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns: "3fr 1fr 5fr",
                                    }}
                                >
                                    <div>
                                        <p>{character.description}</p>
                                    </div>
                                </AccordionDetails>
                                <AccordionActions>
                                    <Link
                                        to={`/user/${owner}/campaigns/${selectedCampaign.campaign.slug
                                            }/monsters/${character.name.replace(/\s/g, "")}`}
                                    >
                                        <Button size="small" color="primary">
                                            <ArrowForwardIcon />
                                        </Button>
                                    </Link>
                                </AccordionActions>
                            </Accordion>
                        )
                    )}
                </>
            ) : null}
            {isDungeonMaster ? (
                <div style={{ gridColumn: "1/3" }}>
                    <h3>{`${translate.t("Lore and information")}`}</h3>

                    <SensoDraftJS
                        readOnly={true}
                        storagePath={`${locationPath}`}
                        isDungeonMaster={isDungeonMaster}
                    />
                </div>
            ) : null}
        </Container>
    );
};
const Container = styled.div`
  width: 90%;
  z-index: 100;
  padding: 1rem;
  -webkit-box-shadow: 5px 5px 15px 5px #000000;
  box-shadow: 5px 0px 15px 2px #000000;
  background-color: ${OLD_WHITE};
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: 1fr 1fr;
  justify-content: space-between;
  align-center: center;
  flex-wrap: wrap;
  min-height: 20rem;
`;
export default Location;
