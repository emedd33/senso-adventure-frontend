import { Switch, TextField } from "@material-ui/core";
import React from "react";
import useSavedState from "../../store/hooks/useSavedState";
import useInterval from "../../store/hooks/useInterval";
import { OLD_WHITE_DARK } from "../../assets/constants/Constants";
import styled from "styled-components";
import getAbilityModifier from "../../utils/getAbilityModifier";
import { database } from "../../services/Firebase/firebase";
import { useTranslation } from "react-i18next";

type SensoPlayerAbilityInputProps = {
  initAbilityValue: IAbility;
  firebasePath: string;
  label: string;
  style?: React.CSSProperties;
  isNegativeValid?: boolean;
  proficiencyBonus?: number;
};
const SensoPlayerAbilityInput: React.FC<SensoPlayerAbilityInputProps> = ({
  initAbilityValue,
  firebasePath,
  label,
  isNegativeValid = true,
  proficiencyBonus = 0,
  style,
}) => {
  const [
    abilityValue,
    setAbilityValue,
    saveAbilityValue,
    isSavedAbilityValue,
  ] = useSavedState(initAbilityValue);
  const translate = useTranslation();
  const handleValueChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (!isNegativeValid && parseInt(event.target.value) < 0) {
      return;
    }
    setAbilityValue({ ...abilityValue, value: event.target.value });
  };
  useInterval(() => {
    if (!isSavedAbilityValue && abilityValue) {
      saveAbilityValue();
      database.ref(firebasePath).set(abilityValue);
    }
  }, 1000);
  return (
    <Container style={style}>
      <b style={{ paddingRight: "0.3rem", fontSize: "1.4rem", gridColumn: "1/3", textAlign: "center" }}>{label}</b>
      <TextField
        style={{
          backgroundColor: OLD_WHITE_DARK,
          gridColumn: "1/3",
        }}
        label={label}
        type="number"
        variant="outlined"
        onChange={handleValueChange}
        InputLabelProps={{ shrink: true }}
        value={abilityValue.value}
      />
      <p style={{ gridColumn: "1/3", marginBottom: 0 }}>
        {translate.t("Saving")}:{" "}
        {getAbilityModifier(
          abilityValue.value,
          abilityValue.isProficient,
          proficiencyBonus
        )}
      </p>
      <p style={{ marginTop: 0 }}>{translate.t("Proficiency")}</p>
      <Switch
        checked={abilityValue.isProficient === "TRUE"}
        onChange={(event) =>
          setAbilityValue({
            ...abilityValue,
            isProficient: event.target.checked ? "TRUE" : "FALSE",
          })
        }
        color="primary"
        inputProps={{ "aria-label": "primary checkbox" }}
      />
    </Container>
  );
};

const Container = styled.div`
  grid-column: 1/3;
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 10rem;
  justify-items: center;
  align-items: center;
`;

export default SensoPlayerAbilityInput;
