import React, { FunctionComponent, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Background from "../assets/backgroundImage/cos_background.jpg"
import OldFrame from "../assets/backgroundImage/old_sign.png"
import CosTitle from "../assets/backgroundImage/CosTitle.png"
import renderSplitScrolls from "../components/Scroll/ScrollUtils";
import {
    FloatingMenu,
    MainButton,
    ChildButton,
    Directions
} from 'react-floating-button-menu';


type CurseOfStrahdProps = {}
const CurseOfStrahd: FunctionComponent<CurseOfStrahdProps> = () => {
    const [isOpen, setIsOpen] = useState(false)
    const campaign = useSelector((state: RootReducerProp) => state.campaigns.curseOfStrahd)
    const renderScrolls = () => {
        return Object.values(campaign.sessions).map((session: ISession) => {
            return renderSplitScrolls(session, CosTitle)
        })
    }
    const renderPlayers = () => {
        return Object.values(campaign.players).map((player: IPlayer) => {
            console.log(player.characterName)
            return <p>{player.playerName}:{player.characterName}-level {player.level}-{player.race}-{player.class}</p>
        })
    }
    return (
        <Container>

            <ScrollParentContainer >
                <CharacterConatiner>
                    {campaign ?
                        renderPlayers()
                        : null}
                </CharacterConatiner>
                {campaign ?
                    renderScrolls()
                    : null
                }

                <div style={{ width: "", height: "", position: "fixed", right: "0", bottom: "0", margin: "1rem", zIndex: 400 }}>

                    <FloatingMenu
                        slideSpeed={500}
                        direction={Directions.Up}
                        spacing={8}
                        isOpen={isOpen}

                    >
                        <MainButton
                            iconResting={null}
                            iconActive={null}
                            background="white"
                            onClick={() => setIsOpen(!isOpen)}
                            size={56}
                        />
                        <ChildButton
                            //   icon={<MdFavorite style={{ fontSize: 20 }} />}
                            background="white"
                            size={40}
                            onClick={() => console.log('First button clicked')}
                        />
                        <ChildButton
                            //   icon={<MdFavorite style={{ fontSize: 20 }} />}
                            background="white"
                            size={40}
                        />
                        <ChildButton
                            //   icon={<MdFavorite style={{ fontSize: 20 }} />}
                            background="white"
                            size={40}
                        />
                    </FloatingMenu>
                </div>
            </ScrollParentContainer>
        </Container >
    )


}
const ScrollParentContainer = styled.div`
display:flex;
flex-direction:column;
width:100%;
height:100%;
justify-content: center;
align-items:center;
background-image: url(${Background});
background-repeat: no-repeat;
background-attachment: fixed;
background-size: cover;
z-index:300;
`
const CharacterConatiner = styled.div`
width: 60%; 
min-height: 40rem; 
padding:10%;
background-image: url(${OldFrame});
background-repeat: no-repeat;
background-color:#FAEBD7;
background-size: 100% 100%;
margin: 5rem; 
padding
margin-top: 10rem;
z-index: 400; 
`

const Container = styled.div`
    display:flex;
    justify-content:center;
    flex-direction: column;
    padding-top:5vh;
    background-color:black;
    
`
export default CurseOfStrahd