import {
    TextField,
} from "@material-ui/core";
import React from 'react'
import useSavedState from "../../store/hooks/useSavedState"
import useInterval from "../../store/hooks/useInterval";
import { OLD_WHITE_DARK } from "../../assets/constants/Constants"
import styled from "styled-components";
import { database } from "../../services/Firebase/firebase";

type SensoTextInputProps = {
    initValue?: string,
    firebasePath: string,
    label: string,
    style?: React.CSSProperties
}
const SensoTextInput: React.FC<SensoTextInputProps> = ({ initValue, firebasePath, label, style }) => {
    const [value, setValue, saveValue, isSavedValue] = useSavedState(initValue)
    useInterval(
        () => {
            if (!isSavedValue && value) {
                saveValue()
                database.ref(firebasePath).set(value)
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

`

export default SensoTextInput