import styled from "styled-components";
import OldFrame from "../../assets/backgroundImage/old_sign.png"
import * as FaIcons from 'react-icons/fa';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import EditIcon from '@material-ui/icons/Edit';
import React, { useState } from "react";
import PlayerModal from "../PlayerModal/PlayerModal";
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import { dispatchSetSelectedPlayer } from "../../store/selected/selectedCreators";

export interface CharactersProps {

}

const Characters: React.FC<CharactersProps> = () => {
    const [isEditPlayerOpen, setIsEditPlayerOpen] = useState(false)
    const dispatch = useDispatch()
    const campaign = useSelector((state: RootReducerProp) => state.selected.selectedCampaign)
    const isDungeonMaster = useSelector((state: RootReducerProp) => {
        let username = state.admin.authUser?.username
        if (username) {
            return state.campaigns.curseOfStrahd.dungeonMaster === username
        }
        return false
    })
    const handleNewPlayer = () => {
        dispatch(dispatchSetSelectedPlayer(
            {
                "isNew": true,
                "player": { "playerName": "New player", "characterName": "", "race": "", "class": "", "level": 1, "isDead": "FALSE" }
            }))
        setIsEditPlayerOpen(true)
    }
    const renderPlayers = () => {
        return (
            <table style={{ minWidth: "100%" }}>
                {isEditPlayerOpen ? <PlayerModal onClose={setIsEditPlayerOpen} /> : null}
                <tr><th >
                    {isDungeonMaster ?
                        <Button color="primary" onClick={handleNewPlayer}>
                            <PersonAddIcon />

                        </Button>
                        : null}
                </th>
                    <th style={{ textAlign: "left" }}>Player</th>
                    <th style={{ textAlign: "left" }}>Character</th>
                    <th style={{ textAlign: "left" }}>Race</th>
                    <th style={{ textAlign: "left" }}>Class</th>
                    <th style={{ textAlign: "left" }}>Level</th>
                    <th style={{ textAlign: "left" }}></th>
                </tr>
                {
                    campaign!.players ?

                        Object.keys(campaign!.players).map((key: any) => {
                            return (<tr>
                                <td style={{ textAlign: "center" }}>{campaign!.players[key].isDead === "TRUE" ? <FaIcons.FaSkullCrossbones /> : null}</td>
                                <td>{campaign!.players[key].isDead === "TRUE" ? <s>{campaign!.players[key].playerName}</s> : campaign!.players[key].playerName}</td>
                                <td>{campaign!.players[key].isDead === "TRUE" ? <s>{campaign!.players[key].characterName}</s> : campaign!.players[key].characterName}</td>
                                <td>{campaign!.players[key].isDead === "TRUE" ? <s>{campaign!.players[key].race}</s> : campaign!.players[key].race}</td>
                                <td>{campaign!.players[key].isDead === "TRUE" ? <s>{campaign!.players[key].class}</s> : campaign!.players[key].class}</td>
                                <td>{campaign!.players[key].isDead === "TRUE" ? <s>{campaign!.players[key].level}</s> : campaign!.players[key].level}</td>
                                <td> {isDungeonMaster ? <Button color="primary" onClick={() => {
                                    dispatch(dispatchSetSelectedPlayer({ id: key, "isNew": false, "player": { "playerName": campaign!.players[key].playerName, "characterName": campaign!.players[key].characterName, "race": campaign!.players[key].race, "class": campaign!.players[key].class, "level": campaign!.players[key].level, "isDead": campaign!.players[key].isDead } }))
                                    setIsEditPlayerOpen(true)
                                }}>

                                    <EditIcon />
                                </Button>
                                    : null}</td>
                            </tr>)
                        })

                        : null}
            </table>
        )
    }
    return (<CharacterConatiner>

        <div style={{ height: "20rem", zIndex: 200 }}>
            {renderPlayers()}


        </div>
    </CharacterConatiner>);
}

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
`
export default Characters;