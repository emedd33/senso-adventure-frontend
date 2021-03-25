import React, { FunctionComponent, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import Scroll from "../../../components/Scroll/Scroll";
import { Link, useHistory } from "react-router-dom";

import {
    getSelectedCampaign,
    getSelectedCampaignStoragePath,
    isDungeonMasterSelector,
} from "../../../store/selected/selectedSelectors";
import styled from "styled-components";

import {
    OLD_WHITE_TRANSPARENT,
    OLD_WHITE,
} from "../../../assets/constants/Constants";
import {
    Avatar,
    Button,
    Card,
    CardActionArea,
    CardContent,
    CardHeader,
    IconButton,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ScrollMenu from "react-horizontal-scrolling-menu";
import useOwner from "../../../store/hooks/useOwner";
import { getUrlFromStorage } from "../../../services/Firebase/storage";
const MenuItem: React.FC<{ text: any; selected: any, key: number }> = ({
    text,
    selected,
    key,
}) => {
    return <div className={`menu-item ${selected ? "active" : ""}`} key={key}>{text}</div>;
};


export const Menu = (list: any[], selected: any) =>
    list.map((el, index) => {
        const { name } = el;

        return <MenuItem text={name} key={index} selected={selected} />;
    });

type CampaignProps = {};
const Campaign: FunctionComponent<CampaignProps> = () => {
    const history = useHistory();
    const [campaignTitleImage, setCampaignTitleImage] = useState<string>("");
    const owner = useOwner()
    const isDungeonMaster = useSelector(isDungeonMasterSelector)
    const selectedCampaignStoragePath = useSelector(getSelectedCampaignStoragePath)
    const selectedCampaign = useSelector(getSelectedCampaign);
    const [monsters, setMonsters] = useState<any[]>([])
    const [sessions, setSessions] = useState<any[]>([]);
    const [players, setPlayers] = useState<any[]>([]);
    const [locations, setLocations] = useState<any[]>([]);
    const [selectedSessionMenu, setSelectedSessionMenu] = useState("");
    const [selectedPlayerMenu, setSelectedPlayerMenu] = useState("");
    const [selectedMonsterMenu, setSelectedMonsterMenu] = useState("");
    const [selectedLocationMenu, setSelectedLocationMenu] = useState("");
    useMemo(() => {
        getUrlFromStorage(selectedCampaignStoragePath + "/TitleImage").then(url => setCampaignTitleImage(url))
    },
        [selectedCampaignStoragePath]
    )
    useMemo(() => {
        if (selectedCampaign && selectedCampaign.campaign.players) {
            setPlayers(Object.entries(selectedCampaign.campaign.players)
                .slice(0, 10)
                .map(([id, player]: [string, IPlayer], index: number) =>
                    createMenuItem(index, selectedPlayerMenu, player.name[0], player.isPublished, () => {
                        history.push(`/user/${owner}/campaigns/${selectedCampaign.campaign.slug}/players/${player.slug}`);
                    }, player.name, player.summary)
                ))
        }
        return () => {
            setPlayers([])
        };
    },
        [selectedCampaign, owner, selectedPlayerMenu, history,]
    )
    useMemo(() => {
        if (selectedCampaign && selectedCampaign.campaign.monsters) {
            setMonsters(Object.entries(selectedCampaign.campaign.monsters)
                .slice(0, 10)
                .map(([id, monster]: [string, IMonster], index: number) =>
                    createMenuItem(index, selectedMonsterMenu, monster.name[0], monster.isPublished, () => {
                        history.push(`/user/${owner}/campaigns/${selectedCampaign.campaign.slug}/monsters/${monster.slug}`);
                    }, monster.name, monster.summary)
                ))
        }
        return () => {
            setMonsters([])
        };
    },
        [selectedCampaign, owner, selectedMonsterMenu, history,]
    )
    useMemo(() => {
        if (selectedCampaign && selectedCampaign.campaign.locations) {
            setLocations(Object.entries(selectedCampaign.campaign.locations)
                .slice(0, 10)
                .map(([id, location]: [string, ILocation], index: number) =>
                    createMenuItem(index, selectedLocationMenu, location.name[0], location.isPublished, () => {
                        history.push(`/user/${owner}/campaigns/${selectedCampaign.campaign.slug}/locations/${location.slug}`);
                    }, location.name, location.summary)
                ))
        }
        return () => {
            setLocations([])
        };
    },
        [selectedCampaign, owner, selectedLocationMenu, history,]
    )
    useMemo(() => {
        if (selectedCampaign && selectedCampaign.campaign.sessions) {
            setSessions(Object.entries(selectedCampaign.campaign.sessions)
                .slice(0, 10)
                .map(([id, session]: [string, ISession], index: number) =>
                    <MenuItem
                        text={
                            <Scroll
                                title={session.title}
                                subTitle={session.subTitle ? session.subTitle : ""}
                                date={session.date}
                                campaignSlug={selectedCampaign.campaign.slug}
                                sessionDay={session.sessionDay}
                                isOpaque={session.isPublished === "FALSE"}
                                onClick={() => {

                                    history.push(
                                        `/users/${owner}/${selectedCampaign.campaign.slug}/sessions/${session.slug}`
                                    );
                                }}
                            />
                        }
                        key={index}
                        selected={selectedSessionMenu}
                    />
                ))
        }
        return () => {
            setSessions([])
        };
    },
        [selectedCampaign, owner, selectedSessionMenu, history,]
    )

    return (
        <Container>
            {campaignTitleImage ? (
                <img
                    src={campaignTitleImage}
                    alt="Campaign title"
                    style={{
                        maxHeight: "20rem",
                        marginBottom: "1rem",
                    }}
                />
            ) : null}
            {sessions.length > 0 ?
                <Overview>
                    <Link to={`/user/${owner}/campaigns/${selectedCampaign?.campaign.slug}/sessions`} style={{ textDecoration: "none" }}>
                        <Button
                            variant="contained"
                            style={{
                                backgroundColor: OLD_WHITE,
                                textTransform: "none",
                                width: "100%",
                            }}
                        >
                            <h3 style={{ textAlign: "end" }}>Sessions</h3>
                        </Button>
                    </Link>
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
                </Overview>
                : null}

            {monsters.length > 0 ?
                <Overview>
                    <Link to={`/user/${owner}/campaigns/${selectedCampaign?.campaign.slug}/monsters`} style={{ textDecoration: "none" }}>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <Button
                                variant="contained"
                                color="primary"
                                style={{
                                    textTransform: "none",
                                }}
                            >
                                Monsters
                        </Button>
                        </div>
                    </Link>
                    <ScrollMenu
                        data={monsters}
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
                        selected={selectedMonsterMenu}
                        wheel={false}
                        onSelect={(key) => {
                            if (typeof key === "string") {
                                setSelectedMonsterMenu(key);
                            }
                        }}
                    />
                </Overview>
                : null}
            {players.length > 0 ?
                <Overview>
                    <Link to={`/user/${owner}/campaigns/${selectedCampaign?.campaign.slug}/players`} style={{ textDecoration: "none" }}>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <Button
                                variant="contained"
                                color="primary"
                                style={{
                                    textTransform: "none",
                                }}
                            >
                                Players
                        </Button>
                        </div>
                    </Link>
                    <ScrollMenu
                        data={players}
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
                        selected={selectedPlayerMenu}
                        wheel={false}
                        onSelect={(key) => {
                            if (typeof key === "string") {
                                setSelectedPlayerMenu(key);
                            }
                        }}
                    />
                </Overview>
                : null}
            {locations.length > 0 ?
                <Overview>
                    <Link to={`/user/${owner}/campaigns/${selectedCampaign?.campaign.slug}/locations`} style={{ textDecoration: "none" }}>
                        <div style={{ display: "flex", justifyContent: "center" }}>

                            <Button
                                variant="contained"
                                color="primary"
                                style={{
                                    textTransform: "none",
                                }}
                            >
                                Locations
                        </Button>
                        </div>
                    </Link>
                    <ScrollMenu
                        data={locations}
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
                        selected={selectedLocationMenu}
                        wheel={false}
                        onSelect={(key) => {
                            if (typeof key === "string") {
                                setSelectedLocationMenu(key);
                            }
                        }}
                    />
                </Overview>
                : null}
            {isDungeonMaster ? <>
                <div style={{ backgroundColor: OLD_WHITE_TRANSPARENT, display: "flex", justifyContent: "center", flexDirection: "row", padding: "2rem" }}>

                    <Link to={`/user/${owner}/campaigns/${selectedCampaign?.campaign.slug}/edit`} style={{ textDecoration: "none" }}>
                        <div style={{ display: "flex", justifyContent: "center" }}>

                            <Button
                                variant="contained"
                                color="primary"
                                style={{
                                    textTransform: "none",
                                }}
                            >
                                Edit Campaign
                            </Button>
                        </div>
                    </Link>

                </div>
            </>
                : null}

        </Container >
    );
};

const createMenuItem = (key: number, menu: any, playerInitial: string, isPublished: string, onClickAction: any, title: string, summary: string) => {
    return (<MenuItem
        text={
            <Card
                style={
                    isPublished === "TRUE"
                        ? { margin: "2rem", backgroundColor: OLD_WHITE }
                        : {
                            margin: "2rem",
                            backgroundColor: OLD_WHITE,
                            opacity: 0.5,
                        }
                }
                onClick={onClickAction}
            >
                <CardActionArea>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="recipe">
                                {playerInitial}
                            </Avatar>
                        }
                        style={{ width: "15rem" }}
                        title={title}
                    />
                    <CardContent>
                        <p>{summary.slice(0, 40)}...</p>
                    </CardContent>
                </CardActionArea>
            </Card>
        }
        key={key}
        selected={menu}
    />)
}
const Container = styled.div`
display:grid;
grid-template-columns: 1fr;
align-items: center;
margin-top:10rem;
margin-bottom:10rem;
justify-items: center;
`
const Overview = styled.div`
  width: 90%;
  margin: 5rem;
  background: ${OLD_WHITE_TRANSPARENT};
  padding: 1rem;
  min-width: 20rem;
`;
export default Campaign;
