import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Background from "../assets/backgroundImage/cos_background.jpg"
import Scroll from "../components/Scroll";
import CosTitle from "../assets/backgroundImage/CosTitle.png"

type CurseOfStrahdProps = {

}


const CurseOfStrahd: FunctionComponent<CurseOfStrahdProps> = () => {
    const adventures = useSelector((state: RootReducerProp) => state.campaign.adventures.filter(adv => adv.story === "Curse of Strahd"))
    const renderScrolls = () => {
        return adventures.map((adv: IAdventure, index: number) => {
            return <Scroll key={index} title={adv.title} content={adv.body} date={adv.date} storyImage={CosTitle} />
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
margin-top:-100vh;
jusify-content: center;
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
export default CurseOfStrahd