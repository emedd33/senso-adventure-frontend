import styled from "styled-components";
import OldFrame from "../../assets/backgroundImage/old_sign.png"
import * as FaIcons from 'react-icons/fa';

export interface CharactersProps {
    players: IPlayer[]
}

const Characters: React.SFC<CharactersProps> = ({ players }) => {
    const renderPlayers = () => {

        return (
            <table style={{ minWidth: "100%" }}>
                <tr>
                    <th></th>
                    <th style={{ textAlign: "left" }}>Player</th>
                    <th style={{ textAlign: "left" }}>Character</th>
                    <th style={{ textAlign: "left" }}>Race</th>
                    <th style={{ textAlign: "left" }}>Class</th>
                    <th style={{ textAlign: "left" }}>Level</th>
                </tr>
                {Object.values(players).map((player: IPlayer) => {
                    console.log(player)
                    return (<tr>
                        <td >{player.isDead === "True" ? <FaIcons.FaSkullCrossbones /> : null}</td>
                        <td>{player.isDead === "True" ? <s>{player.playerName}</s> : player.playerName}</td>
                        <td>{player.isDead === "True" ? <s>{player.characterName}</s> : player.characterName}</td>
                        <td>{player.isDead === "True" ? <s>{player.race}</s> : player.race}</td>
                        <td>{player.isDead === "True" ? <s>{player.class}</s> : player.class}</td>
                        <td>{player.isDead === "True" ? <s>{player.level}</s> : player.level}</td>
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
padding
margin-top: 10rem;
z-index: 300; 
`
export default Characters;