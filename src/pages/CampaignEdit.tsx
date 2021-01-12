import React from "react"
import { useSelector } from "react-redux"
import styled from "styled-components"
import Background from "../assets/backgroundImage/cos_background.jpg"
import IsLoading from "../components/IsLoading/IsLoading"


export interface CampaignEditProps {

}

const CampaignEdit: React.FC<CampaignEditProps> = () => {
    // const campaign = useSelector((state: RootReducerProp) => state.campaigns.curseOfStrahd)
    const isLoading = useSelector((state: RootReducerProp) => state.admin.isLoading)

    if (isLoading) {
        return (
            <Container >
                <IsLoading />
            </Container>
        )
    }
    return (
        <Container >
        </Container>);
}
const Container = styled.div`
z-index:300;
display:flex;
background-image: url(${Background});
background-repeat: no-repeat;
background-attachment: fixed;
background-size: cover;
justify-content:center;
align-items:center;
flex-direction: column;
padding-top:5vh;
width:100%;
height:100%;
min-height:100vh;
`
export default CampaignEdit;