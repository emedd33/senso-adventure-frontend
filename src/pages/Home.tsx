import React from "react";
import styled from "styled-components";
import OldPaperBackground from "../assets/backgroundImage/scroll.png"
import Background from "../assets/backgroundImage/dnd_background.jpg"
import Scroll from "../components/Scroll";

function Home() {
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
const StoryContainer = styled.div`
z-index:20;
margin-top:5rem;
min-width:80rem;
background-image: url(${OldPaperBackground});
background-repeat: no-repeat;
background-size: 100% 100%;
`
const StoryContent = styled.p`
font-size: 2rem;
padding-top:25%;
padding-bottom: 25%;
padding-right:10%;
padding-left:15%;
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