import React, { FunctionComponent, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Background from "../assets/backgroundImage/cos_background.jpg"
import CosTitle from "../assets/backgroundImage/CosTitle.png"
import renderSplitScrolls from "../components/Scroll/ScrollUtils";
import Characters from "../components/Characters/Characters"
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

    return (
        <Container>

            <ScrollParentContainer >
                <Characters players={campaign.players} />
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


const Container = styled.div`
    display:flex;
    justify-content:center;
    flex-direction: column;
    padding-top:5vh;
    background-color:black;
    
`
export default CurseOfStrahd