import React, { FunctionComponent, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import Scroll from "../../../components/Scroll/Scroll";
import { Link, useHistory, useLocation } from "react-router-dom";

import {
    getSelectedCampaign,
    getSelectedCampaignStoragePath,
    isDungeonMasterSelector,
} from "../../../store/selected/selectedSelectors";
import styled from "styled-components";

import {
    OLD_WHITE_TRANSPARENT,
    OLD_WHITE,
    OLD_WHITE_DARK,
} from "../../../assets/constants/Constants";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    AccordionActions,
    Button,
    Typography,
    IconButton,
} from "@material-ui/core";
import { filterUnpublished } from "./../../../utils/Database";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ScrollMenu from "react-horizontal-scrolling-menu";
import useOwner from "../../../store/hooks/useOwner";
import { getUrlFromStorage } from "../../../services/Firebase/storage";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import useWindowSize from "../../../store/hooks/useWindowSize";
import { useTranslation } from "react-i18next";
import SensoDraftJS from "../../../components/SensoDraftJS/SensoDraftJS";
import { SensoMonsterShort, SensoPlayerShort } from "../../../components/SensoContainers";
import renderArrayOfString from "../../../utils/StringProcessing/renderArrayOfString";

const MenuItem: React.FC<{ text: any; selected: any; key: number }> = ({
    text,
    selected,
    key,
}) => {
    return (
        <div className={`menu-item ${selected ? "active" : ""}`} key={key}>
            {text}
        </div>
    );
};

export const Menu = (list: any[], selected: any) =>
    list.map((el, index) => {
        const { name } = el;

        return <MenuItem text={name} key={index} selected={selected} />;
    });

