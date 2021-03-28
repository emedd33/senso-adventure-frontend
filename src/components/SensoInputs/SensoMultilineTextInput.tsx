import {
    TextField,
} from "@material-ui/core";
import React from 'react'
import useSavedState from "../../store/hooks/useSavedState"
import useInterval from "../../store/hooks/useInterval";
import { OLD_WHITE_DARK } from "../../assets/constants/Constants"
import styled from "styled-components";
import { database } from "../../services/Firebase/firebase";

type SensoMultilineTextInputProps = {
    initValue?: string,
    firebasePath: string,
    label: string,
    rows: number,
    style?: React.CSSProperties
}
const SensoMultilineTextInput: React.FC<SensoMultilineTextInputProps> = ({ initValue, firebasePath, label, rows, style }) => {
    const [value, setValue, saveValue, isSavedValue] = useSavedState(initValue)

    useInterval(
        () => {
            if (!isSavedValue && value) {
                saveValue()
                database.ref(firebasePath).set(value)
            }
        }
        , 3000)
    return (
        <Container style={style}>

            <TextField
                variant="outlined"
                multiline
                rows={rows}
                label={label}
                value={value}
                style={{ backgroundColor: OLD_WHITE_DARK, width: "100%" }}
                onChange={(event) => setValue(event.target.value)}
            />
        </Container>
    )
}

const Container = styled.div`

`

export default SensoMultilineTextInput