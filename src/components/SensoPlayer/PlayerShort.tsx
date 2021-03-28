import { Divider } from "@material-ui/core";
import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import getAbilityModifier from "../../utils/getAbilityModifier";

type PlayerShortProps = {
  player: IPlayer;
  isDungeonMaster: boolean;
};
const PlayerShort: React.FC<PlayerShortProps> = ({
  player,
  isDungeonMaster,
}) => {
  const translate = useTranslation();
  if (isDungeonMaster) {
    return (
      <div
        style={{
          display: "grid",
          width: "100%",
          gap: "1rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(10rem,30rem)",
        }}
      >
        <div>
          <p>{player.description}</p>
        </div>
        <div style={{ height: "10rem" }}>
          <Divider />

          <LineContainer>
            <b style={{ paddingRight: "0.2rem" }}>
              {translate.t("Armor class")}:{" "}
            </b>{" "}
            {player.stats.armorClass}
          </LineContainer>
          <LineContainer>
            <b style={{ paddingRight: "0.2rem" }}>
              {translate.t("Proficiency")}:{" "}
            </b>
            {player.stats.proficiency}
          </LineContainer>
          <LineContainer>
            <b style={{ paddingRight: "0.2rem" }}>Hp: </b>
            {player.stats.hitPoints}
          </LineContainer>
          <Divider />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,8rem)",
            }}
          >
            <div>
              <b style={{ paddingRight: "0.3rem", fontSize: "1.4rem" }}>
                {translate.t("Str")}
              </b>
              {player.stats.strength.value}(
              {getAbilityModifier(player.stats.strength.value)})
            </div>

            <div>
              <b style={{ paddingRight: "0.3rem", fontSize: "1.4rem" }}>
                {translate.t("Dex")}
              </b>
              {player.stats.dexterity.value}(
              {getAbilityModifier(player.stats.dexterity.value)})
            </div>

            <div>
              <b style={{ paddingRight: "0.3rem", fontSize: "1.4rem" }}>
                {translate.t("Con")}
              </b>
              {player.stats.constitution.value}(
              {getAbilityModifier(player.stats.constitution.value)})
            </div>

            <div>
              <b style={{ paddingRight: "0.3rem", fontSize: "1.4rem" }}>
                {translate.t("Int")}
              </b>
              {player.stats.intelligence.value}(
              {getAbilityModifier(player.stats.intelligence.value)})
            </div>
            <div>
              <b style={{ paddingRight: "0.3rem", fontSize: "1.4rem" }}>
                {translate.t("Wis")}
              </b>
              {player.stats.wisdom.value}(
              {getAbilityModifier(player.stats.wisdom.value)})
            </div>
            <div>
              <b style={{ paddingRight: "0.3rem", fontSize: "1.4rem" }}>
                {translate.t("Cha")}
              </b>
              {player.stats.charisma.value}(
              {getAbilityModifier(player.stats.charisma.value)})
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
      <p>{player.description}</p>
    </div>
  );
};
const LineContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
export default PlayerShort;
