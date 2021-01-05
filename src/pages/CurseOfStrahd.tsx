import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Background from "../assets/backgroundImage/cos_background.jpg"
import BackgroundMobile from "../assets/backgroundImage/cos_background_mobile.jpg"
import CosTitle from "../assets/backgroundImage/CosTitle.png"
import renderSplitScrolls from "../components/Scroll/ScrollUtils";
import px2vw from "../utils/px2vw";
import useWindowSize from "../store/hooks/useWindowSize";
import { useEffect } from "react";

type CurseOfStrahdProps = {

}


const CurseOfStrahd: FunctionComponent<CurseOfStrahdProps> = () => {
    const adventures = useSelector((state: RootReducerProp) => state.campaign.adventures.filter(adv => adv.story === "Curse of Strahd"))
    const renderScrolls = () => {
        return adventures.map((adv: IAdventure, index: number) => {
            return renderSplitScrolls(adv, CosTitle)
        })
    }
    const size = useWindowSize();
    let background = Background
    if (size.height! > size.width!) {
        background = BackgroundMobile
    }
    return (
        <Container>
            <Image src={background} alt="logo" style={{ width: size.width, height: size.height }} />

            <ScrollParentContainer>
                {renderScrolls()}
            </ScrollParentContainer>

        </Container >
    )


}
const ScrollParentContainer = styled.div`
display:flex;
flex-direction:column;
margin-top:-${px2vw(1000)};
width:100%;
jusify-content: center;
background-image: url(${Background});
`
const Image = styled.img`
position: sticky;
top: 5rem;
margin-top:-${px2vw(100)};
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