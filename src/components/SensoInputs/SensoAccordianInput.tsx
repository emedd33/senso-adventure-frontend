import { Accordion, AccordionDetails, AccordionSummary, Button, IconButton, TextField, TextFieldProps, } from '@material-ui/core';
import React, { useState } from 'react'
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import useSavedState from '../../store/hooks/useSavedState';
import { OLD_WHITE_DARK } from '../../assets/constants/Constants';
import DeleteIcon from "@material-ui/icons/Delete";
import styled from "styled-components";
import useInterval from '../../store/hooks/useInterval';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { database } from '../../firebase';

type SensoAccordianInputProps = {
    initArray?: any[],
    firebasePath: string,
    label: string,
    choices?: { title: string, content: any }[],
    style?: React.CSSProperties
}

const SensoAccordianInput: React.FC<SensoAccordianInputProps> = ({ initArray = [], firebasePath, label, style, choices }) => {
    const [array, setArray, saveArray, isSavedArray] = useSavedState(Object.values(initArray))
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
            {choices ?
                <Autocomplete
                    id="combo-box-demo"
                    options={choices}
                    getOptionLabel={(option: { title: any; }) => option.title}
                    style={{ width: "15rem" }}
                    onChange={(event: any, newValue: { title: string, content: any } | null) => {
                        if (newValue) {
                            setNewValue({ name: newValue.title, description: "" });
                        } else {
                            setNewValue(undefined)
                        }
                    }}
                    inputValue={newInputValue}
                    onInputChange={(event, newInputValue) => {
                        setNewInputValue(newInputValue);
                    }}
                    renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) => <TextField {...params} style={{ backgroundColor: OLD_WHITE_DARK }} label="" variant="outlined" />}
                />
                :
                <TextField
                    variant="outlined"
                    label={label}
                    value={newValue ? newValue.name : ""}
                    style={{ backgroundColor: OLD_WHITE_DARK }}
                    onChange={(event) => {
                        setNewValue({ name: event.target.value, description: "" });
                    }}
                />
            }
            <Button
                variant="contained"
                color="primary"
                style={{ height: "2rem", margin: "1rem", maxWidth: "10rem" }}
                onClick={handleAddNewValue}
            >
                Add new
            </Button>
            {array ? array.map((value: any, index: number) => (
                <Accordion key={index} style={{ backgroundColor: OLD_WHITE_DARK }}
                >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        {value.name}
                    </AccordionSummary>
                    <AccordionDetails
                        style={{
                            display: "grid",
                            gridTemplateColumns: "4fr 1fr",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <TextField
                            label="Action description"
                            multiline
                            style={{ backgroundColor: OLD_WHITE_DARK }}
                            rows={4}
                            value={value.description}
                            onChange={(event) => {

                                if (event.target.value.length < 400) {
                                    setArray((existingValues: any[]) => {
                                        existingValues[index].description = event.target.value;
                                        return [...existingValues];
                                    });
                                }
                            }}
                            variant="filled"
                        />
                        <IconButton
                            onClick={() =>
                                setArray((existingValues: any[]) =>
                                    existingValues.filter(
                                        (existingAction: any) =>
                                            existingAction.name !== value.name
                                    )
                                )
                            }
                        >
                            <DeleteIcon
                                color="secondary"
                            />
                        </IconButton>
                    </AccordionDetails>
                </Accordion>)) : null}
        </Container>
    )
}


const Container = styled.div`
display: grid;
gridTemplateRows: 1fr 1fr;
alignItems: center;
`
export default SensoAccordianInput