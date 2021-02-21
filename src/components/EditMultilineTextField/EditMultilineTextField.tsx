import { useEffect, useState } from "react"
import Button from '@material-ui/core/Button';
import styled from "styled-components";
import { useSelector } from "react-redux";
import { storage } from "../../firebase";
import { setAlertDialog } from "../../store/admin/adminCreator";
import useInterval from "../../store/hooks/useIntervak";
export interface EditMultilineTextFieldProps {

}

const EditMultilineTextField: React.FC<EditMultilineTextFieldProps> = () => {
    const [isBold, setIsBold] = useState(false)
    const [text, setText] = useState("this is start")
    const selectedCampaign = useSelector(
        (state: RootReducerProp) => state.selected.selectedCampaign
    );
    const selectedSession = useSelector(
        (state: RootReducerProp) => state.selected.selectedSession
    );
    let storageRef = storage
        .ref()
        .child("Campaigns")
        .child(selectedCampaign.campaign.title)
        .child("Sessions")
        .child(selectedSession.session.title)
    const handleSetIsBold = () => {
        setIsBold(!isBold)
        document.execCommand('bold')
    }
    useInterval(() => {    // Your custom logic here 
        if (text) {
            var task = storageRef
                .child("SesionStory.html")
                .putString(text)
        }
    },
        10000)
    const handleTextChange = (text: any) => {
        console.log(text)
        setText(text.innerHTML);

    }
    useEffect(() => {
        var target = document.getElementById('edit-multiline-view')
        console.log(target)
        if (target) {
            target.outerHTML = text;
        }

    }, [text])

    return (
        <Container>
            <HeaderContainer>

                <Button onClick={handleSetIsBold} variant="contained" size="small" disableElevation={isBold ? false : true}>Bold</Button >
            </HeaderContainer>
            <EditContainer contentEditable="true" onInput={e => handleTextChange(e.currentTarget)} id={"editContainer"} suppressContentEditableWarning={true}>
                <div id="edit-multiline-view"></div>

            </EditContainer>
        </Container >
    );
}

const Container = styled.div`
    background-color:white;
`
const HeaderContainer = styled.div`
padding:1rem;
justify-content:flex-start;
display:flex
`
const EditContainer = styled.div`
width:100%;
min-height20rem:

`

export default EditMultilineTextField;