import { Switch } from "@material-ui/core";
import React from "react";
import useSavedState from "../../store/hooks/useSavedState";
import useInterval from "../../store/hooks/useInterval";
import getAbilityModifier from "../../utils/getAbilityModifier";
import { database } from "../../services/Firebase/firebase";

type SensoSkillInputProps = {
  abilityModifier: IAbility;
  initSkill: ISkillInfo;
  proficiencyBonus: number;
  firebasePath: string;
  label: string;
  style?: React.CSSProperties;
};
const SensoSkillInput: React.FC<SensoSkillInputProps> = ({
  abilityModifier,
  initSkill,
  proficiencyBonus = 0,
  firebasePath,
  label,
  style,
}) => {
  const [skill, setSkill, saveSkill, isSavedSkill] = useSavedState(initSkill);
  const handleValueChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    setSkill({ ...skill, proficient: checked ? "TRUE" : "FALSE" });
  };
  useInterval(() => {
    if (!isSavedSkill && skill) {
      saveSkill();
      database.ref(firebasePath).set(skill);
    }
  }, 1000);
  return (
    <tr style={style}>
      <td>{label}</td>
      <td>
        {getAbilityModifier(
          abilityModifier.value,
          skill.proficient,
          proficiencyBonus
        )}
      </td>
      <td>
        <Switch
          checked={skill.proficient === "TRUE"}
          onChange={handleValueChange}
          color="primary"
          name="checkedB"
          inputProps={{ "aria-label": "primary checkbox" }}
        />
      </td>
    </tr>
  );
};

export default SensoSkillInput;
