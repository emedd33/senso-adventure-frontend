import React, { FunctionComponent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Scroll from "../../components/Scroll/Scroll";
import { Link, useHistory } from "react-router-dom";
import {
    getSelectedCampaign,
    getSelectedCampaignCharacters,
    getSelectedCampaignLocations,
    getSelectedCampaignSessions,
} from "../../store/selected/selectedSelectors";
import styled from "styled-components";
import {
    setSelectedCharacter,
    setSelectedLocation,
    setSelectedSession,
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
const MenuItem: React.FC<{ text: any; selected: any }> = ({
    text,
    selected,
}) => {
    return <div className={`menu-item ${selected ? "active" : ""}`}>{text}</div>;
};

// All items component
// Important! add unique key
export const Menu = (list: any[], selected: any) =>
    list.map((el) => {
        const { name } = el;

        return <MenuItem text={name} key={name} selected={selected} />;
    });

type CampaignProps = {};
const Campaign: FunctionComponent<CampaignProps> = () => {
    const history = useHistory();

    const dispatch = useDispatch();
    const selectedCampaign = useSelector(getSelectedCampaign);
    const characters = useSelector(getSelectedCampaignCharacters);
    const campaignSessions = useSelector(getSelectedCampaignSessions)
    const campaignLocations = useSelector(getSelectedCampaignLocations)
    const [sessions, setSessions] = useState<any[]>([]);
    const [players, setPlayers] = useState<any[]>([]);
    const [npc, setNpc] = useState<any[]>([]);
    const [locations, setLocations] = useState<any[]>([]);
    const [selectedSessionMenu, setSelectedSessionMenu] = useState("");
    const [selectedPlayerMenu, setSelectedPlayerMenu] = useState("");
    const [selectedNpcMenu, setSelectedNpcMenu] = useState("");
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
                                                    <p>{location.summary}</p>
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
            if (characters) {
                characters
                    .slice(0, 10)
                    .map(([id, character]: [string, ICharacter], index: number) => {
                        if (character) {
                            if (
                                character.isPlayer === "TRUE" &&
                                character.isDead === "FALSE"
                            ) {
                                setPlayers((existing) => [
                                    ...existing,
                                    <MenuItem
                                        text={
                                            <Card
                                                style={
                                                    character.isPublished === "TRUE"
                                                        ? { margin: "2rem", backgroundColor: OLD_WHITE }
                                                        : {
                                                            margin: "2rem",
                                                            backgroundColor: OLD_WHITE,
                                                            opacity: 0.5,
                                                        }
                                                }
                                                onClick={() => {
                                                    dispatch(
                                                        setSelectedCharacter({
                                                            id: id,
                                                            character: character,
                                                        })
                                                    );
                                                    history.push(
                                                        `/${selectedCampaign.campaign.slug}/characters/${character.slug}`
                                                    );
                                                }}
                                            >
                                                <CardActionArea>
                                                    <CardHeader
                                                        avatar={
                                                            <Avatar aria-label="recipe">
                                                                {character.name[0]}
                                                            </Avatar>
                                                        }
                                                        style={{ width: "15rem" }}
                                                        title={character.name}
                                                        subheader={`Level ${character.level}, ${character.race
                                                            },${character.class ? character.class : ""}`}
                                                    />
                                                    <CardContent>
                                                        <p>{character.summary}</p>
                                                    </CardContent>
                                                </CardActionArea>
                                            </Card>
                                        }
                                        key={index}
                                        selected={selectedPlayerMenu}
                                    />,
                                ]);
                            } else {
                                setNpc((existing) => [
                                    ...existing,
                                    <MenuItem
                                        text={
                                            <Card
                                                style={
                                                    character.isPublished === "TRUE"
                                                        ? { margin: "2rem", backgroundColor: OLD_WHITE }
                                                        : {
                                                            margin: "2rem",
                                                            backgroundColor: OLD_WHITE,
                                                            opacity: 0.5,
                                                        }
                                                }
                                                onClick={() => {
                                                    dispatch(
                                                        setSelectedCharacter({
                                                            id: id,
                                                            character: character,
                                                        })
                                                    );
                                                    history.push(
                                                        `/${selectedCampaign.campaign.slug}/characters/${character.slug}`
                                                    );
                                                }}
                                            >
                                                <CardActionArea>
                                                    <CardHeader
                                                        avatar={
                                                            <Avatar aria-label="recipe">
                                                                {character.name[0]}
                                                            </Avatar>
                                                        }
                                                        style={{ width: "15rem" }}
                                                        title={character.name}
                                                        subheader={`${character.race}`}
                                                    />
                                                    <CardContent>
                                                        <p>{character.summary}</p>
                                                    </CardContent>
                                                </CardActionArea>
                                            </Card>
                                        }
                                        key={index}
                                        selected={selectedPlayerMenu}
                                    />,
                                ]);
                            }
                        }
                        return undefined;
                    });
            }
        }
        return () => {
            setSessions([]);
            setPlayers([]);
            setLocations([])
            setNpc([]);
        };
    }, [
        selectedCampaign,
        dispatch,
        history,
        selectedSessionMenu,
        selectedPlayerMenu,
        characters,
        selectedLocationMenu,
        campaignLocations,
        campaignSessions

    ]);
    return (
        <>  {sessions.length > 0 ?
            <Overview>
                <Link to={`/${selectedCampaign?.campaign.slug}/sessions`}>
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
            {players.length > 0 ?
                <Overview>
                    <Link to={`/${selectedCampaign?.campaign.slug}/characters`}>
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
                        menuStyle={{ justifyContent: "center" }}
                        onSelect={(key) => {
                            if (typeof key === "string") {
                                setSelectedPlayerMenu(key);
                            }
                        }}
                    />
                </Overview>
                : null}
            {npc.length > 0 ?
                <Overview>
                    <Link to={`/${selectedCampaign?.campaign.slug}/characters`}>
                        <Button
                            variant="contained"
                            style={{
                                backgroundColor: OLD_WHITE,
                                textTransform: "none",
                                width: "100%",
                            }}
                        >
                            <h3 style={{ textAlign: "end" }}>Npc</h3>
                        </Button>
                    </Link>
                    <ScrollMenu
                        data={npc}
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
                        selected={selectedNpcMenu}
                        wheel={false}
                        onSelect={(key) => {
                            if (typeof key === "string") {
                                setSelectedNpcMenu(key);
                            }
                        }}
                    />
                </Overview>
                : null}
            {locations.length > 0 ?
                <Overview>
                    <Link to={`/${selectedCampaign?.campaign.slug}/locations`}>
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
            <Overview>
                <Link to={`/${selectedCampaign?.campaign.slug}/edit`}>
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

        </>
    );
};
const Overview = styled.div`
  width: 90%;
  margin: 5rem;
  background: ${OLD_WHITE_TRANSPARENT};
  padding: 1rem;
  min-width: 20rem;
`;
export default Campaign;
