import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import ScrollImage from "../assets/backgroundImage/scroll.png"

type ScrollProps = {
    title: string,
    content: string,
    date: string
}

const Scroll: FunctionComponent<ScrollProps> = ({ title, content, date }) => {
    return (
        <ScrollContainer>
            <ScrollContent>
                <ScrollDate >
                    {date}
                </ScrollDate>
                <ScrollTitle>
                    {title}
                </ScrollTitle>
                {content}
            </ScrollContent>
        </ScrollContainer>
    )
}
const ScrollDate = styled.h2`
margin-top: -10rem;
text-align: center;
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