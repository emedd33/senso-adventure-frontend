import {
    Button,
    Chip,
    TextField,
} from "@material-ui/core";
import React, { useState } from 'react'
import useSavedState from "../../store/hooks/useSavedState"
import useInterval from "../../store/hooks/useInterval";
import { OLD_WHITE_DARK } from "../../assets/constants/Constants"
import styled from "styled-components";
import { database } from "../../services/Firebase/firebase";

type SensoProficiencyInputProps = {
    initProficiencies: IMonsterProficiency[],
    firebasePath: string,
    style?: React.CSSProperties
}
const SensoProficiencyInput: React.FC<SensoProficiencyInputProps> = ({ initProficiencies, firebasePath, style }) => {
    const [proficies, setArray, saveArray, isSavedArray] = useSavedState(initProficiencies)
    const [newValue, setNewValue] = useState<number | undefined>()
    const [newKey, setNewKey] = useState<string | undefined>()

    const handleAddNewValue = () => {
        if (newValue && newKey) {
            if (proficies) {
                setArray((existingValues: IMonsterProficiency[]) => [
                    ...existingValues,
                    { value: newValue, proficiency: { name: newKey, index: newKey.replace(/\s/g, ""), url: "" } },
                ])
            } else {
                setArray([newValue])
            }
        }
    }
    const deleteProfiency = (proficiency: IMonsterProficiency) => {
        setArray((existingValues: IMonsterProficiency[]) =>
            existingValues.filter(
                (existingvalue: IMonsterProficiency) =>
                    existingvalue.proficiency.index !== proficiency.proficiency.index
            )
        )
    }
    useInterval(
        () => {
            if (!isSavedArray && proficies) {
                saveArray()
                database.ref(firebasePath).set(proficies)
            }
        }
        , 1000)
    return (
        <Container style={style}>
            <div style={{ display: "flex", gridColumn: "1/3", flexWrap: "wrap", alignItems: "center" }}>
                <b>Proficiencies:</b>
                {proficies ? proficies.map((prof: IMonsterProficiency, index: number) =>
                    <Chip
                        key={index}
                        style={{ margin: "0.2rem", backgroundColor: OLD_WHITE_DARK }}
                        label={`${prof.proficiency.name}:${prof.value}`}
                        onDelete={() => deleteProfiency(prof)}


                        variant="outlined"
                    />
                ) : null}
            </div>
            <div style={{
                display: "flex", justifyContent: "flex-start",
                alignItems: "center"
            }}>

                <TextField
                    variant="outlined"
                    label={"Proficiency"}
                    value={newKey}
                    style={{ backgroundColor: OLD_WHITE_DARK }}
                    onChange={(event) => setNewKey(event.target.value)}
                />
                <TextField
                    variant="outlined"
                    label={"Value"}
                    type="number"
                    value={newValue}
                    style={{ backgroundColor: OLD_WHITE_DARK }}
                    onChange={(event) => setNewValue(parseInt(event.target.value))}
                />
                <Button variant={"contained"} color="primary" onClick={handleAddNewValue}>Add</Button>
            </div>
        </Container>
    )
}


const Container = styled.div`

`

export default SensoProficiencyInput