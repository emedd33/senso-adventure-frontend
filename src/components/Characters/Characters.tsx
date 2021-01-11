import styled from "styled-components";
import OldFrame from "../../assets/backgroundImage/old_sign.png"
import * as FaIcons from 'react-icons/fa';
import * as BsIcons from 'react-icons/bs';
import * as AiIcons from 'react-icons/ai';
import React, { useState } from "react";
import PlayerModal from "../PlayerModal/PlayerModal";

export interface CharactersProps {
    players: IPlayer[],
    isDungeonMaster?: boolean
}

const Characters: React.FC<CharactersProps> = ({ players, isDungeonMaster }) => {
    const [isEditPlayerOpen, setIsEditPlayerOpen] = useState(false)
    const [selectedPlayer, setSelectedPlayer] = useState({ "player": "new player", "characterName": "", "race": "", "class": "", "level": 1 })
    const handleNewPlayer = () => {
        setSelectedPlayer({ "player": "new player", "characterName": "", "race": "", "class": "", "level": 1 })
        setIsEditPlayerOpen(true)
    }

    const renderPlayers = () => {
        return (
            <table style={{ minWidth: "100%" }}>
                {isEditPlayerOpen ? <PlayerModal selectedPlayer={selectedPlayer} onClose={setIsEditPlayerOpen} /> : null}
                <tr><th> {isDungeonMaster ?
                    <RoundButton onClick={handleNewPlayer}>
                        <BsIcons.BsPersonPlusFill />
                    </RoundButton>
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
                        <td >{player.isDead === "True" ? <FaIcons.FaSkullCrossbones /> : null}</td>
                        <td>{player.isDead === "True" ? <s>{player.playerName}</s> : player.playerName}</td>
                        <td>{player.isDead === "True" ? <s>{player.characterName}</s> : player.characterName}</td>
                        <td>{player.isDead === "True" ? <s>{player.race}</s> : player.race}</td>
                        <td>{player.isDead === "True" ? <s>{player.class}</s> : player.class}</td>
                        <td>{player.isDead === "True" ? <s>{player.level}</s> : player.level}</td>
                        <td> {isDungeonMaster ? <RoundButton>
                            <AiIcons.AiFillEdit onClick={() => {
                                setSelectedPlayer({ "player": player.playerName, "characterName": player.characterName, "race": player.race, "class": player.class, "level": player.level })
                                setIsEditPlayerOpen(true)
                            }} />
                        </RoundButton> : null}</td>
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
const RoundButton = styled.button`
background-color:white;
    border-radius: 50%;
    width:1.5rem;
    height:1.5rem;
    padding:0.1rem;
    border:transparent;
    justify-content:center;
    align-items:center;
    display:flex;
    :hover{
        cursor:pointer;
    }
`
export default Characters;