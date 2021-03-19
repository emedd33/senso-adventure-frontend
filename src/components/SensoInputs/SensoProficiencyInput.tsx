import {
    Button,
    TextField,
} from "@material-ui/core";
import React, { useState } from 'react'
import useSavedState from "../../store/hooks/useSavedState"
import useInterval from "../../store/hooks/useInterval";
import { OLD_WHITE_DARK } from "../../assets/constants/Constants"
import styled from "styled-components";
import { database } from "../../firebase";
import DeleteIcon from '@material-ui/icons/Delete';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

type SensoProficiencyInputProps = {
    initProficiencies: IMonsterProficiency[],
    firebasePath: string,
    style?: React.CSSProperties
}
const SensoProficiencyInput: React.FC<SensoProficiencyInputProps> = ({ initProficiencies, firebasePath, style }) => {
    const [proficies, setArray, saveArray, isSavedArray] = useSavedState(initProficiencies)
    const [newValue, setNewValue] = useState<number | undefined>()
    const [newKey, setNewKey] = useState<string | undefined>()
    const [newKeyError, setNewKeyError] = useState(false)

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
            {proficies ? proficies.map((prof: IMonsterProficiency) =>
                <List component="nav" aria-label="main mailbox folders">
                    <ListItem button>
                        <ListItemText primary={`${prof.proficiency.name}`} />
                        <ListItemText primary={`${prof.value}`} />
                        <ListItemIcon onClick={() => deleteProfiency(prof)}>
                            <DeleteIcon />
                        </ListItemIcon>
                    </ListItem>
                </List>
            ) : null}
            <div style={{
                display: "flex", justifyContent: "center",
                alignItems: "center"
            }}>

                <TextField
                    variant="outlined"
                    label={"Proficiency"}
                    value={newKey}
                    error={newKeyError}
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
                <Button onClick={handleAddNewValue}>Add</Button>
            </div>
        </Container>
    )
}


const Container = styled.div`

`

export default SensoProficiencyInput