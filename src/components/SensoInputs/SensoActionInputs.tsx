import { Accordion, AccordionDetails, AccordionSummary, Button, AccordionActions, IconButton, TextField, } from '@material-ui/core';
import React from 'react'
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import useSavedState from '../../store/hooks/useSavedState';
import { OLD_WHITE_DARK } from '../../assets/constants/Constants';
import DeleteIcon from "@material-ui/icons/Delete";
import styled from "styled-components";
import useInterval from '../../store/hooks/useInterval';
import { database } from '../../services/Firebase/firebase';
import { useTranslation } from 'react-i18next';

type SensoActionInputsProps = {
    actions?: IMonsterAction[],
    firebasePath: string,
    label: string,
    style?: React.CSSProperties
}

const NEW_ACTION = { name: "New Action", description: "" }
const SensoActionInputs: React.FC<SensoActionInputsProps> = ({ actions = [], firebasePath, label, style }) => {
    const [array, setArray, saveArray, isSavedArray] = useSavedState(actions)
    const translate = useTranslation()
    const handleAddNewValue = () => {
        if (array) {
            setArray((existingValues: any[]) => [
                ...existingValues,
                NEW_ACTION,
            ])
        } else {
            setArray([NEW_ACTION])
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



            {array ? array.map((action: IMonsterAction, index: number) => (
                <Accordion key={index} style={{ backgroundColor: OLD_WHITE_DARK }}
                >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <TextField
                            variant="outlined"
                            label={label}
                            value={action.name}
                            style={{ backgroundColor: OLD_WHITE_DARK }}
                            onChange={(event) => {

                                if (array) {
                                    setArray((existingValues: IMonsterAction[]) => {
                                        existingValues[index].name = event.target.value;
                                        return [...existingValues];
                                    });
                                }
                            }}
                        />
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
                                label={translate.t('Description')}
                                multiline
                                style={{ backgroundColor: OLD_WHITE_DARK, width: "100%" }}
                                rows={6}
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



                        </div>
                    </AccordionDetails>
                    <AccordionActions>
                        <IconButton
                            onClick={() => {
                                setArray((existingValues: any[]) =>
                                    existingValues.filter(
                                        (existingAction: any) =>
                                            existingAction.splice(index, index)
                                    )
                                )
                            }
                            }
                        >
                            <DeleteIcon
                                color="secondary"
                            />
                        </IconButton>
                    </AccordionActions>
                </Accordion>)) : null
            }
            <Button
                variant="contained"
                color="primary"
                style={{ height: "2rem", margin: "1rem", maxWidth: "10rem", textTransform:"none" }}
                onClick={handleAddNewValue}
            >
                {translate.t('Add new')}
        </Button>
        </Container >)
}

const Container = styled.div`
display: grid;
gridTemplateRows: 1fr 1fr;
alignItems: center;
`
export default SensoActionInputs