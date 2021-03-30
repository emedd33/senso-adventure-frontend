import { Button, Chip, TextField } from "@material-ui/core";
import React, { useState } from "react";
import useSavedState from "../../store/hooks/useSavedState";
import { OLD_WHITE_DARK } from "../../assets/constants/Constants";
import styled from "styled-components";
import { database } from "../../services/Firebase/firebase";
import { useTranslation } from "react-i18next";
type SensoTextArrayInputProps = {
  initArray?: string[];
  firebasePath: string;
  label: string;
  style?: React.CSSProperties;
};
const SensoTextArrayInput: React.FC<SensoTextArrayInputProps> = ({
  initArray,
  firebasePath,
  label,
  style,
}) => {
  const [array, setArray, saveArray] = useSavedState(initArray);
  const [newValue, setNewValue] = useState<string>("");
  const translate = useTranslation();
  const handleAddNewValue = () => {
    if (newValue) {
      if (array) {
        setArray((existingValues: string[]) => [...existingValues, newValue]);
      } else {
        setArray([newValue]);
      }

      saveArray();
      database.ref(firebasePath).set(array);
      setNewValue("")
    }
  };
  const handleDeleteValue = (elem: string) => {
    setArray((existingValues: string[]) =>
      existingValues.filter((existingvalue: string) => existingvalue !== elem)
    );
  };
  return (
    <Container style={style}>
      <div
        style={{
          display: "flex",
          gridColumn: "1/3",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <b>{label ? `${label}:` : ""}</b>

        {array
          ? array.map((elem: string, index: number) => (
            <Chip
              key={index}
              style={{ margin: "0.2rem", backgroundColor: OLD_WHITE_DARK }}
              label={elem}
              onDelete={() => handleDeleteValue(elem)}
              variant="outlined"
            />
          ))
          : null}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          justifyItems: "start",
          alignItems: "center",
        }}
      >
        <TextField
          onKeyDown={(event) =>
            event.key === "Enter" ? handleAddNewValue() : null
          }
          style={{
            marginTop: "0.5rem",
            marginRight: "0.5rem",
            backgroundColor: OLD_WHITE_DARK,
            minWidth: "10rem",
          }}
          variant="outlined"
          onChange={(event) => setNewValue(event.target.value)}
          label={label}
          value={newValue}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddNewValue}
          style={{ textTransform: "none" }}
        >
          {translate.t("Add")}
        </Button>
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  gridtemplaterows: 1fr 1fr;
  alignitems: center;
`;

export default SensoTextArrayInput;
