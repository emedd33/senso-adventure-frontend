import { Accordion, AccordionDetails, AccordionSummary, Button, AccordionActions, IconButton, TextField, TextFieldProps, } from '@material-ui/core';
import React, { useState } from 'react'
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import useSavedState from '../../store/hooks/useSavedState';
import { OLD_WHITE_DARK } from '../../assets/constants/Constants';
import DeleteIcon from "@material-ui/icons/Delete";
import styled from "styled-components";
import useInterval from '../../store/hooks/useInterval';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { database } from '../../firebase';

type SensoActionInputsProps = {
    actions?: IMonsterAction[],
    firebasePath: string,
    label: string,
    style?: React.CSSProperties
}

const SensoActionInputs: React.FC<SensoActionInputsProps> = ({ actions = [], firebasePath, label, style }) => {
    const [array, setArray, saveArray, isSavedArray] = useSavedState(actions)
    const [newValue, setNewValue] = useState<{ name: string, description: string } | undefined>({ name: "", description: "" })
    const [newInputValue, setNewInputValue] = useState<string>("")

    const handleAddNewValue = () => {
        if (newValue) {
            if (array) {
                setArray((existingValues: any[]) => [
                    ...existingValues,
                    newValue,
                ])
            } else {
                setArray([newValue])
            }
        }
    }
    useInterval(
        () => {
            if (!isSavedArray && array) {
                saveArray()
                database.ref(firebasePath).set(array)
            }
        }
        , 1000)
    return (
        <Container style={style}>


            <Button
                variant="contained"
                color="primary"
                style={{ height: "2rem", margin: "1rem", maxWidth: "10rem" }}
                onClick={handleAddNewValue}
            >
                Add new
        </Button>
            {array ? array.map((action: IMonsterAction, index: number) => (
                <Accordion key={index} style={{ backgroundColor: OLD_WHITE_DARK }}
                >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        {action.name}
                    </AccordionSummary>
                    <AccordionDetails
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <div style={{ display: "grid", gridTemplateColumns: "1fr" }}>
                            <h3>Description</h3>
                            <TextField
                                label="Description"
                                multiline
                                style={{ backgroundColor: OLD_WHITE_DARK, width: "100%" }}
                                rows={4}
                                value={action.desc}
                                onChange={(event) => {

                                    if (event.target.value.length < 400) {
                                        if (array) {
                                            setArray((existingValues: IMonsterAction[]) => {
                                                existingValues[index].desc = event.target.value;
                                                return [...existingValues];
                                            });
                                        }
                                    }
                                }}
                                variant="filled"
                            />
                            <h2>TODO DAMAGE</h2>
                            {/* <div style={{ display: "flex", alignItems: "center" }}>
                                {action.damage ? action.damage.map((dmg: IMonsterDamage, dmgIndex: number) =>
                                    <div key={dmgIndex}><TextField

                                        label="Damage type"
                                        style={{ backgroundColor: OLD_WHITE_DARK }}
                                        value={dmg.damage_type.name}
                                        placeholder="Slashing"
                                        onChange={(event) => {
                                            if (array && event.target.value) {
                                                setArray((existingActions: IMonsterAction[]) => {
                                                    let tempAction = existingActions[index]
                                                    if (tempAction.damage) {
                                                        let tempDmg = tempAction.damage[dmgIndex]
                                                        tempDmg.damage_type.name = event.target.value
                                                        tempDmg.damage_type.index = event.target.value.replace(/\s/g, "")

                                                        tempAction.damage[dmgIndex] = tempDmg
                                                        existingActions[index] = tempAction
                                                    }
                                                    return [...existingActions]
                                                })
                                            }

                                        }}
                                        variant="filled"
                                    />
                                        <TextField
                                            label="Damage dice"
                                            placeholder="2d8+2"
                                            style={{ backgroundColor: OLD_WHITE_DARK }}
                                            value={dmg.damage_dice}
                                            onChange={(event) => {
                                                if (array && event.target.value) {
                                                    setArray((existingActions: IMonsterAction[]) => {
                                                        let tempAction = existingActions[index]
                                                        if (tempAction.damage) {
                                                            let tempDmg = tempAction.damage[dmgIndex]
                                                            tempDmg.damage_dice = event.target.value

                                                            tempAction.damage[dmgIndex] = tempDmg
                                                            existingActions[index] = tempAction
                                                        }
                                                        return [...existingActions]
                                                    })
                                                }

                                            }}
                                            variant="filled"
                                        /></div>
                                ) : null}

                            <Button variant="contained" color="primary" style={{ width: "10rem" }} onClick={() => {
                                if (array) {
                                    setArray((existingActions: IMonsterAction[]) => {
                                        let newActions = existingActions
                                        let tempDamage = newActions[index].damage
                                        console.log("hei")
                                        if (tempDamage) {
                                            tempDamage.push({ damage_dice: "", damage_type: { name: "", index: "", url: "" } })
                                        } else {
                                            newActions[index].damage = [{ damage_dice: "", damage_type: { name: "", index: "", url: "" } }]
                                        }
                                        return newActions
                                    })
                                }
                            }}
                            >Add damage</Button>
                            </div> */}
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <TextField
                                    label="DC saving throw"
                                    placeholder="STR"
                                    style={{ backgroundColor: OLD_WHITE_DARK }}
                                    value={action.dc?.dc_type.name}
                                    onChange={(event) => {
                                        // setArray((existingValues: IMonsterAction[]) => {
                                        //     console.log(existingValues[index])
                                        // })

                                    }}
                                    variant="filled"
                                />
                                <TextField
                                    label="DC value"
                                    type="number"
                                    placeholder="15"
                                    style={{ backgroundColor: OLD_WHITE_DARK }}
                                    value={action.dc?.dc_value}
                                    onChange={(event) => {
                                        // setArray((existingValues: IMonsterAction[]) => {
                                        //     console.log(existingValues[index])
                                        // })

                                    }}
                                    variant="filled"
                                />
                                <TextField
                                    label="Success"
                                    style={{ backgroundColor: OLD_WHITE_DARK }}
                                    value={action.dc?.success_type}
                                    placeholder="half damage"
                                    onChange={(event) => {
                                        // setArray((existingValues: IMonsterAction[]) => {
                                        //     console.log(existingValues[index])
                                        // })

                                    }}
                                    variant="filled"
                                />

                            </div>

                        </div>
                    </AccordionDetails>
                    <AccordionActions>
                        <IconButton
                            onClick={() =>
                                setArray((existingValues: any[]) =>
                                    existingValues.filter(
                                        (existingAction: any) =>
                                            existingAction.index !== index
                                    )
                                )
                            }
                        >
                            <DeleteIcon
                                color="secondary"
                            />
                        </IconButton>
                    </AccordionActions>
                </Accordion>)) : null
            }
        </Container >)
}


const Container = styled.div`
display: grid;
gridTemplateRows: 1fr 1fr;
alignItems: center;
`
export default SensoActionInputs