import React from "react";
import styled from "styled-components";
import Background from "../assets/backgroundImage/dnd_background.jpg"
import OldPaperBackground from "../assets/backgroundImage/old_paper.jpg"
function CurseOfStrahd() {
    return (
        <Container>
            <Image src={Background} alt="logo" />
            <Title>Curse of Strahd</Title>
            <StoryContainer>
                <p>
                    asdasd
                </p>
            </StoryContainer>
            <StoryContainer>
                <p>
                    asdasd
                </p>
            </StoryContainer>
            <StoryContainer>
                <p>
                    asdasd
                </p>
            </StoryContainer>
            <StoryContainer>
                <p>
                    asdasd
                </p>
            </StoryContainer>

        </Container>
    )


}
const Image = styled.img`
position: -webkit-sticky;
position: sticky;
top: 5rem;
z-index:10;
`
const Title = styled.h1`
position: absolute
top: -50rem;
margin-top: -60rem;
left:50vh;
z-index:20;
`
const StoryContainer = styled.div`
z-index:20;
width:80%;
height: 30rem;
margin:5rem;
background-image: url(${OldPaperBackground});
box-shadow: 5px 0px 15px 2px #000000;
`

const Container = styled.div`
    display:flex;
    justify-content:center;
    align-items: center;
    flex-direction: column;
    padding-top:5rem;
`
export default CurseOfStrahd