import React, { FunctionComponent } from "react";
import styled from "styled-components";
import Background from "../assets/backgroundImage/dnd_background.jpg"
import Scroll from "../components/Scroll";

type HomeProps = {}
const Home: FunctionComponent<HomeProps> = () => {
    return (
        <Container>
            <Image src={Background} alt="logo" />

            <ScrollParentContainer>

                <Scroll title="Title" content="content" />
                <Scroll title="Title" content="content" />
                <Scroll title="Title" content="content" />
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

export default Home