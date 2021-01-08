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
                    <th>Player</th>
                    <th>Character</th>
                    <th>Race</th>
                    <th>Class</th>
                    <th>Level</th>
                </tr>
                {Object.values(players).map((player: IPlayer) => {
                    console.log(player)
                    return (<tr>
                        <td>{player.isDead === "True" ? <FaIcons.FaSkullCrossbones /> : null}</td>
                        <td>{player.isDead === "True" ? <s>{player.playerName}</s> : player.playerName}</td>
                        <td>{player.isDead === "True" ? <s>{player.characterName}</s> : player.characterName}</td>
                        <td>{player.isDead === "True" ? <s>{player.race}</s> : player.race}</td>
                        <td>{player.isDead === "True" ? <s>{player.class}</s> : player.class}</td>
                        <td>{player.isDead === "True" ? <s>{player.level}</s> : player.level}</td>
                    </tr>)
                })}
            </table>
        )
        // <p>
        //     {player.playerName}:{player.characterName}-level {player.level}-{player.race}-{player.class}</p>
        // return Object.values(players).map((player: IPlayer) => {
        //     console.log(player.characterName)
    }
    return (<CharacterConatiner>

        <div style={{ height: "20rem", zIndex: 200, overflowY: "scroll", overflowX: "scroll" }}>
            {renderPlayers()}


        </div>
    </CharacterConatiner>);
}

const CharacterConatiner = styled.div`
width: 60%;  
height:40rem;
padding:11%;
background-image: url(${OldFrame});
background-repeat: no-repeat;
background-color:#FAEBD7;
background-size: 100% 100%;
margin: 5rem; 
padding
margin-top: 10rem;
z-index: 300; 
`
export default Characters;