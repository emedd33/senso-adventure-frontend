import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import {
    SensoTextInput,
    SensoNumberInput,
    SensoSwitch,
    SensoTextArrayInput,
    SensoMultilineTextInput,
    SensoActionInputs,
    SensoDelete,
    SensoProficiencyInput,
    SensoMonsterAbilityInput,
} from "../../../../components/SensoInputs";

import {
    getSelectedCampaign,
    getSelectedMonster,
    getSelectedMonsterDatabasePath,
    getSelectedMonsterStoragePath,
    isDungeonMasterSelector,
} from "../../../../store/selected/selectedSelectors";
import styled from "styled-components";
import { OLD_WHITE } from "../../../../assets/constants/Constants";
import IsLoading from "../../../../components/IsLoading/IsLoading";
import secretIcon from "../../../../assets/icons/hush_icon.png";
import { Divider, Tooltip } from "@material-ui/core";
import useOwner from "../../../../store/hooks/useOwner";
import SensoDraftJS from "../../../../components/SensoDraftJS/SensoDraftJS";
import { useTranslation } from "react-i18next";
type MonsterEditProps = {};
const MonsterEdit: FunctionComponent<MonsterEditProps> = () => {
    const selectedMonster: ISelectedMonster | undefined = useSelector(
        getSelectedMonster
    );
    const translate = useTranslation();
    const selectedCampaign: ISelectedCampaign | undefined = useSelector(
        getSelectedCampaign
    );
    const isDungeonMaster = useSelector(isDungeonMasterSelector);
    const selectedMonsterStoragePath = useSelector(getSelectedMonsterStoragePath);
    const selectedMonsterDatabasePath = useSelector(getSelectedMonsterDatabasePath);
    const owner = useOwner();
    if (selectedMonster === undefined || selectedCampaign === undefined) {
        return (
            <Container>
                <IsLoading />
            </Container>
        );
    }
    return (
        <Container>
            <div>
                <h1 style={{ marginBottom: "0" }}>
                    {selectedMonster.monster.name}{" "}
                    {selectedMonster.monster.isPublished === "FALSE"
                        ? `(${translate.t(`Not published`)})`
                        : null}
                </h1>
            </div>

            <div
                style={{ display: "flex", alignItems: "center", flexDirection: "row" }}
            >
                <SensoSwitch
                    initValue={selectedMonster.monster.isPublished}
                    firebasePath={`users/${owner}/campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/isPublished`}
                    label={`${translate.t(`Is published`)}`}
                    toolTip={translate.t(
                        `Published means that it's visible for other users`
                    )}
                />
            </div>
            <SensoTextArrayInput
                initArray={selectedMonster.monster.nickNames}
                label={translate.t(`Also known as`)}
                firebasePath={`users/${owner}/campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/nickNames`}
            />
            <div style={{ display: "flex", flexWrap: "wrap", flexDirection: "row" }}>
                <SensoTextInput
                    initValue={selectedMonster.monster.size}
                    firebasePath={`users/${owner}/campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/size`}
                    label={translate.t(`Size`)}
                />
                <SensoTextInput
                    initValue={selectedMonster.monster.type}
                    firebasePath={`users/${owner}/campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/type`}
                    label={translate.t(`Type`)}
                />
                <SensoTextInput
                    initValue={selectedMonster.monster.alignment}
                    firebasePath={`users/${owner}/campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/alignment`}
                    label={translate.t(`Alignment`)}
                />
            </div>

            <DividerBlock style={{ width: "100%" }} />

            <SensoMultilineTextInput
                initValue={selectedMonster.monster.description}
                firebasePath={`users/${owner}/campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/description`}
                label={translate.t(`Description`)}
                rows={4}
            />
            {isDungeonMaster ? (
                <>
                    <DividerBlock style={{ width: "100%" }} />

                    <div
                        style={{ width: "100%", display: "flex", justifyContent: "center" }}
                    >
                        <Tooltip
                            title={`${translate.t(
                                `Everything below is hidden from players`
                            )}`}
                        >
                            <img src={secretIcon} style={{ width: "3rem" }} alt="Secret" />
                        </Tooltip>
                    </div>
                    <DividerBlock style={{ width: "100%" }} />
                    <SensoMultilineTextInput
                        initValue={selectedMonster.monster.rolePlaying}
                        firebasePath={`users/${owner}/campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/rolePlaying`}
                        label={translate.t(`Roleplay description`)}
                        rows={4}
                    />

                    <DividerBlock style={{ width: "100%" }} />
                    {selectedMonster.monster.stats ?
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                flexWrap: "wrap",
                                justifyContent: "space-between",
                            }}
                        >
                            <div style={{ display: "grid", gap: "0.5rem" }}>
                                <SensoNumberInput
                                    initValue={selectedMonster.monster.stats.armorClass}
                                    firebasePath={`users/${owner}/campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/stats/armorClass`}
                                    label={translate.t(`Armor class`)}
                                    isNegativeValid={false}
                                />
                                <div style={{ display: "flex", flexWrap: "wrap" }}>
                                    <SensoNumberInput
                                        initValue={selectedMonster.monster.stats.hitPoints}
                                        firebasePath={`users/${owner}/campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/stats/hitPoints`}
                                        label="hp"
                                        isNegativeValid={false}
                                    />
                                    <SensoTextInput
                                        initValue={selectedMonster.monster.stats.hitDice}
                                        firebasePath={`users/${owner}/campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/stats/hitDice`}
                                        label={translate.t(`Hit dice`)}
                                    />
                                </div>
                                <h3>Speed</h3>
                                <SensoTextInput
                                    initValue={selectedMonster.monster.stats.speed.walk}
                                    firebasePath={`users/${owner}/campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/stats/speed/walk`}
                                    label={translate.t(`Walking speed`)}
                                />
                                <SensoTextInput
                                    initValue={selectedMonster.monster.stats.speed.swim}
                                    firebasePath={`users/${owner}/campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/stats/speed/swim`}
                                    label={translate.t(`Swiming speed`)}
                                />
                                <SensoTextInput
                                    initValue={selectedMonster.monster.stats.speed.climb}
                                    firebasePath={`users/${owner}/campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/stats/speed/climb`}
                                    label={translate.t(`Climbing speed`)}
                                />
                                <SensoTextInput
                                    initValue={selectedMonster.monster.stats.speed.fly}
                                    firebasePath={`users/${owner}/campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/stats/speed/fly`}
                                    label={translate.t(`Fly speed`)}
                                />
                            </div>

                            <div style={{ display: "grid", gap: "0.5rem" }}>
                                <SensoTextInput
                                    initValue={selectedMonster.monster.challengeRating}
                                    firebasePath={`users/${owner}/campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/challengeRating`}
                                    label={translate.t(`Challenge rating`)}
                                    style={{ maxWidth: "10rem" }}
                                />
                                <SensoTextArrayInput
                                    initArray={selectedMonster.monster.languages}
                                    label={translate.t(`Languages`)}
                                    firebasePath={`users/${owner}/campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/languages`}
                                />
                                <h3>{translate.t(`Senses`)}</h3>
                                <SensoNumberInput
                                    initValue={selectedMonster.monster.senses?.passive_perception}
                                    firebasePath={`users/${owner}/campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/senses/passive_perception`}
                                    label={translate.t(`Passive perception`)}
                                    isNegativeValid={false}
                                />
                                <SensoTextInput
                                    initValue={selectedMonster.monster.senses?.darkvision}
                                    firebasePath={`users/${owner}/campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/senses/darkvision`}
                                    label={translate.t(`Darkvision`)}
                                />
                                <SensoTextInput
                                    initValue={selectedMonster.monster.senses?.blindsight}
                                    firebasePath={`users/${owner}/campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/senses/blindsight`}
                                    label={translate.t(`Blindsight`)}
                                />
                                <SensoTextInput
                                    initValue={selectedMonster.monster.senses?.truesight}
                                    firebasePath={`users/${owner}/campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/senses/truesight`}
                                    label={translate.t(`Truesight`)}
                                />

                                <SensoTextInput
                                    initValue={selectedMonster.monster.senses?.tremorsense}
                                    firebasePath={`users/${owner}/campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/senses/tremorsense`}
                                    label={translate.t(`Tremorsense`)}
                                />
                            </div>
                        </div>
                        : null}
                    {selectedMonster.monster.stats ?

                        <div
                            style={{
                                display: "flex",
                                gridColumn: "1/2",
                                justifyContent: "space-between",
                                flexWrap: "wrap",

                            }}
                        >
                            <SensoMonsterAbilityInput
                                initAbilityValue={selectedMonster.monster.stats.strength}
                                firebasePath={`${selectedMonsterDatabasePath}/stats/strength`}
                                label={translate.t(`Str`)}

                            />

                            <SensoMonsterAbilityInput
                                initAbilityValue={selectedMonster.monster.stats.dexterity}
                                firebasePath={`${selectedMonsterDatabasePath}/stats/dexterity`}
                                label={translate.t(`Dex`)}

                            /> <SensoMonsterAbilityInput
                                initAbilityValue={selectedMonster.monster.stats.constitution}
                                firebasePath={`${selectedMonsterDatabasePath}/stats/constitution`}
                                label={translate.t(`Con`)}

                            />
                            <SensoMonsterAbilityInput
                                initAbilityValue={selectedMonster.monster.stats.intelligence}
                                firebasePath={`${selectedMonsterDatabasePath}/stats/intelligence`}
                                label={translate.t(`Int`)}

                            />
                            <SensoMonsterAbilityInput
                                initAbilityValue={selectedMonster.monster.stats.wisdom}
                                firebasePath={`${selectedMonsterDatabasePath}/stats/wisdom`}
                                label={translate.t(`Wis`)}

                            />
                            <SensoMonsterAbilityInput
                                initAbilityValue={selectedMonster.monster.stats.charisma}
                                firebasePath={`${selectedMonsterDatabasePath}/stats/charisma`}
                                label={translate.t(`Cha`)}

                            />
                        </div>
                        : null}
                    {selectedMonster.monster.stats ?

                        <div
                            style={{
                                display: "flex",
                                flexWrap: "wrap",
                                justifyContent: "space-between",
                            }}
                        >
                            <SensoProficiencyInput
                                initProficiencies={selectedMonster.monster.stats.proficiencies}
                                firebasePath={`users/${owner}/campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/stats/proficiencies`}
                            />
                            <DividerBlock style={{ width: "100%" }} />
                            <SensoTextArrayInput
                                initArray={selectedMonster.monster.damageImmunities}
                                label={translate.t(`Damage immunities`)}
                                firebasePath={`users/${owner}/campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/damageImmunities`}
                            />
                            <SensoTextArrayInput
                                initArray={selectedMonster.monster.conditionImmunities}
                                label={translate.t(`Condition immunities`)}
                                firebasePath={`users/${owner}/campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/conditionImmunities`}
                            />
                            <SensoTextArrayInput
                                initArray={selectedMonster.monster.damageResistances}
                                label={translate.t(`Damage resistance`)}
                                firebasePath={`users/${owner}/campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/damageResistances`}
                            />
                            <SensoTextArrayInput
                                initArray={selectedMonster.monster.damageVulnerabilities}
                                label={translate.t(`Damage vulnerabilities`)}
                                firebasePath={`users/${owner}/campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/damageVulnerabilities`}
                            />
                        </div>
                        : null}
                    {selectedMonster.monster.stats ?

                        <SensoActionInputs
                            actions={selectedMonster.monster.specialAbilities}
                            label={translate.t(`Special abilities`)}
                            firebasePath={`users/${owner}/campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/specialAbilities`}
                        />
                        : null}
                    {selectedMonster.monster.stats ?

                        <SensoActionInputs
                            actions={selectedMonster.monster.actions}
                            label={translate.t(`Actions`)}
                            firebasePath={`users/${owner}/campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/actions`}
                        />
                        : null}
                    {selectedMonster.monster.stats ?

                        <SensoActionInputs
                            actions={selectedMonster.monster.legendaryActions}
                            label={translate.t(`Legendary actions`)}
                            firebasePath={`users/${owner}/campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/legendaryActions`}
                        />
                        : null}
                    <Divider />
                    <h3>{translate.t(`Lore`)}:</h3>
                    <SensoDraftJS
                        readOnly={false}
                        isDungeonMaster={isDungeonMaster}
                        storagePath={`${selectedMonsterStoragePath}`}
                    />
                    <SensoDelete
                        storagePath={`${selectedMonsterStoragePath}`}
                        databasePath={`users/${owner}/campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}`}
                        instanceType="Character"
                        linkPath={`/user/${owner}/campaigns/${selectedCampaign.campaign.slug}/monsters`}
                    />
                </>
            ) : null}
        </Container>
    );
};

const Container = styled.div`
  width: 90%;
  padding: 1rem;
  display: grid;
  gap: 0.5rem;
  grid-template-columns: auto-fit;
  -webkit-box-shadow: 5px 5px 15px 5px #000000;
  box-shadow: 5px 0px 15px 2px #000000;
  background-color: ${OLD_WHITE};
  min-height: 20rem;
  z-index: 100;
`;
const DividerBlock = styled(Divider)`
  margin-top: 1rem;
  margin-bottom: 1rem;
`;
export default MonsterEdit;
