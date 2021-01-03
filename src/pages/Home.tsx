import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Background from "../assets/backgroundImage/dnd_background.jpg"
import Scroll from "../components/Scroll";

type HomeProps = {}
const Home: FunctionComponent<HomeProps> = () => {
    const adventures = useSelector((state: RootReducerProp) => state.campaign.adventures)
    const renderScrolls = () => {
        return adventures.map((adv: IAdventure, index: number) => {
            return <Scroll key={index} title={adv.title} content={adv.body} />
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
`
const Image = styled.img`
position: -webkit-sticky;
position: sticky;
top: 5rem;
width:100%;
min-width:50rem;
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