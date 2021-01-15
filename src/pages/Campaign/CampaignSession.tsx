import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { OLD_WHITE } from "../../assets/styles/colors";

type CampaignSessionProps = {}
const CampaignSession: FunctionComponent<CampaignSessionProps> = () => {
    // const selectedCampaign = useSelector((state: RootReducerProp) => state.selected.selectedCampaign)
    // const selectedSession = useSelector((state: RootReducerProp) => state.selected.selectedSession)
    const isDungeonMaster = useSelector((state: RootReducerProp) => {
        let username = state.admin.authUser?.username
        if (username) {
            return state.campaigns.curseOfStrahd.dungeonMaster === username
        }
        return false
    })
    console.log(isDungeonMaster)

    return (<>
        <Container>

        </Container>
    </>
    )
}
const Container = styled.div`
min-height:100rem;
min-width:40rem;
background-color: ${OLD_WHITE}
`
export default CampaignSession