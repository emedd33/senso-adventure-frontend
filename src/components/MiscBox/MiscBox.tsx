import { Button, IconButton, Tooltip } from "@material-ui/core";
import React, { useState } from "react";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import LevelUp from "../../assets/icons/level_up.png";
import CampaignCrest from "../../assets/icons/CampaignCrest.png";
import Victory from "../../assets/icons/victory.png";
import "./MiscBox.scss";
import { OLD_WHITE } from "../../assets/constants/Constants";
import styled from "styled-components";
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";
import levelUpSound from "../../assets/audio/ding.mp3";
import victorySound from "../../assets/audio/victory_short.mp3";
import { useDispatch, useSelector } from "react-redux";
import {
  dispatchLevelUpCharacters,
  fetchFromFirebase,
} from "../../store/campaign/campaignCreators";
import { dispatchSetSelectedSession } from "../../store/selected/selectedCreators";
import { useHistory } from "react-router-dom";

export interface MiscBoxProps { }

const MiscBox: React.FC<MiscBoxProps> = () => {
  const history = useHistory()
  const [clicked, setClicked] = useState(false);
  const dispatch = useDispatch();
  const [isLevelUpDialogOpen, setIsLevelUpDialogOpen] = useState(false);
  const [isCongratulationOpen, setIsCongratulationOpen] = useState(false);
  const selectedCampaign = useSelector(
    (state: RootReducerProp) => state.selected.selectedCampaign
  );
  const [levelUpAudio] = useState(new Audio(levelUpSound));
  const [victoryAudio] = useState(new Audio(victorySound));

  const levelUpCharacters = () => {
    levelUpAudio.play();
    setIsLevelUpDialogOpen(false);
    setIsCongratulationOpen(true);
    dispatch(dispatchLevelUpCharacters(selectedCampaign));
    setClicked(false);
    dispatch(fetchFromFirebase);
  };
  return (
    <Container className={clicked ? "misc-container active" : "misc-container"}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Tooltip title="Misc box" aria-label="add">
          <Button
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
            onClick={() => setClicked(!clicked)}
          >
            <p
              style={{ fontFamily: "italianno", fontSize: "1.5rem", margin: 0 }}
            >
              {clicked ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
            </p>
          </Button>
        </Tooltip>
      </div>
      {clicked ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Tooltip title="New Session" aria-label="add">
            <IconButton
              color="primary"
              style={{ width: "3rem", height: "3rem" }}
              onClick={() => {
                dispatch(
                  dispatchSetSelectedSession({
                    id: "",
                    session: {
                      title: "",
                      subTitle: "",
                      story: "",
                      sessionDay: selectedCampaign.campaign.sessions ? Object.values(selectedCampaign.campaign.sessions).length + 1 : 1,
                      date: new Date().toDateString(),
                      campaign: selectedCampaign ? selectedCampaign.id : "",
                    },
                  })
                );
                setClicked(false);
                history.push("/campaign/session/edit");
              }}
            >
              <img
                src={CampaignCrest}
                alt={"New session"}
                style={{ width: "4rem", height: "3rem" }}
              />

            </IconButton>
          </Tooltip>

          <Tooltip title="Level up" aria-label="add">
            <IconButton onClick={() => setIsLevelUpDialogOpen(true)}>
              <img
                src={LevelUp}
                alt={"Level up"}
                style={{ width: "3rem", height: "3rem" }}
              />
            </IconButton>
          </Tooltip>
          <ConfirmDialog
            title={"Level up the characters?"}
            content={"Confirm to level up all your characters"}
            handleConfirm={levelUpCharacters}
            open={isLevelUpDialogOpen}
            handleClose={() => setIsLevelUpDialogOpen(false)}
            isActionsAvailable={true}
            confetti={false}
          />
          <Tooltip title="Victory" aria-label="add">
            <IconButton
              onClick={async () => {
                victoryAudio.play();
              }}
            >
              <img
                src={Victory}
                alt={"Level up"}
                style={{ width: "4rem", height: "3rem" }}
              />
            </IconButton>
          </Tooltip>

        </div>

      ) : null}
      <ConfirmDialog
        title={"Congratulation your characters have leveled up!"}
        content={"Characters level"}
        handleConfirm={() => setIsCongratulationOpen(false)}
        open={isCongratulationOpen}
        handleClose={() => setIsCongratulationOpen(false)}
        isActionsAvailable={false}
        confetti={true}
      />
    </Container>
  );
};

const Container = styled.div`
  background-color: ${OLD_WHITE};
`;
export default MiscBox;
