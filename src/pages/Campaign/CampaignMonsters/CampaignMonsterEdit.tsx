import React, {
    FunctionComponent,
} from "react";
import { useSelector } from "react-redux";
import { SensoTextInput, SensoNumberInput, SensoSwitch, SensoTextArrayInput, SensoMultilineTextInput, SensoAccordianInput, SensoAbilityInput, SensoSkillInput, SensoDelete } from "../../../components/SensoInputs"

import {
    getSelectedCampaign,
    getSelectedCampaignMonsterMentionList,
    getSelectedCampaignLocationMentionList,
    getSelectedMonster,
    getSelectedMonsterStorageRef,
    isDungeonMasterSelector,
    getSelectedCampaignPlayerMentionList
} from "../../../store/selected/selectedSelectors";
import styled from "styled-components";
import { OLD_WHITE } from "../../../assets/constants/Constants";
import IsLoading from "../../../components/IsLoading/IsLoading";

import {

    Divider,
} from "@material-ui/core";
import DraftJSEditor from "../../../components/DraftJSEditor/DraftJSEditor";
type CampaignProps = {};
const CampaignMonsterEdit: FunctionComponent<CampaignProps> = () => {
    const selectedMonster: ISelectedMonster | undefined = useSelector(
        getSelectedMonster
    );
    const selectedCampaign: ISelectedCampaign | undefined = useSelector(getSelectedCampaign)
    const isDungeonMaster = useSelector(isDungeonMasterSelector)

    const monsterMentionList = useSelector(getSelectedCampaignMonsterMentionList);
    const playerMentionList = useSelector(getSelectedCampaignPlayerMentionList);
    const locationMentionList = useSelector(getSelectedCampaignLocationMentionList);
    const storageRef = useSelector(getSelectedMonsterStorageRef);

    if (selectedMonster === undefined || selectedCampaign === undefined) {
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
                    {selectedMonster.monster.name} {selectedMonster.monster.isPublished === "FALSE" ? "(Unpublished)" : null}
                </h1>
            </div>



            <SensoTextArrayInput
                initArray={selectedMonster.monster.nickNames}
                label="Also known as"
                firebasePath={`campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/nickNames`}
            />
            <SensoSwitch
                initValue={selectedMonster.monster.isPublished}
                firebasePath={`campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/isPublished`}
                label="Is published"
            />
            <div style={{ gridColumn: "1/3" }}>

                <Divider />
            </div>
            <h2 style={{ gridColumn: "1/3", textAlign: "center" }}>Basic info</h2>
            <SensoTextInput
                initValue={selectedMonster.monster.race}
                firebasePath={`campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/race`}
                label="Race"

            />
            <SensoTextInput
                initValue={selectedMonster.monster.class}
                firebasePath={`campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/class`}
                label="Class"

            />
            <SensoTextInput
                initValue={selectedMonster.monster.alignment}
                firebasePath={`campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/alignment`}
                label="Alignment"

            />

            <SensoTextInput
                initValue={selectedMonster.monster.challengeRating}
                firebasePath={`campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/challengeRating`}
                label="Challenge rating"
                style={{ maxWidth: "10rem" }}


            />

            <div style={{ gridColumn: "1/3" }}>
                <SensoMultilineTextInput
                    initValue={selectedMonster.monster.summary}
                    firebasePath={`campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/summary`}
                    label="Summary"
                    rows={4}
                />
            </div>
            <div style={{ gridColumn: "1/3" }}>

                <Divider />
            </div>
            <h2 style={{ gridColumn: "1/3", textAlign: "center" }}>Character Stats</h2>
            <SensoNumberInput
                initValue={selectedMonster.monster.stats.armorClass}
                firebasePath={`campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/stats/armorClass`}
                label="Armor class"
                isNegativeValid={false} />
            <SensoNumberInput
                initValue={selectedMonster.monster.stats.speed}
                firebasePath={`campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/stats/speed/`}
                label="Speed"
                isNegativeValid={false}
            />
            <SensoNumberInput
                initValue={selectedMonster.monster.stats.proficiency}
                firebasePath={`campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/stats/proficiency`}
                label="Proficiency bonus"
                isNegativeValid={false}

            />
            <SensoNumberInput
                initValue={selectedMonster.monster.stats.hitPoints}
                firebasePath={`campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/stats/hitpoints`}
                label="Hit points"
                isNegativeValid={false}
            />
            <SensoSwitch
                initValue={selectedMonster.monster.stats.inspiration}
                firebasePath={`campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/stats/inspiration`}
                label="Inspiration"
            />

            <SensoSwitch
                initValue={selectedMonster.monster.isUnique}
                firebasePath={`campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/isUnique`}
                label="is Unique" />

            <div style={{ display: "grid", gridTemplateColumns: "1fr" }}>
                <p>
                    <b>Passive Perception: </b>123
                    </p>
                <i>Calculated from Wisdom</i>
            </div>
            <SensoTextArrayInput
                initArray={selectedMonster.monster.senses}
                firebasePath={`campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/senses`}
                label="Senses"
            />
            <SensoTextArrayInput
                initArray={selectedMonster.monster.immunities}
                firebasePath={`campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/immunities`}
                label="Immunities"
            />
            <div style={{ display: "flex", gridColumn: "1/3", justifyContent: "flex-start", flexWrap: "wrap" }}>

                <SensoAbilityInput
                    initAbilityValue={selectedMonster.monster.stats.strength}
                    firebasePath={`campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/stats/strength`}
                    label="STR"
                    proficiencyBonus={selectedMonster.monster.stats.proficiency}
                />
                <SensoAbilityInput
                    initAbilityValue={selectedMonster.monster.stats.dexterity}
                    firebasePath={`campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/stats/dexterity`}
                    label="DEX"
                    proficiencyBonus={selectedMonster.monster.stats.proficiency}
                />

                <SensoAbilityInput
                    initAbilityValue={selectedMonster.monster.stats.constitution}
                    firebasePath={`campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/stats/constitution`}
                    label="CON"
                    proficiencyBonus={selectedMonster.monster.stats.proficiency}
                />

                <SensoAbilityInput
                    initAbilityValue={selectedMonster.monster.stats.intelligence}
                    firebasePath={`campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/stats/intelligence`}
                    label="INT"
                    proficiencyBonus={selectedMonster.monster.stats.proficiency}
                />

                <SensoAbilityInput
                    initAbilityValue={selectedMonster.monster.stats.wisdom}
                    firebasePath={`campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/stats/wisdom`}
                    label="WIS"
                    proficiencyBonus={selectedMonster.monster.stats.proficiency}
                />

                <SensoAbilityInput
                    initAbilityValue={selectedMonster.monster.stats.charisma}
                    firebasePath={`campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/stats/charisma`}
                    label="CHA"
                    proficiencyBonus={selectedMonster.monster.stats.proficiency}
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
                            abilityModifier={selectedMonster.monster.stats.dexterity}
                            initSkill={selectedMonster.monster.stats.skills.acrobatics}
                            proficiencyBonus={selectedMonster.monster.stats.proficiency}
                            firebasePath={`campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/stats/skills/acrobatics`}
                            label="Acrobatics (DEX)"
                        />
                        <SensoSkillInput
                            initSkill={selectedMonster.monster.stats.skills.animalHandling}
                            firebasePath={`campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/stats/skills/animalHandling`}
                            abilityModifier={selectedMonster.monster.stats.dexterity}
                            label="Animal Handling (DEX)"
                            proficiencyBonus={selectedMonster.monster.stats.proficiency}
                        />
                        <SensoSkillInput
                            initSkill={selectedMonster.monster.stats.skills.arcana}
                            firebasePath={`campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/stats/skills/arcana`}
                            abilityModifier={selectedMonster.monster.stats.intelligence}
                            label="Arcana (INT)"
                            proficiencyBonus={selectedMonster.monster.stats.proficiency}
                        />
                        <SensoSkillInput
                            initSkill={selectedMonster.monster.stats.skills.athletics}
                            firebasePath={`campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/stats/skills/athletics`}
                            abilityModifier={selectedMonster.monster.stats.strength}
                            label="Athletics (STR)"
                            proficiencyBonus={selectedMonster.monster.stats.proficiency}
                        />
                        <SensoSkillInput
                            initSkill={selectedMonster.monster.stats.skills.deception}
                            firebasePath={`campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/stats/skills/deception`}
                            abilityModifier={selectedMonster.monster.stats.charisma}
                            label="Deception (CHA)"
                            proficiencyBonus={selectedMonster.monster.stats.proficiency}
                        />
                        <SensoSkillInput
                            initSkill={selectedMonster.monster.stats.skills.history}
                            firebasePath={`campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/stats/skills/history`}
                            abilityModifier={selectedMonster.monster.stats.intelligence}
                            label="History (INT)"
                            proficiencyBonus={selectedMonster.monster.stats.proficiency}
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
                            initSkill={selectedMonster.monster.stats.skills.insight}
                            firebasePath={`campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/stats/skills/insight`}
                            abilityModifier={selectedMonster.monster.stats.wisdom}
                            label="Insight (WIS)"
                            proficiencyBonus={selectedMonster.monster.stats.proficiency}
                        />
                        <SensoSkillInput
                            initSkill={selectedMonster.monster.stats.skills.intimidation}
                            firebasePath={`campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/stats/skills/intimidation`}
                            abilityModifier={selectedMonster.monster.stats.charisma}
                            label="Intimidation (CHA)"
                            proficiencyBonus={selectedMonster.monster.stats.proficiency}
                        />
                        <SensoSkillInput
                            initSkill={selectedMonster.monster.stats.skills.investigation}
                            firebasePath={`campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/stats/skills/investigation`}
                            abilityModifier={selectedMonster.monster.stats.intelligence}
                            label="Investigation (INT)"
                            proficiencyBonus={selectedMonster.monster.stats.proficiency}
                        />
                        <SensoSkillInput
                            initSkill={selectedMonster.monster.stats.skills.medicine}
                            firebasePath={`campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/stats/skills/medicine`}
                            abilityModifier={selectedMonster.monster.stats.wisdom}
                            label="Medicine (Wis)"
                            proficiencyBonus={selectedMonster.monster.stats.proficiency}
                        />
                        <SensoSkillInput
                            initSkill={selectedMonster.monster.stats.skills.nature}
                            firebasePath={`campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/stats/skills/nature`}
                            abilityModifier={selectedMonster.monster.stats.intelligence}
                            label="Nature (INT)"
                            proficiencyBonus={selectedMonster.monster.stats.proficiency}
                        />
                        <SensoSkillInput
                            initSkill={selectedMonster.monster.stats.skills.perception}
                            firebasePath={`campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/stats/skills/perception`}
                            abilityModifier={selectedMonster.monster.stats.wisdom}
                            label="Perception (WIS)"
                            proficiencyBonus={selectedMonster.monster.stats.proficiency}
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
                            initSkill={selectedMonster.monster.stats.skills.performance}
                            firebasePath={`campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/stats/skills/performance`}
                            abilityModifier={selectedMonster.monster.stats.charisma}
                            label="Performance (CHA)"
                            proficiencyBonus={selectedMonster.monster.stats.proficiency}
                        />
                        <SensoSkillInput
                            initSkill={selectedMonster.monster.stats.skills.persuasion}
                            firebasePath={`campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/stats/skills/persuasion`}
                            abilityModifier={selectedMonster.monster.stats.charisma}
                            label="Persuasion (CHA)"
                            proficiencyBonus={selectedMonster.monster.stats.proficiency}
                        />
                        <SensoSkillInput
                            initSkill={selectedMonster.monster.stats.skills.religion}
                            firebasePath={`campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/stats/skills/religion`}
                            abilityModifier={selectedMonster.monster.stats.intelligence}
                            label="Religion (INT)"
                            proficiencyBonus={selectedMonster.monster.stats.proficiency}
                        />
                        <SensoSkillInput
                            initSkill={selectedMonster.monster.stats.skills.sleightOfHand}
                            firebasePath={`campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/stats/skills/sleightOfHand`}
                            abilityModifier={selectedMonster.monster.stats.dexterity}
                            label="	Sleight of Hand (DEX)"
                            proficiencyBonus={selectedMonster.monster.stats.proficiency}
                        />
                        <SensoSkillInput
                            initSkill={selectedMonster.monster.stats.skills.stealth}
                            firebasePath={`campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/stats/skills/stealth`}
                            abilityModifier={selectedMonster.monster.stats.dexterity}
                            label="Stealth (DEX)"
                            proficiencyBonus={selectedMonster.monster.stats.proficiency}
                        />
                        <SensoSkillInput
                            initSkill={selectedMonster.monster.stats.skills.survival}
                            firebasePath={`campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/stats/skills/survival`}
                            abilityModifier={selectedMonster.monster.stats.wisdom}
                            label="Survival (WIS)"
                            proficiencyBonus={selectedMonster.monster.stats.proficiency}
                        />
                    </tbody>
                </table>

            </div>
            <SensoAccordianInput
                style={{ gridColumn: "1/3" }}
                initArray={selectedMonster.monster.actions}
                firebasePath={`campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/actions`}
                label="Action" />
            <div style={{ gridColumn: "1/3" }}>

                <Divider />
            </div>
            <div style={{ gridColumn: "1/3" }}>
                <h3>Description and history:</h3>
                <DraftJSEditor
                    playerMentionList={playerMentionList}
                    monsterMentionList={monsterMentionList}
                    locationMentionList={locationMentionList}
                    readOnly={false}
                    isDungeonMaster={isDungeonMaster}
                    JSONRef={storageRef?.child("MonsterDescription.json")}
                />
            </div>
            <SensoDelete
                storagePath={`Campaigns/${selectedCampaign.campaign.slug}/Monsters/${selectedMonster.monster.slug}`}
                databasePath={`campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}`}
                instanceType="Character"
                linkPath={`/${selectedCampaign.campaign.slug}/monsters`}
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
export default CampaignMonsterEdit;
