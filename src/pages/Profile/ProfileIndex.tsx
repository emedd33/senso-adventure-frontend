import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import { storage } from "../../firebase"
import { Route } from "react-router-dom";
import Button from '@material-ui/core/Button';
import IsLoading from "../../components/IsLoading/IsLoading";
import { OLD_WHITE } from "../../assets/constants/Constants";
import { dispatchLogout } from "../../store/admin/adminCreator";

export interface ProfileIndexProps {

}

const ProfileIndex: React.FC<ProfileIndexProps> = () => {
    const dispatch = useDispatch()
    const isLoading = useSelector((state: RootReducerProp) => state.admin.isLoading)
    const [imageUrl, setImageUrl] = useState("")

    useEffect(() => {
        storage.ref('Images/Background/dnd_login.jpg').getDownloadURL().then((url: string) => setImageUrl(url))
    }, [])

    if (isLoading) {
        return (
            <Container style={{ backgroundImage: "url(" + imageUrl + ")" }}>
                <IsLoading />
            </Container>
        )
    }

    return (
        <Container style={{ backgroundImage: "url(" + imageUrl + ")" }}>
            <Route exact path="/profile">
                <ContentContainer >
                    <div style={{ backgroundColor: "red", flex: 8, width: "90%" }}>

                    </div>
                    <div style={{ flex: 1, width: "90%", justifyContent: "center", alignItems: "center", display: "flex" }}>
                        <Button onClick={() => dispatch(dispatchLogout())} variant="contained" color="secondary" style={{ width: "90%" }}> Log out</Button>
                    </div>
                </ContentContainer>
            </Route>
        </Container>);
}

const ContentContainer = styled.div`
min-height:50rem;
min-width:15rem;
width:50%;
flex-direction:column;
padding:1rem;
-webkit-box-shadow: 5px 5px 15px 5px #000000; 
box-shadow: 5px 0px 15px 2px #000000;
display:flex;
justify-content: center;
align-items:center;
background-color: ${OLD_WHITE}
`
const Container = styled.div`
display:flex;
background-repeat: no-repeat;
background-attachment: fixed;
background-size: cover;
justify-content:center;
align-items:center;
flex-direction: column;
padding-top:10rem;
width:100%;
height:100%;
padding-bottom: 10rem;
min-height:100vh;
`
export default ProfileIndex;