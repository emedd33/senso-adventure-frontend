import React, { FunctionComponent, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Scroll from "../../components/Scroll/Scroll";
import { Link, useHistory } from "react-router-dom";
import { getUniqueNpc, getPlayerCharacters, getSelectedCampaign, getSelectedCampaignCharacters } from "../../store/selected/selectedSelectors";
import styled from "styled-components";
import { setSelectedCharacter, setSelectedSession } from "../../store/selected/selectedCreators";
import { OLD_WHITE_TRANSPARENT, OLD_WHITE } from "../../assets/constants/Constants";
import { Button } from "@material-ui/core";

type CampaignCharactersProps = {};
const CampaignCharacters: FunctionComponent<CampaignCharactersProps> = () => {
    const history = useHistory();

    const characters = useSelector(getSelectedCampaignCharacters)

    return (
        <>
            <Container >
                {characters ? Object.entries(characters).map(([id, character]: [string, ICharacter,]) => (

                    <Button>
                        <h1>{character.name}</h1>
                    </Button>
                )
                )
                    : null}


            </Container>

        </>
    );
};
const Container = styled.div`
width: 70%;
padding: 1rem;
-webkit-box-shadow: 5px 5px 15px 5px #000000;
box-shadow: 5px 0px 15px 2px #000000;
background-color: ${OLD_WHITE};
display: grid;
grid-template-columns:1fr
min-height:20rem;
`;
export default CampaignCharacters;
