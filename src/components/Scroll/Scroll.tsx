import React from 'react';
import styled from 'styled-components';
import ScrollImage from "../../assets/backgroundImage/scroll.png"
import px2vw from '../../utils/px2vw';
import ReactHtmlParser from "react-html-parser"

import "./Scroll.scss"
type ScrollProps = {
    id: any,
    title: string,
    content: string,
    date: string,
    storyImage: string,
    isFirstScroll: boolean,
    campaign: ICampaign,
    onClick: any
}


function Scroll({ id, title, content, date, storyImage, isFirstScroll, campaign, onClick }: ScrollProps): JSX.Element {
    return (<div style={{ zIndex: 20, width: "100%", justifyContent: "center", display: "flex", overflow: "hidden" }}>
        <ScrollContainer onClick={onClick} className={onClick ? "scroll-container-active" : "scroll-container"} >

            <ScrollContent>
                <div style={{ backgroundColor: "transparent", height: "60vh", width: "100%" }}></div>
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
                    </div>
                    :
                    null
                }
                <div style={{ "display": "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <ScrollStory>{ReactHtmlParser(content)}</ScrollStory>
                </div>
                <div style={{ backgroundColor: "transparent", height: "60vh", width: "100%" }}></div>

            </ScrollContent>

        </ScrollContainer>
    </div>
    )
}
const StoryImage = styled.img`
marginTop: -1rem;
width: ${px2vw(500)};
transition:200ms;
`
const ScrollContent = styled.div`
font-size: ${px2vw(20)};
padding-top:30%;
padding-bottom: 35%;
padding-right:15%;
padding-left:15%;
margin-left:0;
`

const ScrollStory = styled.p`
width:${px2vw(730)};
text-align:left;
font-size:1.5rem;
margin-bottom:4rem;
transition:200ms;
`

const ScrollTitle = styled.h1`
text-align:center;
font-size:  ${px2vw(80)}; 
transition:200ms;
`

const ScrollContainer = styled.div`
margin: ${px2vw(22)};
width:${px2vw(1000)};
background-image: url(${ScrollImage});
&:hover {   
    width:${px2vw(1100)};
  }
&:hover ${ScrollStory}{   
    font-size:2rem;
}
&:hover ${StoryImage}{   
width: ${px2vw(600)};

}
&:hover ${ScrollTitle}{   
    font-size: ${px2vw(100)}; 
}
`

const ScrollDate = styled.h2`
margin-top: -${px2vw(4)};
`
export default Scroll