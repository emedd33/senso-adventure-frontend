import { useEffect, useState } from "react"
import Button from '@material-ui/core/Button';
import styled from "styled-components";
import { useSelector } from "react-redux";
import { storage } from "../../firebase";
import CircularProgress from '@material-ui/core/CircularProgress';
import useInterval from "../../store/hooks/useIntervak";
export interface EditMultilineTextFieldProps {

}

const EditMultilineTextField: React.FC<EditMultilineTextFieldProps> = () => {
    const [isUploading, setIsUploading] = useState(false)
    const [isBold, setIsBold] = useState(false)
    const [isItalic, setIsItalic] = useState(false)
    const [text, setText] = useState("this is start")
    const [editedText, setEditedText] = useState("This is start")
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
    const handleSetIsItalic = () => {
        setIsItalic(!isItalic)
        document.execCommand('italic')
    }
    function sleep(time: number) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }
    useInterval(async () => {    // Your custom logic here 
        if (editedText && text !== editedText) {
            console.log("uploading")
            setIsUploading(true)
            storageRef
                .child("SesionStory.html")
                .putString(text)
            setText(editedText)
            sleep(1000).then(() => {
                setIsUploading(false)
            });


        }
    },
        5000)
    const handleTextChange = (text: any) => {
        console.log(text)
        setEditedText(text.innerHTML);

    }
    useEffect(() => {
        var target = document.getElementById('edit-multiline-view')
        console.log(target)
        if (target) {
            target.outerHTML = text;
        }

    }, [text])

    return (
        <Container id="cont">
            {isUploading ? <CircularProgress size="1rem" /> : "Saved"}
            <HeaderContainer>
                <Button onClick={handleSetIsBold} variant="contained" size="small" >Bold</Button >
                <Button onClick={handleSetIsItalic} variant="contained" size="small" disableElevation={isItalic ? true : false}>Italic</Button >
            </HeaderContainer>
            <EditContainer contentEditable="true" onInput={e => handleTextChange(e.currentTarget)} id={"editContainer"} suppressContentEditableWarning={true}>
                <div id="edit-multiline-view"></div>

            </EditContainer>
        </Container >
    );
}

const Container = styled.div`
    background-color:white;
    width:100%;

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