import React from 'react';
import styled from 'styled-components';
import ScrollImage from "../../assets/backgroundImage/scroll.png"
import px2vw from '../../utils/px2vw';
import EditIcon from '@material-ui/icons/Edit';
import ReactHtmlParser from "react-html-parser"
import { Button } from '@material-ui/core';

import "./Scroll.scss"
import { Link, useHistory } from 'react-router-dom';
import { dispatchSetSelectedSession } from '../../store/selected/selectedCreators';
import { useDispatch } from 'react-redux';
type ScrollProps = {
    id: string,
    title: string,
    content: string,
    date: string,
    storyImage: string,
    isFirstScroll: boolean,
    campaign: string,
    onClick: any, isDungeonMaster: boolean
}


function Scroll({ id, title, content, date, storyImage, isFirstScroll, campaign, onClick, isDungeonMaster }: ScrollProps): JSX.Element {
    const dispatch = useDispatch()
    const history = useHistory()
    return (<div style={{ zIndex: 20, width: "100%", justifyContent: "center", display: "flex", overflow: "hidden" }}>
        <ScrollContainer onClick={onClick} className={onClick ? "scroll-container-active" : "scroll-container"} >

            <ScrollContent>
                {isDungeonMaster ?
                    <div style={{ justifyContent: "flex-end", alignItems: "center", display: "flex" }}>
                        <Link to={"/campaign/edit"}>
                            <Button size="large" onClick={() => {
                                dispatch(dispatchSetSelectedSession({
                                    id: id,
                                    session: {
                                        title: title,
                                        story: content,
                                        date: date,
                                        campaign: campaign
                                    }
                                }))
                                history.push("/campaign/edit")
                            }} >
                                <EditIcon />
                            </Button>
                        </Link>
                    </div>
                    : null}

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

                <div style={{ color: "black" }}>{ReactHtmlParser(content)}</div>
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
margin: ${px2vw(22)};
width:${px2vw(1000)};
background-image: url(${ScrollImage});
&:hover {   
    width:${px2vw(1100)};
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