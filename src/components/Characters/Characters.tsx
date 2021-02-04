import styled from "styled-components";
import OldFrame from "../../assets/backgroundImage/old_sign.png";
import * as FaIcons from "react-icons/fa";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import EditIcon from "@material-ui/icons/Edit";
import React, { useState } from "react";
import PlayerModal from "../PlayerModal/PlayerModal";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { dispatchSetSelectedPlayer } from "../../store/selected/selectedCreators";
import IsLoading from "../IsLoading/IsLoading";
import { isDungeonMasterSelector } from "../../store/campaign/campaignSelectors";

export interface CharactersProps {}

const Characters: React.FC<CharactersProps> = () => {
  const [isEditPlayerOpen, setIsEditPlayerOpen] = useState(false);
  const dispatch = useDispatch();
  const campaign = useSelector(
    (state: RootReducerProp) => state.selected.selectedCampaign
  );
  const isDungeonMaster = useSelector(isDungeonMasterSelector);
  const dungeonMaster = useSelector(
    (state: RootReducerProp) =>
      state.selected.selectedCampaign.campaign.dungeonMaster
  );
  const handleNewPlayer = () => {
    dispatch(
      dispatchSetSelectedPlayer({
        isNew: true,
        player: {
          playerName: "New player",
          characterName: "",
          race: "",
          class: "",
          level: 1,
          isDead: "FALSE",
        },
      })
    );
    setIsEditPlayerOpen(true);
  };

  const renderPlayers = () => {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <table style={{ width: "100%" }}>
          <thead>
            <tr style={{ textAlign: "center" }}>
              {isEditPlayerOpen ? (
                <PlayerModal onClose={setIsEditPlayerOpen} />
              ) : null}
            </tr>
            <tr style={{ textAlign: "center" }}>
              <th></th>
              <th>Player</th>
              <th>Character</th>
              <th>Race</th>
              <th>Class</th>
              <th>Level</th>
            </tr>
          </thead>
          <tbody>
            {campaign && campaign.campaign.players
              ? Object.keys(campaign.campaign.players).map(
                  (key: any, index: number) => {
                    return (
                      <tr id={index + "row"} style={{ textAlign: "center" }}>
                        <td id={index + "dead"} style={{ textAlign: "center" }}>
                          {campaign!.campaign.players[key].isDead === "TRUE" ? (
                            <FaIcons.FaSkullCrossbones />
                          ) : null}
                        </td>
                        <td id={index + "playerName"}>
                          {campaign!.campaign.players[key].isDead === "TRUE" ? (
                            <s>{campaign!.campaign.players[key].playerName}</s>
                          ) : (
                            campaign!.campaign.players[key].playerName
                          )}
                        </td>
                        <td id={index + "characterName"}>
                          {campaign!.campaign.players[key].isDead === "TRUE" ? (
                            <s>
                              {campaign!.campaign.players[key].characterName}
                            </s>
                          ) : (
                            campaign!.campaign.players[key].characterName
                          )}
                        </td>
                        <td id={index + "race"}>
                          {campaign!.campaign.players[key].isDead === "TRUE" ? (
                            <s>{campaign!.campaign.players[key].race}</s>
                          ) : (
                            campaign!.campaign.players[key].race
                          )}
                        </td>
                        <td id={index + "class"}>
                          {campaign!.campaign.players[key].isDead === "TRUE" ? (
                            <s>{campaign!.campaign.players[key].class}</s>
                          ) : (
                            campaign!.campaign.players[key].class
                          )}
                        </td>
                        <td id={index + "level"}>
                          {campaign!.campaign.players[key].isDead === "TRUE" ? (
                            <s>{campaign!.campaign.players[key].level}</s>
                          ) : (
                            campaign!.campaign.players[key].level
                          )}
                        </td>
                        <td id={index + "edit"}>
                          {" "}
                          {isDungeonMaster ? (
                            <Button
                              color="primary"
                              onClick={() => {
                                dispatch(
                                  dispatchSetSelectedPlayer({
                                    id: key,
                                    isNew: false,
                                    player: {
                                      playerName: campaign!.campaign.players[
                                        key
                                      ].playerName,
                                      characterName: campaign!.campaign.players[
                                        key
                                      ].characterName,
                                      race: campaign!.campaign.players[key]
                                        .race,
                                      class: campaign!.campaign.players[key]
                                        .class,
                                      level: campaign!.campaign.players[key]
                                        .level,
                                      isDead: campaign!.campaign.players[key]
                                        .isDead,
                                    },
                                  })
                                );
                                setIsEditPlayerOpen(true);
                              }}
                            >
                              <EditIcon />
                            </Button>
                          ) : null}
                        </td>
                      </tr>
                    );
                  }
                )
              : null}
          </tbody>
        </table>
      </div>
    );
  };
  if (!campaign) {
    return <IsLoading />;
  }
  return (
    <CharacterConatiner>
      <div
        style={{
          height: "20rem",
          zIndex: 200,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <h2 style={{ textAlign: "center", flex: 1 }}>
          Dungeon master: {dungeonMaster}
        </h2>
        <div style={{ flex: 10, textAlign: "center" }}>
          {isDungeonMaster ? (
            <Button color="primary" onClick={handleNewPlayer}>
              <PersonAddIcon />
            </Button>
          ) : null}
          {renderPlayers()}
        </div>
      </div>
    </CharacterConatiner>
  );
};

const CharacterConatiner = styled.div`
width: 60%;  
min-height:10rem;
padding:11%;
background-image: url(${OldFrame});
background-repeat: no-repeat;
background-size: 100% 100%;
margin: 5rem; 
min-width:15rem;
padding
margin-top: 10rem;
z-index: 300; 
`;
export default Characters;
