import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import Scroll from "../../components/Scroll/Scroll";
import { useHistory } from "react-router-dom";
import { getNpc, getPlayerCharacter, getSelectedCampaign } from "../../store/selected/selectedSelectors";
import styled from "styled-components";
import { OLD_WHITE } from "../../assets/constants/Constants";

type CampaignProps = {};
const Campaign: FunctionComponent<CampaignProps> = () => {
    const history = useHistory();
    const selectedCampaign = useSelector(getSelectedCampaign);
    const playerCharacters = useSelector(getPlayerCharacter)
    const npcs = useSelector(getNpc)
    return (
        <>
            <Overview >
                <h2>players</h2>
                {playerCharacters.map((player: ICharacter) => <h2>{player.name}</h2>)}
                <h2>npc</h2>
                {npcs.map((npc: ICharacter) => <h2>{npc.name}</h2>)}


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
