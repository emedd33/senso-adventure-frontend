import React from "react";
import { Parallax, Background } from "react-parallax";
import dnd_background from "../../assets/backgroundImage/dnd_background.jpg";
import StoryContainer from "../../components/StoryContainer"
const styles: any = {
    fontFamily: "sans-serif",
    textAlign: "center"
};
const insideStyles1: any = {
    background: "white",
    padding: 20,
    position: "absolute",
    top: "20%",
    left: "50%",
    transform: "translate(-50%,50%)"
};
const insideStyles: any = {
    background: "white",
    padding: 20,
    position: "absolute",
    top: "30%",
    left: "50%",
    transform: "translate(-50%, 50%)"
};
function Home() {
    return (
        <div>
            <p>Hello </p>
            <Parallax bgImage={dnd_background} strength={200} >
                <div style={{ height: "200vh", width: "100vh" }}>
                    <StoryContainer index={1} />

                    <div style={insideStyles1}> HTML inside the parallax </div>
                </div>
            </Parallax>
        </div>
    )


}
export default Home