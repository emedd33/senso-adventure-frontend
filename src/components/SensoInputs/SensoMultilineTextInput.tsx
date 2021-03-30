import { Button, TextField } from "@material-ui/core";
import React from "react";
import useSavedState from "../../store/hooks/useSavedState";
import { OLD_WHITE_DARK } from "../../assets/constants/Constants";
import styled from "styled-components";
import { database } from "../../services/Firebase/firebase";
import { useTranslation } from "react-i18next";

type SensoMultilineTextInputProps = {
  initValue?: string;
  firebasePath: string;
  label: string;
  rows: number;
  style?: React.CSSProperties;
};
const SensoMultilineTextInput: React.FC<SensoMultilineTextInputProps> = ({
  initValue,
  firebasePath,
  label,
  rows,
  style,
}) => {
  const [value, setValue, saveValue, isSavedValue] = useSavedState(initValue);
  const translate = useTranslation()
  const saveText = () => {
    if (!isSavedValue) {
      database.ref(firebasePath).set(value);
      saveValue()
    }
  }
  return (
    <Container style={style}>
      <TextField
        variant="outlined"
        multiline
        rows={rows}
        label={label}
        value={value}
        style={{ backgroundColor: OLD_WHITE_DARK, width: "100%" }}
        onChange={(event) => setValue(event.target.value)}
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
        onClick={saveText}
      >
        {translate.t("Save")}
      </Button>
    </Container>
  );
};

const Container = styled.div``;

export default SensoMultilineTextInput;
