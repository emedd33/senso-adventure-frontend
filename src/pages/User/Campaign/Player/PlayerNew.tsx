import { Button, TextField } from "@material-ui/core";
import { FunctionComponent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { NEW_PLAYER, OLD_WHITE } from "../../../../assets/constants/Constants";
import {
    getSelectedCampaign, getSelectedCampaignDatabasePath,
} from "../../../../store/selected/selectedSelectors";
import { setSelectedPlayer } from "../../../../store/selected/selectedCreators";
import { useHistory } from "react-router-dom";
import useOwner from "../../../../store/hooks/useOwner";
import { database } from "../../../../services/Firebase/firebase";

type PlayerNewProps = {};
const PlayerNew: FunctionComponent<PlayerNewProps> = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [playerName, setPlayerName] = useState("");
    const owner = useOwner()
    const [characterName, setCharacterName] = useState("");
    const selectedCampaign = useSelector(getSelectedCampaign);
    const [characterNameError, setCharacterNameError] = useState(false);
    const selectedCampaignDatabasePath = useSelector(getSelectedCampaignDatabasePath)
    useEffect(() => {
        dispatch(setSelectedPlayer({ id: "", player: NEW_PLAYER }))
    }, [dispatch])
    const submitPlayer = () => {
        if (!characterName) {
            setCharacterNameError(true);
            return;
        }
        if (selectedCampaignDatabasePath) {

            let newPlayer: IPlayer = {
                ...NEW_PLAYER,
                name: characterName,
                playerName: playerName,
                slug: characterName.replace(/\s/g, ""),
            }

            setCharacterNameError(false);
            database.ref(`${selectedCampaignDatabasePath}/players`)
                .push(newPlayer)
                .then((snapshot: { key: any; }) => {
                    let playerId = snapshot.key;
                    if (playerId) {
                        dispatch(
                            setSelectedPlayer({ id: playerId, player: newPlayer })
                        );
                        history.push(
                            `/user/${owner}/campaigns/${selectedCampaign!.campaign.slug}/players/${newPlayer.slug}`
                        );
                    }
                });
        }
    };
    return (
        <TitleContainer>
            <TextField
                id="outlined-multiline-static"
                placeholder="Write a fitting character name"
                variant="filled"
                error={characterNameError}
                value={characterName}
                disabled={false}
                style={{ width: "90%", margin: "1rem" }}
                label="Character Name"
                onChange={(event) => setCharacterName(event.target.value)}
            />

            <TextField
                id="outlined-number"
                label="Player Name"
                value={playerName}
                onKeyDown={(e) => (e.key === "Enter" ? submitPlayer() : null)}
                placeholder="Name of the person playing this player?"
                InputLabelProps={{
                    shrink: true,
                }}
                style={{ width: "90%", margin: "1rem" }}
                onChange={(event) => setPlayerName(event.target.value)}
            />

            <Button
                style={{ margin: "2rem" }}
                variant="contained"
                color="primary"
                onClick={() => submitPlayer()}
            >
                Submit
      </Button>
        </TitleContainer>
    )
};

const TitleContainer = styled.div`
  background-color: ${OLD_WHITE};
  width: 50%;
  min-width: 15rem;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  webkit-box-shadow: 7px 7px 5px 0px rgba(50, 50, 50, 0.75);
  moz-box-shadow: 7px 7px 5px 0px rgba(50, 50, 50, 0.75);
  box-shadow: 7px 7px 5px 0px rgba(50, 50, 50, 0.75);
`;
export default PlayerNew;
