import {
    TextField,
} from "@material-ui/core";
import React from 'react'
import useSavedState from "../../store/hooks/useSavedState"
import useInterval from "../../store/hooks/useInterval";
import { databaseRef } from "../../firebase"
import styled from "styled-components";

type ChaNumberInputProps = {
    initValue?: number,
    firebasePath: string,
    label: string,
    isNegativeValid: boolean,
    style?: React.CSSProperties
}
const ChaNumberInput: React.FC<ChaNumberInputProps> = ({ initValue, firebasePath, label, isNegativeValid, style }) => {
    const [value, setValue, saveValue, isSavedValue] = useSavedState(initValue)
    const handleValueChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        if (!isNegativeValid && parseInt(event.target.value) < 0) {
            return
        }
        setValue(event.target.value)
    }
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
                type="number"
                value={value}
                onChange={handleValueChange}
            />
        </Container>
    )
}
const Container = styled.div`

`


export default ChaNumberInput