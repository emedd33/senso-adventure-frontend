import { Button, TextField } from "@material-ui/core";
import React, { FunctionComponent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { NEW_MONSTER, OLD_WHITE } from "../../../assets/constants/Constants";
import {
    getSelectedCampaign,
    getSelectedCampaignDatabaseRef,
} from "../../../store/selected/selectedSelectors";
import { setSelectedMonster } from "../../../store/selected/selectedCreators";
import { useHistory } from "react-router-dom";

type CampaignMonsterNewProps = {};
const CampaignMonsterNew: FunctionComponent<CampaignMonsterNewProps> = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [monsterName, setMonsterName] = useState("");
    const selectedCampaign = useSelector(getSelectedCampaign);
    const [monsterNameError, setMonsterNameError] = useState(false);
    const campaignRef = useSelector(getSelectedCampaignDatabaseRef);
    useEffect(() => {
        dispatch(setSelectedMonster({ id: "", monster: NEW_MONSTER }))
    }, [dispatch])
    const submitMonster = () => {
        if (!monsterName) {
            setMonsterNameError(true);
            return;
        }
        if (campaignRef) {

            let newMonster: IMonster = {
                ...NEW_MONSTER,
                name: monsterName,
                slug: monsterName.replace(/\s/g, ""),
            }

            newMonster.challengeRating = "1";
            setMonsterNameError(false);
            campaignRef
                .child("characters")
                .push(newMonster)
                .then((snapshot) => {
                    let characterId = snapshot.key;
                    if (characterId) {
                        dispatch(
                            setSelectedMonster({ id: characterId, monster: newMonster })
                        );
                        history.push(
                            `/${selectedCampaign!.campaign.slug}/monsters/${newMonster.slug
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
                placeholder="Write a fitting name for the monster"
                variant="filled"
                error={monsterNameError}
                value={monsterName}
                disabled={false}
                style={{ width: "90%", margin: "1rem" }}
                label="Monster Name"
                onChange={(event) => setMonsterName(event.target.value)}
            />

            <Button
                style={{ margin: "2rem" }}
                variant="contained"
                color="primary"
                onClick={() => submitMonster()}
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
export default CampaignMonsterNew;
