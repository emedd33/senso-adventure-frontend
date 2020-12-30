import React from "react";
import styled from "styled-components";
import OldPaperBackground from "../assets/backgroundImage/scroll.png"

function Home() {
    return (
        <Container>
            <h1>Home</h1>
            <ScrollParentContainer>
                
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
                    asdasdaasdfasdfasdfasdf asdfa sdf asdf asd fas dfasdf asd as d as da sd as da s da sd as d asd a sd a sd a sd as da sd
                    asdasdaasdfasdfasdfasdf asdfa sdf asdf asd fas dfasdf asd as d as da sd as da s da sd as d asd a sd a sd a sd as da sd
                    asdasdaasdfasdfasdfasdf asdfa sdf asdf asd fas dfasdf asd as d as da sd as da s da sd as d asd a sd a sd a sd as da sd
                    asdasdaasdfasdfasdfasdf asdfa sdf asdf asd fas dfasdf asd as d as da sd as da s da sd as d asd a sd a sd a sd as da sd
                    asdasdaasdfasdfasdfasdf asdfa sdf asdf asd fas dfasdf asd as d as da sd as da s da sd as d asd a sd a sd a sd as da sd
                   
            </StoryContent>

            </StoryContainer>
            <StoryContainer>
                <StoryContent>
                    asdasdaasdfasdfasdfasdf asdfa sdf asdf asd fas dfasdf asd as d as da sd as da s da sd as d asd a sd a sd a sd as da sd
                    asdasdaasdfasdfasdfasdf asdfa sdf asdf asd fas dfasdf asd as d as da sd as da s da sd as d asd a sd a sd a sd as da sd    
                </StoryContent>

            </StoryContainer>

            </ScrollParentContainer>

        </Container >
    )


}
const ScrollParentContainer = styled.div`
display:flex;
flex-direction:column;
`
const StoryContainer = styled.div`
z-index:20;
background-color:red;
margin-top:5rem;
margin-left:100vw;
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
`

export default Home