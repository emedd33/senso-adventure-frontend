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
import IsLoading from "../IsLoading/IsLoading";

export interface CharactersProps {

}

const Characters: React.FC<CharactersProps> = () => {
    const [isEditPlayerOpen, setIsEditPlayerOpen] = useState(false)
    const dispatch = useDispatch()
    const campaign = useSelector((state: RootReducerProp) => state.selected.selectedCampaign)
    const isDungeonMaster = useSelector((state: RootReducerProp) => {
        let username = state.admin.authUser?.username
        if (username) {
            return campaign.dungeonMaster === username
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
            <div style={{ display: "flex", justifyContent: "center" }}>

                <table style={{ width: "100%" }}>
                    <thead>
                        <tr>{isEditPlayerOpen ? <PlayerModal onClose={setIsEditPlayerOpen} /> : null}</tr>
                        <tr style={{}}>
                            <th></th>
                            <th style={{ textAlign: "left" }}>Player</th>
                            <th style={{ textAlign: "left" }}>Character</th>
                            <th style={{ textAlign: "left" }}>Race</th>
                            <th style={{ textAlign: "left" }}>Class</th>
                            <th style={{ textAlign: "left" }}>Level</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            campaign && campaign.players ?
                                Object.keys(campaign.players).map((key: any, index: number) => {
                                    return (
                                        <tr id={index + "row"} >
                                            <td id={index + "dead"} style={{ textAlign: "center" }}>{campaign!.players[key].isDead === "TRUE" ? <FaIcons.FaSkullCrossbones /> : null}</td>
                                            <td id={index + "playerName"} >{campaign!.players[key].isDead === "TRUE" ? <s>{campaign!.players[key].playerName}</s> : campaign!.players[key].playerName}</td>
                                            <td id={index + "characterName"}>{campaign!.players[key].isDead === "TRUE" ? <s>{campaign!.players[key].characterName}</s> : campaign!.players[key].characterName}</td>
                                            <td id={index + "race"}>{campaign!.players[key].isDead === "TRUE" ? <s>{campaign!.players[key].race}</s> : campaign!.players[key].race}</td>
                                            <td id={index + "class"}>{campaign!.players[key].isDead === "TRUE" ? <s>{campaign!.players[key].class}</s> : campaign!.players[key].class}</td>
                                            <td id={index + "level"}>{campaign!.players[key].isDead === "TRUE" ? <s>{campaign!.players[key].level}</s> : campaign!.players[key].level}</td>
                                            <td id={index + "edit"}> {isDungeonMaster ? <Button color="primary" onClick={() => {
                                                dispatch(dispatchSetSelectedPlayer({ id: key, "isNew": false, "player": { "playerName": campaign!.players[key].playerName, "characterName": campaign!.players[key].characterName, "race": campaign!.players[key].race, "class": campaign!.players[key].class, "level": campaign!.players[key].level, "isDead": campaign!.players[key].isDead } }))
                                                setIsEditPlayerOpen(true)
                                            }}>

                                                <EditIcon />
                                            </Button>
                                                : null}</td>
                                        </tr>
                                    )
                                })

                                : null}
                    </tbody>
                </table>
            </div>
        )
    }
    if (!campaign) {
        console.log("character")
        return <IsLoading />
    }
    return (<CharacterConatiner>

        <div style={{ height: "20rem", zIndex: 200 }}>
            {isDungeonMaster ?
                <Button color="primary" onClick={handleNewPlayer}>
                    <PersonAddIcon />

                </Button>
                : null}
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