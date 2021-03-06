import { Button, TextField } from "@material-ui/core";
import React, { FunctionComponent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { NEW_CHARACTER, OLD_WHITE } from "../../assets/constants/Constants";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {
    getSelectedCampaign,
    getSelectedCampaignDatabaseRef,
} from "../../store/selected/selectedSelectors";
import { setSelectedCharacter } from "../../store/selected/selectedCreators";
import { useHistory } from "react-router-dom";

type CampaignCharacterNewProps = {};
const CampaignCharacterNew: FunctionComponent<CampaignCharacterNewProps> = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [characterName, setCharacterName] = useState("");
    const [playerName, setPlayerName] = useState("");
    const selectedCampaign = useSelector(getSelectedCampaign);
    const [characterNameError, setCharacterNameError] = useState(false);
    const [characterType, setCharacterType] = useState("npc");
    const campaignRef = useSelector(getSelectedCampaignDatabaseRef);
    const submitCharacter = () => {
        if (!characterName) {
            setCharacterNameError(true);
            return;
        }
        if (campaignRef) {
            let isPlayer = characterType === "player" ? "TRUE" : "FALSE";

            let newCharacter: ICharacter = {
                ...NEW_CHARACTER,
                name: characterName,
                slug: characterName.replace(/\s/g, ""),
                isPlayer: isPlayer
            }
            if (isPlayer) {
                newCharacter.playerName = playerName;
                newCharacter.level = 1;
            } else {
                newCharacter.challengeRating = "1";
            }
            setCharacterNameError(false);
            campaignRef
                .child("characters")
                .push(newCharacter)
                .then((snapshot) => {
                    let characterId = snapshot.key;
                    if (characterId) {
                        dispatch(
                            setSelectedCharacter({ id: characterId, character: newCharacter })
                        );
                        history.push(
                            `/${selectedCampaign!.campaign.slug}/characters/${newCharacter.slug
                            }`
                        );
                    }
                });
        }
    };
    return (
        <TitleContainer>
            <TextField
                id="outlined-multiline-static"
                placeholder="Write a fitting name for the character"
                variant="filled"
                error={characterNameError}
                value={characterName}
                disabled={false}
                style={{ width: "90%", margin: "1rem" }}
                label="Character Name"
                onChange={(event) => setCharacterName(event.target.value)}
            />

            <RadioGroup
                aria-label="characterType"
                name="characterType"
                value={characterType}
                style={{ display: "flex", flexDirection: "row" }}
                onChange={(event) => setCharacterType(event.target.value)}
            >
                <FormControlLabel value="player" control={<Radio />} label="Player" />
                <FormControlLabel value="npc" control={<Radio />} label="Npc" />
            </RadioGroup>
            {characterType === "player" ? (
                <TextField
                    id="outlined-number"
                    label="Player Name"
                    value={playerName}
                    onKeyDown={(e) => (e.key === "Enter" ? submitCharacter() : null)}
                    placeholder="Name of the person playing this character?"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    style={{ width: "90%", margin: "1rem" }}
                    onChange={(event) => setPlayerName(event.target.value)}
                />
            ) : null}

            <Button
                style={{ margin: "2rem" }}
                variant="contained"
                color="primary"
                onClick={() => submitCharacter()}
            >
                Submit
      </Button>
        </TitleContainer>
    );
};

const TitleContainer = styled.div`
  background-color: ${OLD_WHITE};
  width: 50%;
  min-width: 15rem;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  webkit-box-shadow: 7px 7px 5px 0px rgba(50, 50, 50, 0.75);
  moz-box-shadow: 7px 7px 5px 0px rgba(50, 50, 50, 0.75);
  box-shadow: 7px 7px 5px 0px rgba(50, 50, 50, 0.75);
`;
export default CampaignCharacterNew;
