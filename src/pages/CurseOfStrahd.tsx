import React, { FunctionComponent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Background from "../assets/backgroundImage/cos_background.jpg"
import CosTitle from "../assets/backgroundImage/CosTitle.png"
import renderSplitScrolls from "../components/Scroll/ScrollUtils";
import { curseOfStrahdRef, todosRef } from "../firebase";

type CurseOfStrahdProps = {

}


const CurseOfStrahd: FunctionComponent<CurseOfStrahdProps> = () => {
    const adventures = useSelector((state: RootReducerProp) => state.campaign.adventures.filter(adv => adv.story === "Curse of Strahd"))
    const [todos, setTodos] = useState<any>(null);
    useEffect(() => {

        curseOfStrahdRef.once('value', (snapshot) => {
            let items = snapshot.val();
            setTodos(Object.values(items))
        });
    }, [])
    console.log(todos)
    const renderScrolls = () => {
        return todos.map((adv: IAdventure, index: number) => {
            return renderSplitScrolls(adv, CosTitle)
        })
    }
    return (
        <Container>

            <ScrollParentContainer >
                {todos ?
                    renderScrolls()
                    : null
                }
            </ScrollParentContainer>

        </Container >
    )


}
const ScrollParentContainer = styled.div`
display:flex;
flex-direction:column;
width:100%;
jusify-content: center;
background-image: url(${Background});
background-repeat: no-repeat;
background-attachment: fixed;
background-size: cover;
`

const Container = styled.div`
    display:flex;
    justify-content:center;
    flex-direction: column;
    padding-top:3rem;
    background-color:black;
    
`
export default CurseOfStrahd