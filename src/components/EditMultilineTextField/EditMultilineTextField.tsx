import { useEffect, useState } from "react"
import Button from '@material-ui/core/Button';
import styled from "styled-components";
export interface EditMultilineTextFieldProps {

}

const EditMultilineTextField: React.FC<EditMultilineTextFieldProps> = () => {
    const [isBold, setIsBold] = useState(false)
    const [text, setText] = useState("This is text")
    const handleSetIsBold = () => {
        setIsBold(!isBold)
        document.execCommand('bold')
    }
    const handleTextChange = (text: any) => {
        var target = document.getElementById('editContainer');
        var wrap = document.createElement('div');
        if (target) {
            wrap.appendChild(target.cloneNode(true));
            setText(wrap.innerHTML);
        }
    }
    useEffect(() => {
        var target = document.getElementById('edit-multiline-view')
        if (target) {
            target.outerHTML = text;
        }

    }, [text])

    return (
        <Container>
            <HeaderContainer>

                <Button onClick={handleSetIsBold} variant="contained" size="small" disableElevation={isBold ? false : true}>Bold</Button >
            </HeaderContainer>
            <EditContainer contentEditable="true" onInput={e => handleTextChange(e.currentTarget)} id={"editContainer"}>
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