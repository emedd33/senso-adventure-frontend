import React from "react";
import styled from "styled-components";
import Background from "../assets/backgroundImage/cos_background.jpg"
import OldPaperBackground from "../assets/backgroundImage/scroll.png"
function CurseOfStrahd() {
    return (
        <Container>
            <Image src={Background} alt="logo" />
            <Title>Curse of Strahd</Title>
            <div style={{backgroundColor:"red"}}>
                <h1>hehe</h1>
            </div>
            <StoryContainer>
                <StoryContent>
                    asdasdaasdfasdfasdfasdf asdfa sdf asdf asd fas dfasdf asd as d as da sd as da s da sd as d asd a sd a sd a sd as da sd
                    asdasdaasdfasdfasdfasdf asdfa sdf asdf asd fas dfasdf asd as d as da sd as da s da sd as d asd a sd a sd a sd as da sd
                    asdasdaasdfasdfasdfasdf asdfa sdf asdf asd fas dfasdf asd as d as da sd as da s da sd as d asd a sd a sd a sd as da sd
                    
                </StoryContent>
            </StoryContainer>
            <StoryContainer>
                <StoryContent>
                    asdasdaasdfasdfasdfasdf asdfa sdf asdf asd fas dfasdf asd as d as da sd as da s da sd as d asd a sd a sd a sd as da sd
                    asdasdaasdfasdfasdfasdf asdfa sdf asdf asd fas dfasdf asd as d as da sd as da s da sd as d asd a sd a sd a sd as da sd
                    asdasdaasdfasdfasdfasdf asdfa sdf asdf asd fas dfasdf asd as d as da sd as da s da sd as d asd a sd a sd a sd as da sd
                    asdasdaasdfasdfasdfasdf asdfa sdf asdf asd fas dfasdf asd as d as da sd as da s da sd as d asd a sd a sd a sd as da sd
                    asdasdaasdfasdfasdfasdf asdfa sdf asdf asd fas dfasdf asd as d as da sd as da s da sd as d asd a sd a sd a sd as da sd
                    asdasdaasdfasdfasdfasdf asdfa sdf asdf asd fas dfasdf asd as d as da sd as da s da sd as d asd a sd a sd a sd as da sd
                    asdasdaasdfasdfasdfasdf asdfa sdf asdf asd fas dfasdf asd as d as da sd as da s da sd as d asd a sd a sd a sd as da sd
                    asdasdaasdfasdfasdfasdf asdfa sdf asdf asd fas dfasdf asd as d as da sd as da s da sd as d asd a sd a sd a sd as da sd
                    asdasdaasdfasdfasdfasdf asdfa sdf asdf asd fas dfasdf asd as d as da sd as da s da sd as d asd a sd a sd a sd as da sd

                    asdasdaasdfasdfasdfasdf asdfa sdf asdf asd fas dfasdf asd as d as da sd as da s da sd as d asd a sd a sd a sd as da sd
                    asdasdaasdfasdfasdfasdf asdfa sdf asdf asd fas dfasdf asd as d as da sd as da s da sd as d asd a sd a sd a sd as da sd
                    asdasdaasdfasdfasdfasdf asdfa sdf asdf asd fas dfasdf asd as d as da sd as da s da sd as d asd a sd a sd a sd as da sd
                    
                </StoryContent>
            </StoryContainer>
            
        </Container>
    )


}
const Image = styled.img`
position: -webkit-sticky;
position: sticky;
top: 5rem;
width:250vh;
z-index:10;
`
const Title = styled.h1`
position: absolute
top: -50rem;
margin-top: -40rem;
left:50vh;
color: red;
font-size: 10vw;
z-index:20;
`
const StoryContainer = styled.div`
z-index:20;
min-height: 50rem;
margin:5rem;
padding:11rem;
background-image: url(${OldPaperBackground});
background-repeat: no-repeat;
background-size: 100% auto;
`
//background-size:100% 100vh;
const StoryContent = styled.p`
font-size: 2rem;
`

const Container = styled.div`
    display:flex;
    justify-content:center;
    align-items: center;
    flex-direction: column;
    padding-top:5rem;
    
`
export default CurseOfStrahd