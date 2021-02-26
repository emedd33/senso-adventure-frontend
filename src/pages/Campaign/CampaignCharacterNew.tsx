import { Button, TextField } from "@material-ui/core";
import React, { FunctionComponent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { OLD_WHITE } from "../../assets/constants/Constants";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { getSelectedCampaignDatabaseRef } from "../../store/selected/selectedSelectors";
import { setSelectedCharacter } from "../../store/selected/selectedCreators";

type CampaignCharacterNewProps = {};
const CampaignCharacterNew: FunctionComponent<CampaignCharacterNewProps> = () => {
    const dispatch = useDispatch()
    const [characterName, setCharacterName] = useState("")
    const [characterNameError, setCharacterNameError] = useState(false)
    const [characterType, setCharacterType] = useState("npc")
    const campaignRef = useSelector(getSelectedCampaignDatabaseRef)
    const submitCharacter = () => {

        if (!characterName) {
            setCharacterNameError(true)
            return
        }
        if (campaignRef) {
            let isPlayer = characterType === "player" ? "TRUE" : "FALSE"

            let newCharacter: ICharacter = {
                name: characterName,
                race: "human",
                isPlayer: isPlayer,
                alignment: "True neutral",
                isUnique: "TRUE",
                languages: ["Common"],
                isDead: "FALSE",
                stats: {
                    armorClass: "12",
                    speed: "30",
                    hitPoints: "10",
                    proficiency: "+2",
                    strength: 10,
                    dexterity: 10,
                    wisdom: 10,
                    constitution: 10,
                    intelligence: 10,
                    charisma: 10,
                    savingThrows: {
                        strength: 0,
                        dexterity: 0,
                        wisdom: 0,
                        constitution: 0,
                        intelligence: 0,
                        charisma: 0,
                    }
                }
            }

            setCharacterNameError(false)
            campaignRef.child("characters").push(newCharacter).then(() => dispatch(setSelectedCharacter))
        }
    }
    return (
        <Container>
            <form noValidate autoComplete="off">
                <TextField id="outlined-basic" label="Character name" variant="outlined" onChange={(event) => setCharacterName(event.target.value)} error={characterNameError} />
                <RadioGroup aria-label="characterType" name="characterType" value={characterType} onChange={(event) => setCharacterType(event.target.value)}>
                    <FormControlLabel value="player" control={<Radio />} label="Player" />
                    <FormControlLabel value="npc" control={<Radio />} label="Npc" />
                </RadioGroup>
                <Button onClick={() => submitCharacter()}>
                    Submit
                </Button>
            </form>
        </Container>
    );
}

const Container = styled.div`
  min-height: 20rem;
  min-width: 15rem;
  width: 50%;
  padding: 1rem;
  -webkit-box-shadow: 5px 5px 15px 5px #000000;
  box-shadow: 5px 0px 15px 2px #000000;
  background-color: ${OLD_WHITE};
`;
export default CampaignCharacterNew;
