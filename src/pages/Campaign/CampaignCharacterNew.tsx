import { Button, TextField } from "@material-ui/core";
import React, { FunctionComponent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { OLD_WHITE } from "../../assets/constants/Constants";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { getSelectedCampaign, getSelectedCampaignDatabaseRef } from "../../store/selected/selectedSelectors";
import { setSelectedCharacter } from "../../store/selected/selectedCreators";
import { useHistory } from "react-router-dom";

type CampaignCharacterNewProps = {};
const CampaignCharacterNew: FunctionComponent<CampaignCharacterNewProps> = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [characterName, setCharacterName] = useState("")
    const selectedCampaign = useSelector(getSelectedCampaign)
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
                summary: "A short summary",
                slug: characterName.replace(/\s/g, ''),
                race: "Human",
                isPlayer: isPlayer,
                alignment: "True neutral",
                isUnique: "TRUE",
                languages: ["Common"],
                isDead: "FALSE",
                actions: [{ name: "bite", description: "A fowerful bite", tags: ["nom nom"] }],
                stats: {
                    armorClass: 12,
                    speed: 30,
                    hitPoints: 10,
                    proficiency: 2,
                    passivePerception: 10,
                    strength: 10,
                    dexterity: 10,
                    wisdom: 10,
                    constitution: 10,
                    intelligence: 10,
                    charisma: 10,
                    savingThrows: {
                        strength: { value: 0, proficient: "FALSE" },
                        dexterity: { value: 0, proficient: "FALSE" },
                        wisdom: { value: 0, proficient: "FALSE" },
                        constitution: { value: 0, proficient: "FALSE" },
                        intelligence: { value: 0, proficient: "FALSE" },
                        charisma: { value: 0, proficient: "FALSE" }
                    },
                    skills: {
                        athletics: { value: 0, proficient: "FALSE" },
                        acrobatics: { value: 0, proficient: "FALSE" },
                        sleightOfHand: { value: 0, proficient: "FALSE" },
                        stealth: { value: 0, proficient: "FALSE" },
                        arcana: { value: 0, proficient: "FALSE" },
                        history: { value: 0, proficient: "FALSE" },
                        investigation: { value: 0, proficient: "FALSE" },
                        nature: { value: 0, proficient: "FALSE" },
                        religion: { value: 0, proficient: "FALSE" },
                        animalHandling: { value: 0, proficient: "FALSE" },
                        insight: { value: 0, proficient: "FALSE" },
                        medicine: { value: 0, proficient: "FALSE" },
                        perception: { value: 0, proficient: "FALSE" },
                        survival: { value: 0, proficient: "FALSE" },
                        deception: { value: 0, proficient: "FALSE" },
                        intimidation: { value: 0, proficient: "FALSE" },
                        performance: { value: 0, proficient: "FALSE" },
                        persuasion: { value: 0, proficient: "FALSE" }
                    }
                }
            }

            setCharacterNameError(false)
            campaignRef.child("characters").push(newCharacter).then((snapshot) => {
                let characterId = snapshot.key
                if (characterId) {
                    history.push(`/${selectedCampaign!.campaign.slug}/characters/${newCharacter.slug}`)
                    dispatch(setSelectedCharacter({ id: characterId, character: newCharacter }))
                }
            })
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
