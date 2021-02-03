import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import styled from "styled-components"
import { storage } from "../../firebase"
import { Route } from "react-router-dom";
import IsLoading from "../../components/IsLoading/IsLoading";

export interface ProfileIndexProps {

}

const ProfileIndex: React.FC<ProfileIndexProps> = () => {
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

    return (<Container style={{ backgroundImage: "url(" + imageUrl + ")" }}>
        <Route path="/profile">
            {/* <LoginForm /> */}
        </Route>
    </Container>);
}

const Container = styled.div`
z-index:300;
display:flex;
background-repeat: no-repeat;
background-attachment: fixed;
background-size: cover ;
justify-content:center;
align-items:center;
flex-direction: column;
padding-top:5vh;
width:100%;
min-height:100vh;
margin:auto;
`
export default ProfileIndex;