type CampaignProps = {};
const Campaign: FunctionComponent<CampaignProps> = () => {
    const history = useHistory();
    const location = useLocation()
    const [campaignTitleImage, setCampaignTitleImage] = useState<string>("");
    const owner = useOwner();
    const translate = useTranslation();
    const size = useWindowSize();
    const isDungeonMaster = useSelector(isDungeonMasterSelector);
    const selectedCampaignStoragePath = useSelector(
        getSelectedCampaignStoragePath
    );
    const selectedCampaign = useSelector(getSelectedCampaign);
    const [sessions, setSessions] = useState<any[]>([]);
    const [selectedSessionMenu, setSelectedSessionMenu] = useState("");
    useMemo(() => {
        getUrlFromStorage(selectedCampaignStoragePath + "/TitleImage").then((url) =>
            setCampaignTitleImage(url)
        ).catch(() => null);
    }, [selectedCampaignStoragePath]);

    useEffect(() => {
        if (selectedCampaign && selectedCampaign.campaign.sessions) {
            setSessions(
                filterUnpublished(selectedCampaign.campaign.sessions, isDungeonMaster)
                    .slice(0, 10)
                    .map(([id, session]: [string, ISession], index: number) => (
                        <MenuItem
                            text={
                                <Scroll
                                    title={session.title}
                                    subTitle={session.subTitle ? session.subTitle : ""}
                                    date={session.date}
                                    campaignSlug={selectedCampaign.campaign.slug}
                                    sessionDay={session.sessionDay}
                                    isOpaque={session.isPublished === "FALSE"}
                                    owner={owner}
                                    onClick={() => {
                                        history.push(
                                            `/user/${owner}/campaigns/${selectedCampaign.campaign.slug}/sessions/${session.slug}`
                                        );
                                    }}
                                />
                            }
                            key={index}
                            selected={selectedSessionMenu}
                        />
                    ))
            );
        }
        return () => {
            setSessions([]);
        };
    }, [selectedCampaign, owner, selectedSessionMenu, history, isDungeonMaster]);

    return (
        <Container>
            {campaignTitleImage ? (
                <img
                    src={campaignTitleImage}
                    alt="Campaign title"
                    style={{
                        maxHeight: "20rem",
                        width: "70%",
                        marginBottom: "1rem",
                    }}
                />
            ) : null}

            <div style={{ width: "100%" }}>
                {sessions.length > 0 ? (
                    <Overview>
                        <Link
                            to={`/user/${owner}/campaigns/${selectedCampaign?.campaign.slug}/sessions`}
                            style={{ textDecoration: "none" }}
                        >
                            <div
                                style={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <Button
                                    variant="contained"
                                    color="primary"
                                    style={{
                                        textTransform: "none",
                                    }}
                                >
                                    {translate.t(`Sessions`)}
                                </Button>
                            </div>
                        </Link>
                        {size.width && size.width! > 769 ? (
                            <ScrollMenu
                                data={sessions}
                                arrowLeft={
                                    <IconButton style={{ backgroundColor: OLD_WHITE }}>
                                        <ArrowBackIcon />
                                    </IconButton>
                                }
                                arrowRight={
                                    <IconButton style={{ backgroundColor: OLD_WHITE }}>
                                        <ArrowForwardIcon />
                                    </IconButton>
                                }
                                selected={selectedSessionMenu}
                                wheel={false}
                                onSelect={(key) => {
                                    if (typeof key === "string") {
                                        setSelectedSessionMenu(key);
                                    }
                                }}
                            />
                        ) : null}
                    </Overview>
                ) : null}
            </div>
            <div style={{ width: "100%", marginTop: "1rem" }}>
                {selectedCampaign && selectedCampaign.campaign.players ? (
                    <>
                        <Link
                            to={`/user/${owner}/campaigns/${selectedCampaign.campaign.slug}/players/`}
                            style={{ textDecoration: "none" }}
                        >
                            <Button
                                color="primary"
                                variant="contained"
                                style={{ textTransform: "none" }}
                            >
                                {translate.t(`Players`)}
                            </Button>
                        </Link>
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fill, minmax(10rem, 40rem))",
                            }}
                        >
                            {filterUnpublished(
                                selectedCampaign.campaign.players,
                                isDungeonMaster
                            )
                                .slice(0, 10)
                                .map(([, player]: [string, IPlayer], index: number) => (
                                    <Accordion
                                        key={index}
                                        style={
                                            player.isPublished === "TRUE"
                                                ? { backgroundColor: OLD_WHITE, margin: 0 }
                                                : {
                                                    backgroundColor: OLD_WHITE,
                                                    opacity: 0.7,
                                                    margin: 0,
                                                }
                                        }
                                    >
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1bh-content"
                                            id="panel1bh-header"
                                        >
                                            <Typography style={{ flexBasis: "40%", flexShrink: 0 }}>
                                                {player.name}
                                            </Typography>
                                            <Typography style={{ flexBasis: "50%", flexShrink: 0 }}>
                                                {translate.t(`Played by`)}
                                                {` ${player.playerName}`}
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails style={{ backgroundColor: OLD_WHITE_DARK }} >
                                            <SensoPlayerShort
                                                player={player}
                                                isDungeonMaster={isDungeonMaster}
                                            />
                                        </AccordionDetails>
                                        <AccordionActions style={{ backgroundColor: OLD_WHITE_DARK }}>
                                            <Link
                                                to={`/user/${owner}/campaigns/${selectedCampaign.campaign.slug}/players/${player.slug}`}
                                            >
                                                <Button size="small" color="primary">
                                                    <ArrowForwardIcon />
                                                </Button>
                                            </Link>
                                        </AccordionActions>
                                    </Accordion>
                                ))}
                        </div>
                    </>
                ) : null}
                <div style={{ width: "100%", marginTop: "1rem" }}>
                    {selectedCampaign && selectedCampaign.campaign.monsters ? (
                        <>
                            <Link
                                to={`/user/${owner}/campaigns/${selectedCampaign.campaign.slug}/monsters/`}
                                style={{ textDecoration: "none" }}
                            >
                                <Button
                                    color="primary"
                                    variant="contained"
                                    style={{ textTransform: "none" }}
                                >
                                    {translate.t(`Npc/Monsters`)}
                                </Button>
                            </Link>
                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(auto-fill, minmax(10rem, 40rem))",
                                }}
                            >
                                {filterUnpublished(
                                    selectedCampaign.campaign.monsters,
                                    isDungeonMaster
                                )
                                    .slice(0, 10)
                                    .map(([, monster]: [string, IMonster], index: number) => (
                                        <Accordion
                                            key={index}
                                            style={
                                                monster.isPublished === "TRUE"
                                                    ? { backgroundColor: OLD_WHITE, margin: 0 }
                                                    : {
                                                        backgroundColor: OLD_WHITE,
                                                        opacity: 0.7,
                                                        margin: 0,
                                                    }
                                            }
                                        >
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1bh-content"
                                                id="panel1bh-header"
                                            >
                                                <Typography style={{ flexBasis: "40%", flexShrink: 0 }}>
                                                    {monster.name}
                                                </Typography>
                                                <Typography style={{ flexBasis: "40%", flexShrink: 0 }}>
                                                    {renderArrayOfString(", ", monster.nickNames)}
                                                </Typography>
                                            </AccordionSummary>
                                            <AccordionDetails style={{ backgroundColor: OLD_WHITE_DARK }}>
                                                <SensoMonsterShort
                                                    monster={monster}
                                                    isDungeonMaster={isDungeonMaster}
                                                />
                                            </AccordionDetails>
                                            <AccordionActions style={{ backgroundColor: OLD_WHITE_DARK }}>
                                                <Link
                                                    to={`/user/${owner}/campaigns/${selectedCampaign.campaign.slug}/monsters/${monster.slug}`}
                                                >
                                                    <Button size="small" color="primary">
                                                        <ArrowForwardIcon />
                                                    </Button>
                                                </Link>
                                            </AccordionActions>
                                        </Accordion>
                                    ))}
                            </div>
                        </>
                    ) : null}
                </div>

            </div>
            <div style={{ width: "100%", marginTop: "1rem" }}>
                {selectedCampaign && selectedCampaign.campaign.locations ? (
                    <>
                        <Link
                            to={`/user/${owner}/campaigns/${selectedCampaign.campaign.slug}/locations/`}
                            style={{ textDecoration: "none" }}
                        >
                            <Button
                                color="primary"
                                variant="contained"
                                style={{ textTransform: "none" }}
                            >
                                {translate.t(`Locations`)}
                            </Button>
                        </Link>
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fill, minmax(10rem, 40rem))",
                            }}
                        >
                            {filterUnpublished(
                                selectedCampaign.campaign.locations,
                                isDungeonMaster
                            )
                                .slice(0, 10)
                                .map(([, location]: [string, ILocation], index: number) => (
                                    <Accordion
                                        key={index}
                                        style={
                                            location.isPublished === "TRUE"
                                                ? { backgroundColor: OLD_WHITE, margin: 0 }
                                                : {
                                                    backgroundColor: OLD_WHITE,
                                                    opacity: 0.7,
                                                    margin: 0,
                                                }
                                        }
                                    >
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1bh-content"
                                            id="panel1bh-header"
                                        >
                                            <Typography style={{ flexBasis: "40%", flexShrink: 0 }}>
                                                {location.name}
                                            </Typography>
                                            <Typography style={{ flexBasis: "40%", flexShrink: 0 }}>
                                                {renderArrayOfString(", ", location.nickNames)}
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails
                                            style={{
                                                display: "grid",
                                                gridTemplateColumns: "1fr",
                                                margin: 0,
                                                backgroundColor: OLD_WHITE_DARK
                                            }}
                                        >
                                            <p>{location.description}</p>
                                        </AccordionDetails>
                                        <AccordionActions style={{ backgroundColor: OLD_WHITE_DARK }}>
                                            <Link
                                                to={`/user/${owner}/campaigns/${selectedCampaign.campaign.slug}/locations/${location.slug}`}
                                            >
                                                <Button size="small" color="primary">
                                                    <ArrowForwardIcon />
                                                </Button>
                                            </Link>
                                        </AccordionActions>
                                    </Accordion>
                                ))}
                        </div>
                    </>
                ) : null}
            </div>
            {isDungeonMaster ? (
                <>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "flex-start",
                            flexDirection: "row",
                            paddingTop: "2rem",
                            width: "100%",
                        }}
                    >
                        <Link
                            to={`/user/${owner}/campaigns/${selectedCampaign?.campaign.slug}/edit`}
                            style={{ textDecoration: "none" }}
                        >
                            <div style={{ display: "flex", justifyContent: "flex-start" }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    style={{
                                        textTransform: "none",
                                    }}
                                >
                                    {translate.t("Edit Campaign")}
                                </Button>
                            </div>
                        </Link>
                    </div>
                </>
            ) : null}
            {isDungeonMaster ? (
                <div onDoubleClick={() => {
                    if (isDungeonMaster) {
                        history.push(`${location.pathname}/edit`)
                    }
                }}
                >
                    <SensoDraftJS
                        storagePath={`${selectedCampaignStoragePath}`}
                        readOnly={true}
                        isDungeonMaster={isDungeonMaster}
                    />
                </div>
            ) : null}
        </Container>
    );
};

const Container = styled.div`
  margin-top: 10rem;
  margin-bottom: 10rem;
  display: flex;
  width: 90%;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  padding: 3rem;
`;
const Overview = styled.div`
  background: ${OLD_WHITE_TRANSPARENT};
  padding: 1rem;
  margin-top: 5rem;
`;
export default Campaign;
