import React from "react";
import { Parallax, Background } from "react-parallax";
import dnd_background from "../../assets/backgroundImage/dnd_background.jpg";

const styles = {
    fontFamily: "sans-serif",
    textAlign: "center"
};
const insideStyles1 = {
    background: "white",
    padding: 20,
    position: "absolute",
    top: "20%",
    left: "50%",
    transform: "translate(-50%,50%)"
};
const insideStyles = {
    background: "white",
    padding: 20,
    position: "absolute",
    top: "30%",
    left: "50%",
    transform: "translate(-50%, 50%)"
};
function Home() {
    return (
        <div style={styles}>
            <p>Hello</p>
            <Parallax bgImage={dnd_background} strength={200}>
                <div style={{ height: "200vh", width: "100vh" }}>
                    <div style={insideStyles}>HTML inside the parallax</div>
                    <div style={insideStyles1}>HTML inside the parallax</div>
                </div>
            </Parallax>

        </div>
    )
}
export default Home