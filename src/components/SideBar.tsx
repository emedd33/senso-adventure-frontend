import styled from "styled-components"

const SideBar = () => {
    const insideStyles: any = {
        background: "white",
        padding: 20,
        position: "absolute",
        left: "50%",
        transform: "translate(-50%, 50%)",
        height: "10rem",
        width: "40rem",
        opacity: 0.9
    };
    return (
        <Conatiner>
            <h2>hei</h2>
            <h2>hei</h2>
            <h2>hei</h2>
            <h2>hei</h2>
            <h2>hei</h2>
            <h2>hei</h2>
        </Conatiner>
    )
}
const Conatiner = styled.div`
    width:30vh;
    flex:1;
    height:300vh;
    background-color: #AB9696;
    opacity:0.5;
    transform: transalte(50%,-50%);
    position:absolute;
    left: 0%;
    top: 0%;
`
export default SideBar