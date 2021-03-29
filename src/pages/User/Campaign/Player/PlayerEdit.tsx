import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import {
    SensoTextInput,
    SensoNumberInput,
    SensoSwitch,
    SensoTextArrayInput,
    SensoMultilineTextInput,
    SensoAccordianInput,
    SensoAbilityInput,
    SensoSkillInput,
    SensoDelete,
} from "../../../../components/SensoInputs";

import {
    getSelectedCampaign,
    getSelectedPlayer,
    getSelectedPlayerStoragePath,
    isDungeonMasterSelector,
    getSelectedPlayerDatabasePath,
} from "../../../../store/selected/selectedSelectors";
import styled from "styled-components";
import { OLD_WHITE } from "../../../../assets/constants/Constants";
import IsLoading from "../../../../components/IsLoading/IsLoading";

import { Divider } from "@material-ui/core";
import useOwner from "../../../../store/hooks/useOwner";
import { useTranslation } from "react-i18next";
import SensoDraftJS from "../../../../components/SensoDraftJS/SensoDraftJS";
type PlayerEditProps = {};
const PlayerEdit: FunctionComponent<PlayerEditProps> = () => {
    const selectedPlayer: ISelectedPlayer | undefined = useSelector(
        getSelectedPlayer
    );
    const selectedCampaign: ISelectedCampaign | undefined = useSelector(
        getSelectedCampaign
    );
    const isDungeonMaster = useSelector(isDungeonMasterSelector);
    const owner = useOwner();

    const playerStoragePath = useSelector(getSelectedPlayerStoragePath);
    const playerDatabsePath = useSelector(getSelectedPlayerDatabasePath);
    const translate = useTranslation();
    if (selectedPlayer === undefined || selectedCampaign === undefined) {
        return (
            <Container>
                <IsLoading />
            </Container>
        );
    }
    return (
        <Container>
            <div style={{ gridColumn: "1/3" }}>
                <h1 style={{ marginBottom: "0" }}>
                    {selectedPlayer.player.name}{" "}
                    {selectedPlayer.player.isPublished === "FALSE"
                        ? `(${translate.t("Not published")})`
                        : null}
                </h1>
            </div>

            <SensoTextArrayInput
                initArray={selectedPlayer.player.nickNames}
                label={translate.t("Also known as")}
                firebasePath={`${playerDatabsePath}/nickNames`}
            />
            <SensoSwitch
                initValue={selectedPlayer.player.isPublished}
                firebasePath={`${playerDatabsePath}/isPublished`}
                label={translate.t("Is published")}
                toolTip={translate.t(
                    "Published means that it's visible for other users"
                )}
            />
            <div style={{ gridColumn: "1/3" }}>
                <Divider />
            </div>
            <h2 style={{ gridColumn: "1/3", textAlign: "center" }}>
                {translate.t("Basic info")}
            </h2>
            <SensoTextInput
                initValue={selectedPlayer.player.race}
                firebasePath={`${playerDatabsePath}/race`}
                label={translate.t("Race")}
            />
            <SensoTextInput
                initValue={selectedPlayer.player.class}
                firebasePath={`${playerDatabsePath}/class`}
                label={translate.t("Class")}
            />
            <SensoTextInput
                initValue={selectedPlayer.player.alignment}
                firebasePath={`${playerDatabsePath}/alignment`}
                label={translate.t("Alignment")}
            />

            <SensoNumberInput
                initValue={selectedPlayer.player.level}
                firebasePath={`${playerDatabsePath}/level`}
                label={translate.t("Level")}
                isNegativeValid={false}
                style={{ width: "10rem" }}
            />

            <div style={{ gridColumn: "1/3" }}>
                <SensoMultilineTextInput
                    initValue={selectedPlayer.player.description}
                    firebasePath={`${playerDatabsePath}/description`}
                    label={translate.t("Description")}
                    rows={4}
                />
            </div>
            <div style={{ gridColumn: "1/3" }}>
                <Divider />
            </div>
            <h2 style={{ gridColumn: "1/3", textAlign: "center" }}>
                {translate.t("Player stats")}
            </h2>
            <SensoNumberInput
                initValue={selectedPlayer.player.stats.armorClass}
                firebasePath={`${playerDatabsePath}/stats/armorClass`}
                label={translate.t("Armor class")}
                isNegativeValid={false}
            />
            <SensoNumberInput
                initValue={selectedPlayer.player.stats.speed}
                firebasePath={`${playerDatabsePath}/stats/speed/`}
                label={translate.t("Speed")}
                isNegativeValid={false}
            />
            <SensoNumberInput
                initValue={selectedPlayer.player.stats.proficiency}
                firebasePath={`${playerDatabsePath}/stats/proficiency`}
                label="Proficiency bonus"
                isNegativeValid={false}
            />
            <SensoNumberInput
                initValue={selectedPlayer.player.stats.hitPoints}
                firebasePath={`${playerDatabsePath}/stats/hitpoints`}
                label="hp"
                isNegativeValid={false}
            />
            <SensoSwitch
                initValue={selectedPlayer.player.stats.inspiration}
                firebasePath={`${playerDatabsePath}/stats/inspiration`}
                label={translate.t("Inspiration")}
            />

            <div style={{ display: "grid", gridTemplateColumns: "1fr" }}>
                <p>
                    <b>{translate.t("Passive perception")}:</b>
                    {selectedPlayer.player.stats.wisdom.value}
                </p>
                <i>{translate.t("Calculated from wisdom")}</i>
            </div>
            <SensoTextArrayInput
                initArray={selectedPlayer.player.senses}
                firebasePath={`${playerDatabsePath}/senses`}
                label={translate.t("Senses")}
            />
            <SensoTextArrayInput
                initArray={selectedPlayer.player.immunities}
                firebasePath={`${playerDatabsePath}/immunities`}
                label={translate.t("Immunities")}
            />
            <div
                style={{
                    display: "flex",
                    gridColumn: "1/3",
                    justifyContent: "flex-start",
                    flexWrap: "wrap",
                }}
            >
                <SensoAbilityInput
                    initAbilityValue={selectedPlayer.player.stats.strength}
                    firebasePath={`${playerDatabsePath}/stats/strength`}
                    label={translate.t("Str")}
                    proficiencyBonus={selectedPlayer.player.stats.proficiency}
                />
                <SensoAbilityInput
                    initAbilityValue={selectedPlayer.player.stats.dexterity}
                    firebasePath={`${playerDatabsePath}/stats/dexterity`}
                    label={translate.t("Dex")}
                    proficiencyBonus={selectedPlayer.player.stats.proficiency}
                />

                <SensoAbilityInput
                    initAbilityValue={selectedPlayer.player.stats.constitution}
                    firebasePath={`${playerDatabsePath}/stats/constitution`}
                    label={translate.t("Con")}
                    proficiencyBonus={selectedPlayer.player.stats.proficiency}
                />

                <SensoAbilityInput
                    initAbilityValue={selectedPlayer.player.stats.intelligence}
                    firebasePath={`${playerDatabsePath}/stats/intelligence`}
                    label={translate.t("Int")}
                    proficiencyBonus={selectedPlayer.player.stats.proficiency}
                />

                <SensoAbilityInput
                    initAbilityValue={selectedPlayer.player.stats.wisdom}
                    firebasePath={`${playerDatabsePath}/stats/wisdom`}
                    label={translate.t("Wis")}
                    proficiencyBonus={selectedPlayer.player.stats.proficiency}
                />

                <SensoAbilityInput
                    initAbilityValue={selectedPlayer.player.stats.charisma}
                    firebasePath={`${playerDatabsePath}/stats/charisma`}
                    label={translate.t("Cha")}
                    proficiencyBonus={selectedPlayer.player.stats.proficiency}
                />
            </div>
            <div style={{ gridColumn: "1/3", display: "flex", flexWrap: "wrap" }}>
                <table style={{ border: "double", margin: "1rem" }}>
                    <thead>
                        <tr>
                            <th>{translate.t("Proficiency")}</th>
                            <th>{translate.t("Modifier")}</th>
                            <th>{translate.t("Skill")}</th>
                        </tr>
                        <tr>
                            <th>
                                <Divider />
                            </th>
                            <th>
                                <Divider />
                            </th>
                            <th>
                                <Divider />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <SensoSkillInput
                            abilityModifier={selectedPlayer.player.stats.dexterity}
                            initSkill={selectedPlayer.player.stats.skills.acrobatics}
                            proficiencyBonus={selectedPlayer.player.stats.proficiency}
                            firebasePath={`${playerDatabsePath}/stats/skills/acrobatics`}
                            label={`${translate.t("Acrobatics")} (${translate.t("Dex")})`}
                        />
                        <SensoSkillInput
                            initSkill={selectedPlayer.player.stats.skills.animalHandling}
                            firebasePath={`${playerDatabsePath}/stats/skills/animalHandling`}
                            abilityModifier={selectedPlayer.player.stats.dexterity}
                            label={`${translate.t("Animal Handling")} (${translate.t(
                                "Dex"
                            )})`}
                            proficiencyBonus={selectedPlayer.player.stats.proficiency}
                        />
                        <SensoSkillInput
                            initSkill={selectedPlayer.player.stats.skills.arcana}
                            firebasePath={`${playerDatabsePath}/stats/skills/arcana`}
                            abilityModifier={selectedPlayer.player.stats.intelligence}
                            label={`${translate.t("Arcana")} (${translate.t("Int")})`}
                            proficiencyBonus={selectedPlayer.player.stats.proficiency}
                        />
                        <SensoSkillInput
                            initSkill={selectedPlayer.player.stats.skills.athletics}
                            firebasePath={`${playerDatabsePath}/stats/skills/athletics`}
                            abilityModifier={selectedPlayer.player.stats.strength}
                            label={`${translate.t("Athletics")} (${translate.t("Str")})`}
                            proficiencyBonus={selectedPlayer.player.stats.proficiency}
                        />
                        <SensoSkillInput
                            initSkill={selectedPlayer.player.stats.skills.deception}
                            firebasePath={`${playerDatabsePath}/stats/skills/deception`}
                            abilityModifier={selectedPlayer.player.stats.charisma}
                            label={`${translate.t("Deception")} (${translate.t("Cha")})`}
                            proficiencyBonus={selectedPlayer.player.stats.proficiency}
                        />
                        <SensoSkillInput
                            initSkill={selectedPlayer.player.stats.skills.history}
                            firebasePath={`${playerDatabsePath}/stats/skills/history`}
                            abilityModifier={selectedPlayer.player.stats.intelligence}
                            label={`${translate.t("History")} (${translate.t("Int")})`}
                            proficiencyBonus={selectedPlayer.player.stats.proficiency}
                        />
                    </tbody>
                </table>
                <table style={{ border: "double", margin: "1rem" }}>
                    <thead>
                        <tr>
                            <th>{translate.t("Proficiency")}</th>
                            <th>{translate.t("Modifier")}</th>
                            <th>{translate.t("Skill")}</th>
                        </tr>
                        <tr>
                            <th>
                                <Divider />
                            </th>
                            <th>
                                <Divider />
                            </th>
                            <th>
                                <Divider />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <SensoSkillInput
                            initSkill={selectedPlayer.player.stats.skills.insight}
                            firebasePath={`${playerDatabsePath}/stats/skills/insight`}
                            abilityModifier={selectedPlayer.player.stats.wisdom}
                            label={`${translate.t("Insight")} (${translate.t("wis")})`}
                            proficiencyBonus={selectedPlayer.player.stats.proficiency}
                        />
                        <SensoSkillInput
                            initSkill={selectedPlayer.player.stats.skills.intimidation}
                            firebasePath={`${playerDatabsePath}/stats/skills/intimidation`}
                            abilityModifier={selectedPlayer.player.stats.charisma}
                            label={`${translate.t("Intimidation")} (${translate.t("Cha")})`}
                            proficiencyBonus={selectedPlayer.player.stats.proficiency}
                        />
                        <SensoSkillInput
                            initSkill={selectedPlayer.player.stats.skills.investigation}
                            firebasePath={`${playerDatabsePath}/stats/skills/investigation`}
                            abilityModifier={selectedPlayer.player.stats.intelligence}
                            label={`${translate.t("Investigation")} (${translate.t("Int")})`}
                            proficiencyBonus={selectedPlayer.player.stats.proficiency}
                        />
                        <SensoSkillInput
                            initSkill={selectedPlayer.player.stats.skills.medicine}
                            firebasePath={`${playerDatabsePath}/stats/skills/medicine`}
                            abilityModifier={selectedPlayer.player.stats.wisdom}
                            label={`${translate.t("Medicine")} (${translate.t("Wis")})`}
                            proficiencyBonus={selectedPlayer.player.stats.proficiency}
                        />
                        <SensoSkillInput
                            initSkill={selectedPlayer.player.stats.skills.nature}
                            firebasePath={`${playerDatabsePath}/stats/skills/nature`}
                            abilityModifier={selectedPlayer.player.stats.intelligence}
                            label={`${translate.t("Nature")} (${translate.t("Int")})`}
                            proficiencyBonus={selectedPlayer.player.stats.proficiency}
                        />
                        <SensoSkillInput
                            initSkill={selectedPlayer.player.stats.skills.perception}
                            firebasePath={`${playerDatabsePath}/stats/skills/perception`}
                            abilityModifier={selectedPlayer.player.stats.wisdom}
                            label={`${translate.t("Perception")} (${translate.t("Wis")})`}
                            proficiencyBonus={selectedPlayer.player.stats.proficiency}
                        />
                    </tbody>
                </table>
                <table style={{ border: "double", margin: "1rem" }}>
                    <thead>
                        <tr>
                            <th>{translate.t("Proficiency")}</th>
                            <th>{translate.t("Modifier")}</th>
                            <th>{translate.t("Skill")}</th>
                        </tr>
                        <tr>
                            <th>
                                <Divider />
                            </th>
                            <th>
                                <Divider />
                            </th>
                            <th>
                                <Divider />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <SensoSkillInput
                            initSkill={selectedPlayer.player.stats.skills.performance}
                            firebasePath={`${playerDatabsePath}/stats/skills/performance`}
                            abilityModifier={selectedPlayer.player.stats.charisma}
                            label={`${translate.t("Performance")} (${translate.t("Cha")})`}
                            proficiencyBonus={selectedPlayer.player.stats.proficiency}
                        />
                        <SensoSkillInput
                            initSkill={selectedPlayer.player.stats.skills.persuasion}
                            firebasePath={`${playerDatabsePath}/stats/skills/persuasion`}
                            abilityModifier={selectedPlayer.player.stats.charisma}
                            label={`${translate.t("Persuasion")} (${translate.t("Cha")})`}
                            proficiencyBonus={selectedPlayer.player.stats.proficiency}
                        />
                        <SensoSkillInput
                            initSkill={selectedPlayer.player.stats.skills.religion}
                            firebasePath={`${playerDatabsePath}/stats/skills/religion`}
                            abilityModifier={selectedPlayer.player.stats.intelligence}
                            label={`${translate.t("Religion")} (${translate.t("Int")})`}
                            proficiencyBonus={selectedPlayer.player.stats.proficiency}
                        />
                        <SensoSkillInput
                            initSkill={selectedPlayer.player.stats.skills.sleightOfHand}
                            firebasePath={`${playerDatabsePath}/stats/skills/sleightOfHand`}
                            abilityModifier={selectedPlayer.player.stats.dexterity}
                            label={`${translate.t("Sleight of hand")} (${translate.t(
                                "Dez"
                            )})`}
                            proficiencyBonus={selectedPlayer.player.stats.proficiency}
                        />
                        <SensoSkillInput
                            initSkill={selectedPlayer.player.stats.skills.stealth}
                            firebasePath={`${playerDatabsePath}/stats/skills/stealth`}
                            abilityModifier={selectedPlayer.player.stats.dexterity}
                            label={`${translate.t("Stealth")} (${translate.t("Dex")})`}
                            proficiencyBonus={selectedPlayer.player.stats.proficiency}
                        />
                        <SensoSkillInput
                            initSkill={selectedPlayer.player.stats.skills.survival}
                            firebasePath={`${playerDatabsePath}/stats/skills/survival`}
                            abilityModifier={selectedPlayer.player.stats.wisdom}
                            label={`${translate.t("Survival")} (${translate.t("Wis")})`}
                            proficiencyBonus={selectedPlayer.player.stats.proficiency}
                        />
                    </tbody>
                </table>
            </div>
            <SensoAccordianInput
                style={{ gridColumn: "1/3" }}
                initArray={selectedPlayer.player.actions}
                firebasePath={`${playerDatabsePath}/actions`}
                label={translate.t("New action name")}
            />
            <div style={{ gridColumn: "1/3" }}>
                <Divider />
            </div>
            <div style={{ gridColumn: "1/3" }}>
                <h3>{translate.t("Lore")}</h3>
                <SensoDraftJS
                    readOnly={false}
                    isDungeonMaster={isDungeonMaster}
                    storagePath={`${playerStoragePath}`}
                />
            </div>
            <SensoDelete
                storagePath={`${playerStoragePath}`}
                databasePath={`${playerDatabsePath}`}
                instanceType="Player"
                linkPath={`users/${owner}/campaigns/${selectedCampaign.campaign.slug}/players`}
            />
        </Container>
    );
};

const Container = styled.div`
  width: 70%;
  min-height: 20rem;
  min-width: 20rem;
  padding: 1rem;
  -webkit-box-shadow: 5px 5px 15px 5px #000000;
  box-shadow: 5px 0px 15px 2px #000000;
  background-color: ${OLD_WHITE};
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
`;
export default PlayerEdit;
