import {
    TextField,
} from "@material-ui/core";
import React from 'react'
import useSavedState from "../../store/hooks/useSavedState"
import useInterval from "../../store/hooks/useInterval";
import { databaseRef } from "../../firebase"
import { OLD_WHITE_DARK } from "../../assets/constants/Constants"
import styled from "styled-components";

type ChaTextInputProps = {
    initValue?: string,
    firebasePath: string,
    label: string,
    style?: React.CSSProperties
}
const ChaTextInput: React.FC<ChaTextInputProps> = ({ initValue, firebasePath, label, style }) => {
    const [value, setValue, saveValue, isSavedValue] = useSavedState(initValue)
    useInterval(
        () => {
            if (!isSavedValue && value) {
                saveValue()
                databaseRef.child(firebasePath).set(value)
            }
        }
        , 1000)
    return (
        <Container style={style}>

            <TextField
                variant="outlined"
                label={label}
                value={value}
                style={{ backgroundColor: OLD_WHITE_DARK }}
                onChange={(event) => setValue(event.target.value)}
            />
        </Container>
    )
}


const Container = styled.div`
display: grid;
gridTemplateRows: 1fr 1fr;
alignItems: center;
`

export default ChaTextInput