import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  AccordionActions,
  IconButton,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { OLD_WHITE_DARK, OLD_WHITE } from "../../assets/constants/Constants";
import DeleteIcon from "@material-ui/icons/Delete";
import styled from "styled-components";
import { database } from "../../services/Firebase/firebase";
import { useTranslation } from "react-i18next";
type SensoActionInputsProps = {
  actions?: IMonsterAction[];
  firebasePath: string;
  label: string;
  style?: React.CSSProperties;
};

const SensoActionInputs: React.FC<SensoActionInputsProps> = ({
  actions = [],
  firebasePath,
  label,
  style,
}) => {
  const [newAction, setNewAction] = useState<{ name: string, desc: string }>({ name: "", desc: "" })
  const translate = useTranslation();
  const handleAddNewValue = () => {

    database.ref(firebasePath).set([...actions, newAction]);
    setNewAction({ name: "", desc: "" })


  };
  const handleDelete = (actionIndex: number) => {
    actions.splice(actionIndex, 1)
    database.ref(firebasePath).set(actions);
    setNewAction({ name: "", desc: "" })
  }

  return (
    <Container style={style}>
      <h2>{label}</h2>
      {actions ? (
        <>
          {actions.map((action: IMonsterAction, index: number) => {
            return (
              <div key={index}>
                <Accordion

                  style={{
                    backgroundColor: OLD_WHITE,
                    marginTop: "0.2rem",
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>{action.name}</Typography>
                  </AccordionSummary>
                  <AccordionDetails
                    style={{
                      backgroundColor: OLD_WHITE_DARK,
                      display: "grid",
                      gridTemplateColumns: "auto",
                      gap: "1rem",
                    }}
                  >
                    {action.desc}
                  </AccordionDetails>
                  <AccordionActions style={{
                    backgroundColor: OLD_WHITE_DARK
                  }}>
                    <IconButton onClick={() => handleDelete(index)}>

                      <DeleteIcon color="secondary" />
                    </IconButton>
                  </AccordionActions>
                </Accordion>
              </div>
            );
          })}
        </>
      ) : null}
      <div style={{ width: "10rem", marginTop: "1rem" }}>

        <TextField
          variant="outlined"
          label={translate.t(`Name`)}
          value={newAction.name}

          style={{ backgroundColor: OLD_WHITE_DARK }}
          onChange={(event) => setNewAction({ ...newAction, name: event.target.value })}
        />
      </div>
      <TextField
        variant="outlined"
        multiline
        rows={4}
        label={translate.t(`Description`)}
        value={newAction.desc}
        style={{ backgroundColor: OLD_WHITE_DARK, width: "100%" }}
        onChange={(event) => setNewAction({ ...newAction, desc: event.target.value })}
      />
      <Button
        variant="contained"
        color="primary"
        style={{
          height: "2rem",
          margin: "1rem",
          maxWidth: "10rem",
          textTransform: "none",
        }}
        onClick={handleAddNewValue}
      >
        {translate.t("Add")}
      </Button>


    </Container>
  );
};

const Container = styled.div`
  display: grid;
  gridtemplaterows: 1fr 1fr;
  alignitems: center;
`;
export default SensoActionInputs;
