import styled from "styled-components";
import OldFrame from "../../assets/backgroundImage/old_sign.png"
import * as FaIcons from 'react-icons/fa';
import * as BsIcons from 'react-icons/bs';
import * as AiIcons from 'react-icons/ai';
import React, { useState } from "react";
import PlayerModal from "../PlayerModal/PlayerModal";
import { Button } from '@material-ui/core';

export interface CharactersProps {
    players: IPlayer[],
    isDungeonMaster?: boolean,
    campaign: string
}

const Characters: React.FC<CharactersProps> = ({ players, isDungeonMaster, campaign }) => {
    const [isEditPlayerOpen, setIsEditPlayerOpen] = useState(false)
    const [selectedPlayer, setSelectedPlayer] = useState({ "player": "new player", "characterName": "", "race": "", "class": "", "level": 1, "isDead": "FALSE" })
    const [isNewPlayer, setIsNewPlayer] = useState(true)
    const handleNewPlayer = () => {
        setSelectedPlayer({ "player": "new player", "characterName": "", "race": "", "class": "", "level": 1, "isDead": "FALSE" })
        setIsNewPlayer(true)
        setIsEditPlayerOpen(true)
    }

    const renderPlayers = () => {
        return (
            <table style={{ minWidth: "100%" }}>
                {isEditPlayerOpen ? <PlayerModal selectedPlayer={selectedPlayer} onClose={setIsEditPlayerOpen} isNewPlayer={isNewPlayer} campaign={campaign} /> : null}
                <tr><th > {isDungeonMaster ?
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
                {Object.values(players).map((player: IPlayer) => {
                    return (<tr>
                        <td style={{ textAlign: "center" }}>{player.isDead === "TRUE" ? <FaIcons.FaSkullCrossbones /> : null}</td>
                        <td>{player.isDead === "TRUE" ? <s>{player.playerName}</s> : player.playerName}</td>
                        <td>{player.isDead === "TRUE" ? <s>{player.characterName}</s> : player.characterName}</td>
                        <td>{player.isDead === "TRUE" ? <s>{player.race}</s> : player.race}</td>
                        <td>{player.isDead === "TRUE" ? <s>{player.class}</s> : player.class}</td>
                        <td>{player.isDead === "TRUE" ? <s>{player.level}</s> : player.level}</td>
                        <td> {isDungeonMaster ? <Button color="primary">

                            <AiIcons.AiFillEdit onClick={() => {
                                setSelectedPlayer({ "player": player.playerName, "characterName": player.characterName, "race": player.race, "class": player.class, "level": player.level, "isDead": player.isDead })
                                setIsNewPlayer(false)
                                setIsEditPlayerOpen(true)
                            }} />
                        </Button>
                            : null}</td>
                    </tr>)
                })}
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