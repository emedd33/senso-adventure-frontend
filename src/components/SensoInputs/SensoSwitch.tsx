import {
    Switch, Tooltip,
} from "@material-ui/core";
import React from 'react'
import useSavedState from "../../store/hooks/useSavedState"
import useInterval from "../../store/hooks/useInterval";
import styled from "styled-components";
import { database } from "../../firebase";

type SensoSwitchProps = {
    initValue?: string,
    firebasePath: string,
    label?: string,
    style?: React.CSSProperties
    toolTip?: string
}
const SensoSwitch: React.FC<SensoSwitchProps> = ({ initValue, firebasePath, label, toolTip, style }) => {
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
            <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", flexWrap: "wrap" }}>


                <h4 style={{ margin: "0" }}>{label ? `${label}:` : ""}</h4>
                <Tooltip title={toolTip ? toolTip : ""}>
                    <Switch
                        checked={value === "TRUE"}
                        onChange={(event) => {
                            setValue(event.target.checked ? "TRUE" : "FALSE");
                        }}
                        color="primary"
                        name="checkedB"
                        inputProps={{ "aria-label": "primary checkbox" }}
                    />
                </Tooltip>
            </div>
        </Container>
    )
}


const Container = styled.div`
display:flex;
align-items:flex-start;
justify-content:flex-start;
`

export default SensoSwitch