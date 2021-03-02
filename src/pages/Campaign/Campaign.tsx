import React, { FunctionComponent, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Scroll from "../../components/Scroll/Scroll";
import { useHistory } from "react-router-dom";
import { getUniqueNpc, getPlayerCharacters, getSelectedCampaign } from "../../store/selected/selectedSelectors";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { setSelectedSession } from "../../store/selected/selectedCreators";
import { OLD_WHITE_TRANSPARENT, OLD_WHITE } from "../../assets/constants/Constants";
import { IconButton } from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ScrollMenu from 'react-horizontal-scrolling-menu';
const MenuItem: React.FC<{ text: any, selected: any }> = ({ text, selected }) => {
    return <div
        className={`menu-item ${selected ? 'active' : ''}`}
    >{text}</div>;
};

// All items component
// Important! add unique key
export const Menu = (list: any[], selected: any) =>
    list.map(el => {
        const { name } = el;

        return <MenuItem text={name} key={name} selected={selected} />;
    });






const initSelected = 'item1';

type CampaignProps = {};
const Campaign: FunctionComponent<CampaignProps> = () => {
    const history = useHistory();

    const selectedCampaign = useSelector(getSelectedCampaign);
    const playerCharacters = useSelector(getPlayerCharacters)
    const npcs = useSelector(getUniqueNpc)
    const [sessions, setSessions] = useState<any[]>([])
    const dispatch = useDispatch()
    const [selected, setSelected] = useState(initSelected)
    useEffect(() => {
        if (selectedCampaign && selectedCampaign.campaign.sessions) {
            Object.entries(selectedCampaign.campaign.sessions).slice(0, 10).map(
                ([id, session], index) => {
                    if (session) {
                        setSessions((existing) => [...existing, <MenuItem text={
                            <Scroll
                                id={id}
                                title={session.title}
                                subTitle={session.subTitle ? session.subTitle : ""}
                                date={session.date}
                                campaignTitle={session.campaignTitle}
                                sessionDay={session.sessionDay}
                                onClick={() => {
                                    dispatch(setSelectedSession({ id: id, session: session }))
                                    history.push(`/${selectedCampaign.campaign.slug}/sessions/${session.slug}`);
                                }}
                            />
                        } key={index} selected={selected} />])
                    }
                    return undefined
                })


        }
        return () => { setSessions([]) }
    }, [selectedCampaign, dispatch, history, selected])
    console.log("sessions", sessions)
    return (
        <>
            <Overview >
                <ScrollMenu
                    data={sessions}
                    arrowLeft={<IconButton style={{ backgroundColor: OLD_WHITE }}><ArrowBackIcon /></IconButton>}
                    arrowRight={<IconButton style={{ backgroundColor: OLD_WHITE }}><ArrowForwardIcon /></IconButton>}
                    selected={selected}
                    wheel={false}
                    onSelect={(key) => {
                        if (typeof key === "string") {
                            setSelected(key)
                        }
                    }}
                />



            </Overview>
            <h2>players</h2>
            {playerCharacters.map((player: { id: string, character: ICharacter }) => <h2>{player.character.name}</h2>)}
            <h2>npc</h2>
            {npcs.map((npc: { id: string, character: ICharacter }) => <div><Link to={`/${selectedCampaign!.campaign.slug}/characters/${npc.character.slug}`} >{npc.character.name} </Link></div>)}
            <div style={{ width: "50%", minWidth: "20rem" }}>
                {selectedCampaign && selectedCampaign.campaign.sessions ?
                    Object.entries(selectedCampaign.campaign.sessions).map(
                        ([id, session],) => {
                            return (
                                <Scroll
                                    id={id}
                                    title={session.title}
                                    subTitle={session.subTitle ? session.subTitle : ""}
                                    date={session.date}
                                    campaignTitle={session.campaignTitle}
                                    sessionDay={session.sessionDay}
                                    onClick={() => {
                                        dispatch(setSelectedSession({ id: id, session: session }))
                                        history.push(`/${selectedCampaign.campaign.slug}/sessions/${session.slug}`);
                                    }}
                                />
                            );
                        }
                    ) :
                    null}
            </div>
        </>
    );
};
const Overview = styled.div`
width:90%;
background:${OLD_WHITE_TRANSPARENT};
padding:1rem;
min-width:20rem;
`
export default Campaign;
