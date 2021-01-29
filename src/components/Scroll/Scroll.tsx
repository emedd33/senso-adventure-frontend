import React from 'react';
import styled from 'styled-components';
import ScrollImage from "../../assets/backgroundImage/scroll.png"
import px2vw from '../../utils/px2vw';

import "./Scroll.scss"
type ScrollProps = {
    id: any,
    title: string,
    subTitle: string,
    date: string,
    storyImage: string,
    isFirstScroll: boolean,
    campaign: ICampaign,
    onClick: any
}


function Scroll({ id, title, subTitle, date, storyImage, isFirstScroll, campaign, onClick }: ScrollProps): JSX.Element {
    return (<div style={{ zIndex: 20, width: "100%", justifyContent: "center", display: "flex", overflow: "hidden" }}>
        <ScrollContainer onClick={onClick} className={onClick ? "scroll-container-active" : "scroll-container"} >

            <ScrollContent>
                <ScrollDate >
                    {date}
                </ScrollDate>
                {isFirstScroll ?
                    <div>

                        <div style={{ justifyContent: "center", display: "flex" }}>

                            <StoryImage src={storyImage} alt="" />
                        </div>
                        <ScrollTitle>
                            {title}
                        </ScrollTitle>
                        <h3 style={{ color: "gray", textAlign: "center" }}>{subTitle}</h3>
                    </div>
                    :
                    null
                }

            </ScrollContent>

        </ScrollContainer>
    </div>
    )
}
const StoryImage = styled.img`
marginTop: -1rem;
width:70%;
`
const ScrollContent = styled.div`
font-size: ${px2vw(20)}; 
padding-top:30%;
padding-bottom: 35%;
padding-right:15%;
padding-left:15%;
margin-left:0;
`


const ScrollTitle = styled.h1`
text-align:center;
opacity:0.7;
width:100%;
`

const ScrollContainer = styled.div`
margin: ${px2vw(22)};
width:90%;
min-width:30rem;
background-image: url(${ScrollImage});

&:hover{   
    width:100%;
}
`

const ScrollDate = styled.h2`
margin-top: -${px2vw(4)};
`
export default Scroll