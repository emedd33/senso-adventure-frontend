import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Background from "../assets/backgroundImage/dnd_background.jpg"
import Scroll from "../components/Scroll";
import CosTitle from "../assets/backgroundImage/CosTitle.png"

type HomeProps = {}
const Home: FunctionComponent<HomeProps> = () => {
    const adventures = useSelector((state: RootReducerProp) => state.campaign.adventures)
    const renderScrolls = () => {
        return adventures.map((adv: IAdventure, index: number) => {
            let storyImage = ""
            switch (adv.story) {
                case "Curse of Strahd":
                    storyImage = CosTitle
            }
            return <Scroll key={index} title={adv.title} content={adv.body} date={adv.date} storyImage={storyImage} isFirstScroll={false} />
        })
    }
    return (
        <Container>
            <Image src={Background} alt="logo" />

            <ScrollParentContainer>
                {renderScrolls()}
            </ScrollParentContainer>

        </Container >
    )


}
const ScrollParentContainer = styled.div`
display:flex;
flex-direction:column;
width:100%;
margin-top:-150vh;
jusify-content: center;
`
const Image = styled.img`
position: -webkit-sticky;
position: sticky;
top: 5rem;
margin: auto;
width:250vh;
z-index:10;
`
const Container = styled.div`
    display:flex;
    justify-content:center;
    flex-direction: column;
    padding-top:5rem;
    background-color:black;
    
`

export default Home