import styled from "styled-components";
import OldFrame from "../../assets/backgroundImage/old_sign.png"
import * as FaIcons from 'react-icons/fa';
import * as BsIcons from 'react-icons/bs';
import * as AiIcons from 'react-icons/ai';
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
    console.log(isDungeonMaster)
    const handleNewPlayer = () => {
        dispatch(dispatchSetSelectedPlayer(
            {
                "isNew": true,
                "player": { "playerName": "new player", "characterName": "", "race": "", "class": "", "level": 1, "isDead": "FALSE" }
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
                            <BsIcons.BsPersonPlusFill />
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

                        Object.values(campaign!.players).map((player: IPlayer) => {
                            return (<tr>
                                <td style={{ textAlign: "center" }}>{player.isDead === "TRUE" ? <FaIcons.FaSkullCrossbones /> : null}</td>
                                <td>{player.isDead === "TRUE" ? <s>{player.playerName}</s> : player.playerName}</td>
                                <td>{player.isDead === "TRUE" ? <s>{player.characterName}</s> : player.characterName}</td>
                                <td>{player.isDead === "TRUE" ? <s>{player.race}</s> : player.race}</td>
                                <td>{player.isDead === "TRUE" ? <s>{player.class}</s> : player.class}</td>
                                <td>{player.isDead === "TRUE" ? <s>{player.level}</s> : player.level}</td>
                                <td> {isDungeonMaster ? <Button color="primary">

                                    <AiIcons.AiFillEdit onClick={() => {
                                        dispatch(dispatchSetSelectedPlayer({ "isNew": false, "player": { "playerName": player.playerName, "characterName": player.characterName, "race": player.race, "class": player.class, "level": player.level, "isDead": player.isDead } }))
                                        setIsEditPlayerOpen(true)
                                    }} />
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