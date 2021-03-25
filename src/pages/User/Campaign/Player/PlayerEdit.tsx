import React, {
    FunctionComponent,
} from "react";
import { useSelector } from "react-redux";
import { SensoTextInput, SensoNumberInput, SensoSwitch, SensoTextArrayInput, SensoMultilineTextInput, SensoAccordianInput, SensoAbilityInput, SensoSkillInput, SensoDelete } from "../../../../components/SensoInputs"

import {
    getSelectedCampaign,
    getSelectedCampaignMonsterMentionList,
    getSelectedCampaignLocationMentionList,
    getSelectedPlayer,
    getSelectedPlayerStoragePath,
    isDungeonMasterSelector,
    getSelectedCampaignPlayerMentionList,
    getSelectedPlayerDatabasePath
} from "../../../../store/selected/selectedSelectors";
import styled from "styled-components";
import { OLD_WHITE } from "../../../../assets/constants/Constants";
import IsLoading from "../../../../components/IsLoading/IsLoading";

import {

    Divider,
} from "@material-ui/core";
import DraftJSEditor from "../../../../components/DraftJSEditor/DraftJSEditor";
import useOwner from "../../../../store/hooks/useOwner";
type PlayerEditProps = {};
const PlayerEdit: FunctionComponent<PlayerEditProps> = () => {
    const selectedPlayer: ISelectedPlayer | undefined = useSelector(
        getSelectedPlayer
    );
    const selectedCampaign: ISelectedCampaign | undefined = useSelector(getSelectedCampaign)
    const isDungeonMaster = useSelector(isDungeonMasterSelector)
    const owner = useOwner()
    const playerMentionList = useSelector(getSelectedCampaignPlayerMentionList);

    const monsterMentionList = useSelector(getSelectedCampaignMonsterMentionList);
    const locationMentionList = useSelector(getSelectedCampaignLocationMentionList);
    const playerStoragePath = useSelector(getSelectedPlayerStoragePath);
    const playerDatabsePath = useSelector(getSelectedPlayerDatabasePath);

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
                    {selectedPlayer.player.name} {selectedPlayer.player.isPublished === "FALSE" ? "(Unpublished)" : null}
                </h1>
            </div>



            <SensoTextArrayInput
                initArray={selectedPlayer.player.nickNames}
                label="Also known as"
                firebasePath={`${playerDatabsePath}/nickNames`}
            />
            <SensoSwitch
                initValue={selectedPlayer.player.isPublished}
                firebasePath={`${playerDatabsePath}/isPublished`}
                label="Is published"
            />
            <div style={{ gridColumn: "1/3" }}>

                <Divider />
            </div>
            <h2 style={{ gridColumn: "1/3", textAlign: "center" }}>Basic info</h2>
            <SensoTextInput
                initValue={selectedPlayer.player.race}
                firebasePath={`${playerDatabsePath}/race`}
                label="Race"

            />
            <SensoTextInput
                initValue={selectedPlayer.player.class}
                firebasePath={`${playerDatabsePath}/class`}
                label="Class"

            />
            <SensoTextInput
                initValue={selectedPlayer.player.alignment}
                firebasePath={`${playerDatabsePath}/alignment`}
                label="Alignment"

            />

            <SensoNumberInput
                initValue={selectedPlayer.player.level}
                firebasePath={`${playerDatabsePath}/level`}
                label="Level"
                isNegativeValid={false}
                style={{ width: "10rem" }}


            />

            <div style={{ gridColumn: "1/3" }}>
                <SensoMultilineTextInput
                    initValue={selectedPlayer.player.description}
                    firebasePath={`${playerDatabsePath}/description`}
                    label="Description"
                    rows={4}
                />
            </div>
            <div style={{ gridColumn: "1/3" }}>

                <Divider />
            </div>
            <h2 style={{ gridColumn: "1/3", textAlign: "center" }}>Player Stats</h2>
            <SensoNumberInput
                initValue={selectedPlayer.player.stats.armorClass}
                firebasePath={`${playerDatabsePath}/stats/armorClass`}
                label="Armor class"
                isNegativeValid={false} />
            <SensoNumberInput
                initValue={selectedPlayer.player.stats.speed}
                firebasePath={`${playerDatabsePath}/stats/speed/`}
                label="Speed"
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
                label="Hit points"
                isNegativeValid={false}
            />
            <SensoSwitch
                initValue={selectedPlayer.player.stats.inspiration}
                firebasePath={`${playerDatabsePath}/stats/inspiration`}
                label="Inspiration"
            />


            <div style={{ display: "grid", gridTemplateColumns: "1fr" }}>
                <p>
                    <b>Passive Perception: </b>123
                    </p>
                <i>Calculated from Wisdom</i>
            </div>
            <SensoTextArrayInput
                initArray={selectedPlayer.player.senses}
                firebasePath={`${playerDatabsePath}/senses`}
                label="Senses"
            />
            <SensoTextArrayInput
                initArray={selectedPlayer.player.immunities}
                firebasePath={`${playerDatabsePath}/immunities`}
                label="Immunities"
            />
            <div style={{ display: "flex", gridColumn: "1/3", justifyContent: "flex-start", flexWrap: "wrap" }}>

                <SensoAbilityInput
                    initAbilityValue={selectedPlayer.player.stats.strength}
                    firebasePath={`${playerDatabsePath}/stats/strength`}
                    label="STR"
                    proficiencyBonus={selectedPlayer.player.stats.proficiency}
                />
                <SensoAbilityInput
                    initAbilityValue={selectedPlayer.player.stats.dexterity}
                    firebasePath={`${playerDatabsePath}/stats/dexterity`}
                    label="DEX"
                    proficiencyBonus={selectedPlayer.player.stats.proficiency}
                />

                <SensoAbilityInput
                    initAbilityValue={selectedPlayer.player.stats.constitution}
                    firebasePath={`${playerDatabsePath}/stats/constitution`}
                    label="CON"
                    proficiencyBonus={selectedPlayer.player.stats.proficiency}
                />

                <SensoAbilityInput
                    initAbilityValue={selectedPlayer.player.stats.intelligence}
                    firebasePath={`${playerDatabsePath}/stats/intelligence`}
                    label="INT"
                    proficiencyBonus={selectedPlayer.player.stats.proficiency}
                />

                <SensoAbilityInput
                    initAbilityValue={selectedPlayer.player.stats.wisdom}
                    firebasePath={`${playerDatabsePath}/stats/wisdom`}
                    label="WIS"
                    proficiencyBonus={selectedPlayer.player.stats.proficiency}
                />

                <SensoAbilityInput
                    initAbilityValue={selectedPlayer.player.stats.charisma}
                    firebasePath={`${playerDatabsePath}/stats/charisma`}
                    label="CHA"
                    proficiencyBonus={selectedPlayer.player.stats.proficiency}
                />

            </div>
            <div style={{ gridColumn: "1/3", display: "flex", flexWrap: "wrap" }}>
                <table style={{ border: "double", margin: "1rem" }}>
                    <thead>
                        <tr>
                            <th>Skill</th>
                            <th>Modifier</th>
                            <th>Proficient</th>
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
                            label="Acrobatics (DEX)"
                        />
                        <SensoSkillInput
                            initSkill={selectedPlayer.player.stats.skills.animalHandling}
                            firebasePath={`${playerDatabsePath}/stats/skills/animalHandling`}
                            abilityModifier={selectedPlayer.player.stats.dexterity}
                            label="Animal Handling (DEX)"
                            proficiencyBonus={selectedPlayer.player.stats.proficiency}
                        />
                        <SensoSkillInput
                            initSkill={selectedPlayer.player.stats.skills.arcana}
                            firebasePath={`${playerDatabsePath}/stats/skills/arcana`}
                            abilityModifier={selectedPlayer.player.stats.intelligence}
                            label="Arcana (INT)"
                            proficiencyBonus={selectedPlayer.player.stats.proficiency}
                        />
                        <SensoSkillInput
                            initSkill={selectedPlayer.player.stats.skills.athletics}
                            firebasePath={`${playerDatabsePath}/stats/skills/athletics`}
                            abilityModifier={selectedPlayer.player.stats.strength}
                            label="Athletics (STR)"
                            proficiencyBonus={selectedPlayer.player.stats.proficiency}
                        />
                        <SensoSkillInput
                            initSkill={selectedPlayer.player.stats.skills.deception}
                            firebasePath={`${playerDatabsePath}/stats/skills/deception`}
                            abilityModifier={selectedPlayer.player.stats.charisma}
                            label="Deception (CHA)"
                            proficiencyBonus={selectedPlayer.player.stats.proficiency}
                        />
                        <SensoSkillInput
                            initSkill={selectedPlayer.player.stats.skills.history}
                            firebasePath={`${playerDatabsePath}/stats/skills/history`}
                            abilityModifier={selectedPlayer.player.stats.intelligence}
                            label="History (INT)"
                            proficiencyBonus={selectedPlayer.player.stats.proficiency}
                        />
                    </tbody>
                </table>
                <table style={{ border: "double", margin: "1rem" }}>
                    <thead>

                        <tr>
                            <th>Skill</th>
                            <th>Modifier</th>
                            <th>Proficient</th>
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
                            label="Insight (WIS)"
                            proficiencyBonus={selectedPlayer.player.stats.proficiency}
                        />
                        <SensoSkillInput
                            initSkill={selectedPlayer.player.stats.skills.intimidation}
                            firebasePath={`${playerDatabsePath}/stats/skills/intimidation`}
                            abilityModifier={selectedPlayer.player.stats.charisma}
                            label="Intimidation (CHA)"
                            proficiencyBonus={selectedPlayer.player.stats.proficiency}
                        />
                        <SensoSkillInput
                            initSkill={selectedPlayer.player.stats.skills.investigation}
                            firebasePath={`${playerDatabsePath}/stats/skills/investigation`}
                            abilityModifier={selectedPlayer.player.stats.intelligence}
                            label="Investigation (INT)"
                            proficiencyBonus={selectedPlayer.player.stats.proficiency}
                        />
                        <SensoSkillInput
                            initSkill={selectedPlayer.player.stats.skills.medicine}
                            firebasePath={`${playerDatabsePath}/stats/skills/medicine`}
                            abilityModifier={selectedPlayer.player.stats.wisdom}
                            label="Medicine (Wis)"
                            proficiencyBonus={selectedPlayer.player.stats.proficiency}
                        />
                        <SensoSkillInput
                            initSkill={selectedPlayer.player.stats.skills.nature}
                            firebasePath={`${playerDatabsePath}/stats/skills/nature`}
                            abilityModifier={selectedPlayer.player.stats.intelligence}
                            label="Nature (INT)"
                            proficiencyBonus={selectedPlayer.player.stats.proficiency}
                        />
                        <SensoSkillInput
                            initSkill={selectedPlayer.player.stats.skills.perception}
                            firebasePath={`${playerDatabsePath}/stats/skills/perception`}
                            abilityModifier={selectedPlayer.player.stats.wisdom}
                            label="Perception (WIS)"
                            proficiencyBonus={selectedPlayer.player.stats.proficiency}
                        />
                    </tbody>
                </table>
                <table style={{ border: "double", margin: "1rem" }}>
                    <thead>

                        <tr>
                            <th>Skill</th>
                            <th>Modifier</th>
                            <th>Proficient</th>
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
                            label="Performance (CHA)"
                            proficiencyBonus={selectedPlayer.player.stats.proficiency}
                        />
                        <SensoSkillInput
                            initSkill={selectedPlayer.player.stats.skills.persuasion}
                            firebasePath={`${playerDatabsePath}/stats/skills/persuasion`}
                            abilityModifier={selectedPlayer.player.stats.charisma}
                            label="Persuasion (CHA)"
                            proficiencyBonus={selectedPlayer.player.stats.proficiency}
                        />
                        <SensoSkillInput
                            initSkill={selectedPlayer.player.stats.skills.religion}
                            firebasePath={`${playerDatabsePath}/stats/skills/religion`}
                            abilityModifier={selectedPlayer.player.stats.intelligence}
                            label="Religion (INT)"
                            proficiencyBonus={selectedPlayer.player.stats.proficiency}
                        />
                        <SensoSkillInput
                            initSkill={selectedPlayer.player.stats.skills.sleightOfHand}
                            firebasePath={`${playerDatabsePath}/stats/skills/sleightOfHand`}
                            abilityModifier={selectedPlayer.player.stats.dexterity}
                            label="	Sleight of Hand (DEX)"
                            proficiencyBonus={selectedPlayer.player.stats.proficiency}
                        />
                        <SensoSkillInput
                            initSkill={selectedPlayer.player.stats.skills.stealth}
                            firebasePath={`${playerDatabsePath}/stats/skills/stealth`}
                            abilityModifier={selectedPlayer.player.stats.dexterity}
                            label="Stealth (DEX)"
                            proficiencyBonus={selectedPlayer.player.stats.proficiency}
                        />
                        <SensoSkillInput
                            initSkill={selectedPlayer.player.stats.skills.survival}
                            firebasePath={`${playerDatabsePath}/stats/skills/survival`}
                            abilityModifier={selectedPlayer.player.stats.wisdom}
                            label="Survival (WIS)"
                            proficiencyBonus={selectedPlayer.player.stats.proficiency}
                        />
                    </tbody>
                </table>

            </div>
            <SensoAccordianInput
                style={{ gridColumn: "1/3" }}
                initArray={selectedPlayer.player.actions}
                firebasePath={`${playerDatabsePath}/actions`}
                label="Action" />
            <div style={{ gridColumn: "1/3" }}>

                <Divider />
            </div>
            <div style={{ gridColumn: "1/3" }}>
                <h3>Lore and history:</h3>
                <DraftJSEditor
                    playerMentionList={playerMentionList}
                    locationMentionList={locationMentionList}
                    monsterMentionList={monsterMentionList}
                    readOnly={false}
                    isDungeonMaster={isDungeonMaster}
                    storagePath={`${playerStoragePath}/playerLore.json`}
                />
            </div>
            <SensoDelete
                storagePath={`${playerStoragePath}`}
                databasePath={`${playerDatabsePath}`}
                instanceType="Player"
                linkPath={`users/${owner}/campaigns/${selectedCampaign.campaign.slug}/players`}
            />
        </Container >
    );
};

const Container = styled.div`
  width: 70%;
  min-height: 20rem;
  min-width:20rem;
  padding: 1rem;
  -webkit-box-shadow: 5px 5px 15px 5px #000000;
  box-shadow: 5px 0px 15px 2px #000000;
  background-color: ${OLD_WHITE};
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap:0.5rem;
`;
export default PlayerEdit;
