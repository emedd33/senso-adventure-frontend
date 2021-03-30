import { Divider } from "@material-ui/core";
import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import getAbilityModifier from "../../utils/getAbilityModifier";
import { SensoDescription } from ".";

type SensoMonsterShortProps = {
    monster: IMonster;
    isDungeonMaster: boolean;
};
const SensoMonsterShort: React.FC<SensoMonsterShortProps> = ({
    monster,
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
                <SensoDescription content={monster.description} />

                <div style={{ height: "10rem" }}>

                    <LineContainer>
                        <b style={{ paddingRight: "0.2rem" }}>
                            {translate.t("Challenge rating")}:{" "}
                        </b>
                        {monster.challengeRating}
                    </LineContainer>
                    <LineContainer>
                        <b style={{ paddingRight: "0.2rem" }}>
                            {translate.t("Armor class")}:{" "}
                        </b>{" "}
                        {monster.stats.armorClass}
                    </LineContainer>
                    <LineContainer>
                        <b style={{ paddingRight: "0.2rem" }}>Hp: </b>
                        {monster.stats.hitPoints}
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
                            {monster.stats.strength}(
              {getAbilityModifier(monster.stats.strength)})
            </div>

                        <div>
                            <b style={{ paddingRight: "0.3rem", fontSize: "1.4rem" }}>
                                {translate.t("Dex")}
                            </b>
                            {monster.stats.dexterity}(
              {getAbilityModifier(monster.stats.dexterity)})
            </div>

                        <div>
                            <b style={{ paddingRight: "0.3rem", fontSize: "1.4rem" }}>
                                {translate.t("Con")}
                            </b>
                            {monster.stats.constitution}(
              {getAbilityModifier(monster.stats.constitution)})
            </div>

                        <div>
                            <b style={{ paddingRight: "0.3rem", fontSize: "1.4rem" }}>
                                {translate.t("Int")}
                            </b>
                            {monster.stats.intelligence}(
              {getAbilityModifier(monster.stats.intelligence)})
            </div>
                        <div>
                            <b style={{ paddingRight: "0.3rem", fontSize: "1.4rem" }}>
                                {translate.t("Wis")}
                            </b>
                            {monster.stats.wisdom}(
              {getAbilityModifier(monster.stats.wisdom)})
            </div>
                        <div>
                            <b style={{ paddingRight: "0.3rem", fontSize: "1.4rem" }}>
                                {translate.t("Cha")}
                            </b>
                            {monster.stats.charisma}(
              {getAbilityModifier(monster.stats.charisma)})
            </div>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
            <p>{monster.description}</p>
        </div>
    );
};
const LineContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
export default SensoMonsterShort;
