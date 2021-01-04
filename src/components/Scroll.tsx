import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import ScrollImage from "../assets/backgroundImage/scroll.png"
type ScrollProps = {
    title: string,
    content: string,
    date: string,
    storyImage: string,
    isFirstScroll: boolean
}

function Scroll({ title, content, date, storyImage, isFirstScroll }: ScrollProps): any {

    function recursiveSplitString(content: string): any {
        // Recursive split string into substrings smaller than 2000 characters
        if (content.length <= 2000) {
            return content
        }

        let middle = Math.floor(content.length / 2);
        let before = content.lastIndexOf(' ', middle);
        let after = content.indexOf(' ', middle + 1);

        if (middle - before < after - middle) {
            middle = before;
        } else {
            middle = after;
        }
        const firstHalf = content.substr(0, middle)
        const secondHalf = content.substr(middle + 1)
        return [recursiveSplitString(firstHalf), recursiveSplitString(secondHalf)]
    }

    if (content.length > 2000) {
        const splitContent = recursiveSplitString(content).flat()
        const firstContent = splitContent.shift()
        const ScrollElements = splitContent.map((content: string, index: any) => <Scroll title={title} content={
            index + 1 === splitContent.length ? "......".concat(content) : "......".concat(content).concat("......")
        } date={date} storyImage={storyImage} isFirstScroll={false} />)

        ScrollElements.unshift(<Scroll title={title} content={firstContent.concat("......")} date={date} storyImage={storyImage} isFirstScroll={true} />)
        return ScrollElements
    }
    return (
        <ScrollContainer>
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
margin-top: -8rem;
`
const ScrollTitle = styled.h1`
text-align:center;
`

const ScrollContainer = styled.div`
z-index:20;
margin-top:5rem;
min-width:50rem;
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