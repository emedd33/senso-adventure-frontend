import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Background from "../assets/backgroundImage/dnd_background.jpg"
import CosTitle from "../assets/backgroundImage/CosTitle.png"
import renderSplitScrolls from "../components/Scroll/ScrollUtils";

type HomeProps = {}
const Home: FunctionComponent<HomeProps> = () => {
    const campaigns = useSelector((state: RootReducerProp) => state.campaigns)
    // const renderScrolls = () => {
    //     return campaigns.map((adv: IAdventure, index: number) => {
    //         let storyImage = ""
    //         switch (adv.story) {
    //             case "Curse of Strahd":
    //                 storyImage = CosTitle
    //         }
    //         return renderSplitScrolls(adv, storyImage)
    //     })
    // }
    return (
        <Container>
            <Image src={Background} alt="logo" />

            <ScrollParentContainer>
                {/* {renderScrolls()} */}
            </ScrollParentContainer>

        </Container >
    )


}
const ScrollParentContainer = styled.div`
display:flex;
flex-direction:column;
width:100%;
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