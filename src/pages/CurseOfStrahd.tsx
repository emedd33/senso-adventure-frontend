import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Background from "../assets/backgroundImage/cos_background.jpg"
import Scroll from "../components/Scroll";

type CurseOfStrahdProps = {

}

const CurseOfStrahd: FunctionComponent<CurseOfStrahdProps> = () => {
    const adventures = useSelector((state: RootReducerProp) => state.campaign.adventures.filter(adv => adv.story === "Curse of Strahd"))
    console.log(adventures)
    const renderScrolls = () => {
        return adventures.map(adv => {
            return <Scroll title={adv.title} content={adv.body} />
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
    align-items: center;
    flex-direction: column;
    padding-top:5rem;
    background-color:black;
    
`

export default CurseOfStrahd