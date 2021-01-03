import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import ScrollImage from "../assets/backgroundImage/scroll.png"
type ScrollProps = {
    title: string,
    content: string,
    date: string,
    storyImage: string,

}

const Scroll: FunctionComponent<ScrollProps> = ({ title, content, date, storyImage }) => {
    return (
        <ScrollContainer>
            <ScrollContent>
                <ScrollDate >
                    {date}
                </ScrollDate>
                <div style={{ justifyContent: "center", display: "flex" }}>

                    <StoryImage src={storyImage} alt="" />
                </div>
                <ScrollTitle>
                    {title}
                </ScrollTitle>
                {content}
            </ScrollContent>
        </ScrollContainer>
    )
}
const StoryImage = styled.img`
max-width: 30rem; 
height: 10rem; 
justify-content: flex-start;
marginTop: -1rem;
`

const ScrollDate = styled.h2`
margin-top: -10rem;
`
const ScrollTitle = styled.h1`
text-align:center;
`

const ScrollContainer = styled.div`
z-index:20;
margin-top:5rem;
min-width:80rem;
background-image: url(${ScrollImage});
background-repeat: no-repeat;
background-size: 100% 100%;
`
const ScrollContent = styled.div`
font-size: 2rem;
padding-top:35%;
padding-bottom: 35%;
padding-right:10%;
padding-left:15%;
`
export default Scroll