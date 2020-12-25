import { FC } from "react";
import styled from "styled-components"
type ContainerProps = {
    index: number
}

const StoryContainer: FC<ContainerProps> = ({ index }) => {
    const top = String(index * 10) + "%"
    const insideStyles: any = {
        background: "white",
        padding: 20,
        position: "absolute",
        top: top,
        left: "50%",
        transform: "translate(-50%, 50%)",
        height: "10rem",
        width: "40rem",
        opacity: 0.9
    };
    return (
        <div style={insideStyles} >
            HTML inside the parallax
        </div>

    )
}

const Container = styled.div`

`
export default StoryContainer