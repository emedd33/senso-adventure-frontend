import React, { FunctionComponent, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Scroll from "../../../components/Scroll/Scroll";
import { Link, useHistory } from "react-router-dom";

import {
    getSelectedCampaign,
    getSelectedCampaignMonsters,
    getSelectedCampaignLocations,
    getSelectedCampaignSessions,
    getSelectedCampaignPlayers,
    isDungeonMasterSelector,
} from "../../../store/selected/selectedSelectors";
import styled from "styled-components";
import {
    setSelectedMonster,
    setSelectedLocation,
    setSelectedSession,
    setSelectedPlayer,
} from "../../../store/selected/selectedCreators";
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
import { getUrlFromStorage } from "../../../services/Firebase/storage";
import useOwner from "../../../store/hooks/useOwner";
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
    const owner = useOwner()
    const isDungeonMaster = useSelector(isDungeonMasterSelector)
    const selectedCampaign = useSelector(getSelectedCampaign);
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
    useMemo(() => {
        if (campaignSessions && selectedCampaign) {
            campaignSessions
                .slice(0, 10)
                .map(([id, session]: [string, ISession], index: number) => {
                    if (session) {
                        setSessions((existing) => [
                            ...existing,
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
                                            dispatch(
                                                setSelectedSession({ id: id, session: session })
                                            );
                                            history.push(
                                                `/users/${owner}/${selectedCampaign.campaign.slug}/sessions/${session.slug}`
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
        return () => {
            setSessions([])
        }
    }, [selectedCampaign, campaignSessions, selectedSessionMenu, dispatch, history, owner])
    useMemo(() => {
        if (campaignLocations && selectedCampaign) {
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
                                                `/user/${owner}/${selectedCampaign.campaign.slug}/locations/${location.slug}`
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
                    return () => {
                        setLocations([])
                    };
                });
        }
    }, [selectedCampaign, campaignLocations, selectedLocationMenu, dispatch, history, owner])
    useMemo(() => {
        if (campaignMonsters && selectedCampaign) {
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
                                                `/user/${owner}/${selectedCampaign.campaign.slug}/monsters/${monster.slug}`
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
        return () => {
            setMonsters([])
        }
    }, [selectedCampaign, selectedMonsterMenu, campaignMonsters, dispatch, history, owner])
    useMemo(() => {
        if (campaignPlayers && selectedCampaign) {
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
                                                `/user/${owner}/${selectedCampaign.campaign.slug}/players/${player.slug}`
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
                    return () => {
                        setPlayers([])
                    };
                })

        }
    }, [selectedCampaign, campaignPlayers, selectedPlayerMenu, dispatch, history, owner])
    useMemo(() => {
        if (selectedCampaign) {
            getUrlFromStorage(`users/${owner}/campaigns/${selectedCampaign.campaign.slug}/TitleImage`)
                .then((url) => {
                    setCampaignTitleImage(url);
                })
                .catch((e) => console.log("Could not fetch Campaign image"))
        }
    }, [owner, selectedCampaign]);

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
                    <Link to={`/${selectedCampaign?.campaign.slug}/players`} style={{ textDecoration: "none" }}>
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
                    <Link to={`/${selectedCampaign?.campaign.slug}/locations`} style={{ textDecoration: "none" }}>
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

                    <Link to={`/${selectedCampaign?.campaign.slug}/edit`} style={{ textDecoration: "none" }}>
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
