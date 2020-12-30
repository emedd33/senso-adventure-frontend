import React from "react";
import styled from "styled-components";
import OldPaperBackground from "../assets/backgroundImage/scroll.png"
import Background from "../assets/backgroundImage/cos_background.jpg"
import Scroll from "../components/Scroll";

function CurseOfStrahd() {
    return (
        <Container>
            <Image src={Background} alt="logo" />

            <ScrollParentContainer>

                <Scroll title="Title" content="content" />
                <Scroll title="Title" content="content" />
                <Scroll title="Title" content=" asdasdaasdfasdfasdfasdf asdfa sdf asdf asd fas dfasdf asd as d as da sd as da s da sd as d asd a sd a sd a sd as da sd
                    asdasdaasdfasdfasdfasdf asdfa sdf asdf asd fas dfasdf asd as d as da sd as da s da sd as d asd a sd a sd a sd as da sd
                    asdasdaasdfasdfasdfasdf asdfa sdf asdf asd fas dfasdf asd as d as da sd as da s da sd as d asd a sd a sd a sd as da sd
                   "/>
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