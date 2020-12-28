import React from "react";
import styled from "styled-components";
import Background from "../assets/backgroundImage/dnd_background.jpg"
import OldPaperBackground from "../assets/backgroundImage/old_paper.jpg"
function CurseOfStrahd() {
    return (
        <Container>
            <Image src={Background} alt="logo" />
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
const StoryContainer = styled.div`
z-index:100;
width:80rem;
height: 20rem;
margin:10rem;
background-image: url(${OldPaperBackground})
`

const Container = styled.div`
    display:flex;
    justify-content:center;
    align-items: center;
    flex-direction: column;
    padding-top:5rem;
`
export default CurseOfStrahd