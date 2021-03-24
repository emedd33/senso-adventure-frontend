import React from 'react'
import useSavedState from "../../store/hooks/useSavedState"
import useInterval from "../../store/hooks/useInterval";
import styled from "styled-components";
import { DatePicker } from "@material-ui/pickers";

import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { database } from '../../services/Firebase/firebase';
type SensoDateInputProps = {
    initValue?: string,
    firebasePath: string,
    label: string,
    style?: React.CSSProperties
}
const SensoDateInput: React.FC<SensoDateInputProps> = ({ initValue, firebasePath, label, style }) => {
    const [value, setValue, saveValue, isSavedValue] = useSavedState(initValue ? new Date(initValue).toDateString() : new Date().toDateString())

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

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                    autoOk
                    style={{ margin: "1rem" }}
                    clearable
                    label={label}
                    disableFuture
                    value={value}
                    onChange={(date) =>
                        setValue(
                            date ? date.toDateString() : new Date().toDateString()
                        )
                    }
                />
            </MuiPickersUtilsProvider>
        </Container>
    )
}
const Container = styled.div`

`


export default SensoDateInput