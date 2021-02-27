import React, { FunctionComponent } from "react";
import { useSelector, useDispatch } from "react-redux";
import Scroll from "../../components/Scroll/Scroll";
import { useHistory } from "react-router-dom";
import { getUniqueNpc, getPlayerCharacters, getSelectedCampaign } from "../../store/selected/selectedSelectors";
import styled from "styled-components";
import { OLD_WHITE } from "../../assets/constants/Constants";
import { Link } from "react-router-dom";
import { setSelectedSession } from "../../store/selected/selectedCreators";

type CampaignProps = {};
const Campaign: FunctionComponent<CampaignProps> = () => {
    const history = useHistory();
    const dispatch = useDispatch()
    const selectedCampaign = useSelector(getSelectedCampaign);
    const playerCharacters = useSelector(getPlayerCharacters)
    const npcs = useSelector(getUniqueNpc)

    return (
        <>
            <Overview >
                <h2>players</h2>
                {playerCharacters.map((player: { id: string, character: ICharacter }) => <h2>{player.character.name}</h2>)}
                <h2>npc</h2>
                {npcs.map((npc: { id: string, character: ICharacter }) => <div><Link to={`/${selectedCampaign!.campaign.slug}/characters/${npc.character.slug}`} >{npc.character.name} </Link></div>)}


            </Overview>
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
width:70%;
height:20rem;
padding:1rem;
min-width:20rem;
background-color: ${OLD_WHITE}
`
export default Campaign;
