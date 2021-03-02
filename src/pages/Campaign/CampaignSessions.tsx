import React, { FunctionComponent, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Scroll from "../../components/Scroll/Scroll";
import { Link, useHistory } from "react-router-dom";
import { getUniqueNpc, getPlayerCharacters, getSelectedCampaign } from "../../store/selected/selectedSelectors";
import styled from "styled-components";
import { setSelectedCharacter, setSelectedSession } from "../../store/selected/selectedCreators";
import { OLD_WHITE_TRANSPARENT, OLD_WHITE } from "../../assets/constants/Constants";

type CampaignSessionsProps = {};
const CampaignSessions: FunctionComponent<CampaignSessionsProps> = () => {
    const history = useHistory();

    const selectedCampaign = useSelector(getSelectedCampaign);

    return (
        <>
            <Overview >



            </Overview>

        </>
    );
};
const Overview = styled.div`
width:90%;
margin:5rem;
background:${OLD_WHITE_TRANSPARENT};
padding:1rem;
min-width:20rem;
`
export default CampaignSessions;
