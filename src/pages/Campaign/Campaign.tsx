import React, { FunctionComponent, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Scroll from "../../components/Scroll/Scroll";
import { Link, useHistory } from "react-router-dom";
import { storage } from "../../firebase";

import {
    getSelectedCampaign,
    getSelectedCampaignMonsters,
    getSelectedCampaignLocations,
    getSelectedCampaignSessions,
    getSelectedCampaignPlayers,
    getSelectedCampaignSlug,
    isDungeonMasterSelector,
} from "../../store/selected/selectedSelectors";
import styled from "styled-components";
import {
    setSelectedMonster,
    setSelectedLocation,
    setSelectedSession,
    setSelectedPlayer,
} from "../../store/selected/selectedCreators";
import {
    OLD_WHITE_TRANSPARENT,
    OLD_WHITE,
} from "../../assets/constants/Constants";
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
const MenuItem: React.FC<{ text: any; selected: any, key: number }> = ({
    text,
    selected,
    key,
}) => {
    return <div className={`menu-item ${selected ? "active" : ""}`} key={key}>{text}</div>;
};

// All items component
// Important! add unique key
export const Menu = (list: any[], selected: any) =>
    list.map((el, index) => {
        const { name } = el;

        return <MenuItem text={name} key={index} selected={selected} />;
    });

type CampaignProps = {};
const Campaign: FunctionComponent<CampaignProps> = () => {
    const history = useHistory();

    const dispatch = useDispatch();
    const [campaignTitleImage, setCampaignTitleImage] = useState<string>("");
    const isDungeonMaster = useSelector(isDungeonMasterSelector)
    const selectedCampaign = useSelector(getSelectedCampaign);
    const selectedCampaignSlug = useSelector(getSelectedCampaignSlug)
    const campaignMonsters = useSelector(getSelectedCampaignMonsters);
    const [monsters, setMonsters] = useState<any[]>([])
    const campaignSessions = useSelector(getSelectedCampaignSessions)
    const campaignPlayers = useSelector(getSelectedCampaignPlayers)
    const [sessions, setSessions] = useState<any[]>([]);
    const [players, setPlayers] = useState<any[]>([]);
    const campaignLocations = useSelector(getSelectedCampaignLocations)
    const [locations, setLocations] = useState<any[]>([]);
    const [selectedSessionMenu, setSelectedSessionMenu] = useState("");
    const [selectedPlayerMenu, setSelectedPlayerMenu] = useState("");
    const [selectedMonsterMenu, setSelectedMonsterMenu] = useState("");
    const [selectedLocationMenu, setSelectedLocationMenu] = useState("");
    useEffect(() => {
        if (selectedCampaign) {
            if (campaignSessions) {
                campaignSessions
                    .slice(0, 10)
                    .map(([id, session]: [string, ISession], index: number) => {
                        if (session) {
                            setSessions((existing) => [
                                ...existing,
                                <MenuItem
                                    text={
                                        <Scroll
                                            id={id}
                                            title={session.title}
                                            subTitle={session.subTitle ? session.subTitle : ""}
                                            date={session.date}
                                            campaignSlug={selectedCampaign.campaign.slug}
                                            sessionDay={session.sessionDay}
                                            isOpaque={session.isPublished === "FALSE"}
                                            onClick={() => {
                                                dispatch(
                                                    setSelectedSession({ id: id, session: session })
                                                );
                                                history.push(
                                                    `/${selectedCampaign.campaign.slug}/sessions/${session.slug}`
                                                );
                                            }}
                                        />
                                    }
                                    key={index}
                                    selected={selectedSessionMenu}
                                />,
                            ]);
                        }
                        return undefined;
                    });
            }
            if (campaignLocations) {
                campaignLocations
                    .slice(0, 10)
                    .map(([id, location]: [string, ILocation], index: number) => {
                        if (location) {
                            setLocations((existing) => [
                                ...existing,
                                <MenuItem
                                    text={
                                        <Card
                                            style={
                                                location.isPublished === "TRUE"
                                                    ? { margin: "2rem", backgroundColor: OLD_WHITE }
                                                    : {
                                                        margin: "2rem",
                                                        backgroundColor: OLD_WHITE,
                                                        opacity: 0.5,
                                                    }
                                            }
                                            onClick={() => {
                                                dispatch(
                                                    setSelectedLocation({
                                                        id: id,
                                                        location: location,
                                                    })
                                                );
                                                history.push(
                                                    `/${selectedCampaign.campaign.slug}/locations/${location.slug}`
                                                );
                                            }}
                                        >
                                            <CardActionArea>
                                                <CardHeader
                                                    avatar={
                                                        <Avatar aria-label="recipe">
                                                            {location.name[0]}
                                                        </Avatar>
                                                    }
                                                    style={{ width: "15rem" }}
                                                    title={location.name}
                                                />
                                                <CardContent>
                                                    <p>{location.summary.slice(0, 40)}...</p>
                                                </CardContent>
                                            </CardActionArea>
                                        </Card>
                                    }
                                    key={index}
                                    selected={selectedLocationMenu}
                                />,
                            ]);
                        }
                        return undefined;
                    });
            }
            if (campaignMonsters) {
                campaignMonsters
                    .slice(0, 10)
                    .map(([id, monster]: [string, IMonster], index: number) => {
                        if (monster) {
                            setMonsters((existing) => [
                                ...existing,
                                <MenuItem
                                    text={
                                        <Card
                                            style={
                                                monster.isPublished === "TRUE"
                                                    ? { margin: "2rem", backgroundColor: OLD_WHITE }
                                                    : {
                                                        margin: "2rem",
                                                        backgroundColor: OLD_WHITE,
                                                        opacity: 0.5,
                                                    }
                                            }
                                            onClick={() => {
                                                dispatch(
                                                    setSelectedMonster({
                                                        id: id,
                                                        monster: monster,
                                                    })
                                                );
                                                history.push(
                                                    `/${selectedCampaign.campaign.slug}/monsters/${monster.slug}`
                                                );
                                            }}
                                        >
                                            <CardActionArea>
                                                <CardHeader
                                                    avatar={
                                                        <Avatar aria-label="recipe">
                                                            {monster.name[0]}
                                                        </Avatar>
                                                    }
                                                    style={{ width: "15rem" }}
                                                    title={monster.name}
                                                />
                                                <CardContent>
                                                    <p>{monster.summary.slice(0, 40)}...</p>
                                                </CardContent>
                                            </CardActionArea>
                                        </Card>
                                    }
                                    key={index}
                                    selected={selectedMonsterMenu}
                                />,

                            ]);
                        }
                        return undefined;
                    })

            }
            if (campaignPlayers) {
                campaignPlayers
                    .slice(0, 10)
                    .map(([id, player]: [string, IPlayer], index: number) => {
                        if (player) {
                            setPlayers((existing) => [
                                ...existing,
                                <MenuItem
                                    text={
                                        <Card
                                            style={
                                                player.isPublished === "TRUE"
                                                    ? { margin: "2rem", backgroundColor: OLD_WHITE }
                                                    : {
                                                        margin: "2rem",
                                                        backgroundColor: OLD_WHITE,
                                                        opacity: 0.5,
                                                    }
                                            }
                                            onClick={() => {
                                                dispatch(
                                                    setSelectedPlayer({
                                                        id: id,
                                                        player: player,
                                                    })
                                                );
                                                history.push(
                                                    `/${selectedCampaign.campaign.slug}/players/${player.slug}`
                                                );
                                            }}
                                        >
                                            <CardActionArea>
                                                <CardHeader
                                                    avatar={
                                                        <Avatar aria-label="recipe">
                                                            {player.name[0]}
                                                        </Avatar>
                                                    }
                                                    style={{ width: "15rem" }}
                                                    title={player.name}
                                                />
                                                <CardContent>
                                                    <p>{player.summary.slice(0, 40)}...</p>
                                                </CardContent>
                                            </CardActionArea>
                                        </Card>
                                    }
                                    key={index}
                                    selected={selectedPlayerMenu}
                                />,

                            ]);
                        }
                        return undefined;
                    })

            }
        }
        return () => {
            setSessions([]);
            setPlayers([]);
            setLocations([])
            setMonsters([]);
        };
    }, [campaignLocations, campaignMonsters, campaignPlayers, campaignSessions, dispatch, history, selectedCampaign, selectedLocationMenu, selectedMonsterMenu, selectedPlayerMenu, selectedSessionMenu]);
    useMemo(() => {
        if (selectedCampaignSlug) {
            let campaignRef = storage
                .ref("Campaigns")
                .child(selectedCampaignSlug);

            // Fetching BackgroundImage
            campaignRef
                .child("TitleImage")
                .getDownloadURL()
                .then((url) => {
                    setCampaignTitleImage(url);
                })
                .catch((e) => console.log("Could not fetch Campaign image"))
        }
    }, [selectedCampaignSlug]);

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
                    <Link to={`/${selectedCampaign?.campaign.slug}/sessions`} style={{ textDecoration: "none" }}>
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
                    <Link to={`/${selectedCampaign?.campaign.slug}/monsters`} style={{ textDecoration: "none" }}>
                        <Button
                            variant="contained"
                            style={{
                                backgroundColor: OLD_WHITE,
                                textTransform: "none",
                                width: "100%",
                            }}
                        >
                            <h3 style={{ textAlign: "end" }}>Monsters</h3>
                        </Button>
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
                    <Link to={`/${selectedCampaign?.campaign.slug}/players`} style={{ textDecoration: "none" }}>
                        <Button
                            variant="contained"
                            style={{
                                backgroundColor: OLD_WHITE,
                                textTransform: "none",
                                width: "100%",
                            }}
                        >
                            <h3 style={{ textAlign: "end" }}>Players</h3>
                        </Button>
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
                    <Link to={`/${selectedCampaign?.campaign.slug}/locations`} style={{ textDecoration: "none" }}>
                        <Button
                            variant="contained"
                            style={{
                                backgroundColor: OLD_WHITE,
                                textTransform: "none",
                                width: "100%",
                            }}
                        >
                            <h3 style={{ textAlign: "end" }}>Locations</h3>
                        </Button>
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
            {isDungeonMaster ?
                <Overview>
                    <Link to={`/${selectedCampaign?.campaign.slug}/edit`} style={{ textDecoration: "none" }}>
                        <Button
                            variant="contained"
                            style={{
                                backgroundColor: OLD_WHITE,
                                textTransform: "none",
                                width: "100%",
                            }}
                        >
                            <h3 style={{ textAlign: "end" }}>Edit Campaign Images</h3>
                        </Button>
                    </Link>

                </Overview>
                : null}

        </Container>
    );
};
const Container = styled.div`
display:grid;
grid-template-columns: 1fr;
align-items: center;
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
