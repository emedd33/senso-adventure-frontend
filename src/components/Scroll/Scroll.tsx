import React, { useState } from 'react';
import styled from 'styled-components';
import ScrollImage from "../../assets/backgroundImage/scroll.png"
import px2vw from '../../utils/px2vw';
import ReactHtmlParser from "react-html-parser"
import { useHistory } from 'react-router-dom';
type ScrollProps = {
    title: string,
    content: string,
    date: string,
    storyImage: string,
    isFirstScroll: boolean,
    campaign: string,
}


function Scroll({ title, content, date, storyImage, isFirstScroll, campaign }: ScrollProps): JSX.Element {
    const history = useHistory();
    console.log(campaign)
    return (<div style={{ zIndex: 20, width: "100%", justifyContent: "center", display: "flex", overflow: "hidden" }}>

        <ScrollContainer onClick={() => {

            history.push('/' + campaign)
        }
        }>

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
                    </div>
                    :
                    null
                }

                <div>{ReactHtmlParser(content)}</div>
            </ScrollContent>
        </ScrollContainer>
    </div>
    )
}
const StoryImage = styled.img`
justify-content: flex-start;
marginTop: -1rem;
width: ${px2vw(500)};

`
const ScrollContainer = styled.div`
z-index:20;
margin: ${px2vw(22)};
width:${px2vw(1000)};
min-width:20rem;
background-image: url(${ScrollImage});
background-repeat: no-repeat;
background-size: 100% 100%; 
transition:250ms; 
&:hover {
   
    width:${px2vw(1100)};
    cursor: pointer;
   
  }
`

const ScrollDate = styled.h2`
margin-top: -${px2vw(4)};
`
const ScrollTitle = styled.h1`
text-align:center;
font-size:  ${px2vw(100)}; ;
`

const ScrollContent = styled.div`
font-size: ${px2vw(20)};
padding-top:30%;
padding-bottom: 30%;
padding-right:15%;
padding-left:15%;
margin-left:0;
`
export default Scroll