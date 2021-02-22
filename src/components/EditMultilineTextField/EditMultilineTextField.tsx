import React, { useEffect, useState } from "react"
import styled from "styled-components";
import { useSelector } from "react-redux";
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import { storage } from "../../firebase";
import CircularProgress from '@material-ui/core/CircularProgress';
import useInterval from "../../store/hooks/useInterval";
import IconButton from '@material-ui/core/IconButton';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { parseSessionStory } from "../../utils/paseSessionStory";
export interface EditMultilineTextFieldProps {

}

const EditMultilineTextField: React.FC<EditMultilineTextFieldProps> = () => {
    const [isUploading, setIsUploading] = useState(false)
    const [text, setText] = useState<undefined | string>()
    const [editedText, setEditedText] = useState<undefined | string>()

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
        document.execCommand('bold')
    }
    const handleSetIsItalic = () => {
        document.execCommand('italic')
    }
    const handleAddBullet = () => {
        var target = document.getElementById('edit-multiline-view')
        var parentContainer = document.createElement("div");
        var parentNode = document.createElement("ul");                 // Create a <li> node
        var node = document.createElement("li");                 // Create a <li> node
        parentNode.appendChild(node);
        parentContainer.appendChild(parentNode)                         // Append the text to <li>
        target?.appendChild(parentNode);
    }
    const handleAddSecret = () => {
        let text = ""
        var parent = document.getElementById('edit-multiline-view')
        if (window.getSelection()?.toString()) {
            text = window.getSelection()!.toString();
        }
        let secretNode = "<secret>" + text + "</secret>"
        var node = document.createElement("p");
        node.textContent = secretNode
        parent?.appendChild(node)


        // var parentNode = document.createElement("ul");                 // Create a <li> node
        // parentNode.appendChild(node);
        // parentContainer.appendChild(parentNode)                         // Append the text to <li>
        // target?.appendChild(parentNode);
    }
    function sleep(time: number) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }
    useInterval(async () => {    // Your custom logic here 
        console.log(text)
        if (editedText !== undefined && text !== editedText) {
            console.log("uploading")
            setText(editedText)
            setIsUploading(true)
            storageRef
                .child("SessionStory.html")
                .putString(editedText!)
            sleep(1000).then(() => {
                setIsUploading(false)
            });


        }
    },
        5000)
    const handleTextChange = (text: any) => {
        setEditedText(text.innerHTML);
    }
    useEffect(() => {
        storageRef.child("SessionStory.html")
            .getDownloadURL()
            .then((url) => fetch(url))
            .then(res => res.text())
            .then(res => {
                setText(res!);
                var target = document.getElementById('edit-multiline-view')
                if (target) {
                    target.innerHTML = parseSessionStory(res, true);
                }
            })
            .catch(e => console.log(e))
    }
        , [])

    return (
        <Container id="cont">
            <HeaderContainer>
                <div style={{ display: "flex", justifyContent: "flex-start", alignContent: "center" }}>
                    <IconButton aria-label="Bold">
                        <FormatBoldIcon onClick={handleSetIsBold} />
                    </IconButton>
                    <IconButton aria-label="Italic" onClick={handleSetIsItalic}>
                        <FormatItalicIcon />
                    </IconButton>
                    <IconButton aria-label="Bullets" onClick={handleAddBullet}>
                        <FormatListBulletedIcon />
                    </IconButton>
                    <IconButton aria-label="Bullets" onClick={handleAddSecret}>
                        <VpnKeyIcon />
                    </IconButton>
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end", alignContent: "center", paddingRight: "1rem" }}>
                    {isUploading ? <CircularProgress size="1rem" /> : " "}
                </div>
            </HeaderContainer>
            <EditContainer contentEditable="true" onInput={e => handleTextChange(e.currentTarget)} id={"editContainer"} suppressContentEditableWarning={true}>
                <div id="edit-multiline-view" ></div>

            </EditContainer>
        </Container >
    );
}

const Container = styled.div`
width:100%;
font-family:sans-serif;
min-height:20rem;

`
const HeaderContainer = styled.div`
justify-content:space-between;
align-items: center;
display:flex;
background-color:lightgray;
`
const EditContainer = styled.div`
margin:1rem;
min-height:20rem;
background-color:white;
border-style: inset;
padding:1rem;
font-family:sans-serif;

`

export default EditMultilineTextField;