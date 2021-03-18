import React, {
    FunctionComponent,
} from "react";
import { useSelector } from "react-redux";
import { SensoTextInput, SensoNumberInput, SensoSwitch, SensoTextArrayInput, SensoMultilineTextInput, SensoAccordianInput, SensoAbilityInput, SensoSkillInput, SensoDelete } from "../../../components/SensoInputs"

import {
    getSelectedCampaign,
    getSelectedCampaignMonsterMentionList,
    getSelectedCampaignLocationMentionList,
    getSelectedPlayer,
    getSelectedPlayerStorageRef,
    isDungeonMasterSelector,
} from "../../../store/selected/selectedSelectors";
import styled from "styled-components";
import { OLD_WHITE } from "../../../assets/constants/Constants";
import IsLoading from "../../../components/IsLoading/IsLoading";

import {

    Divider,
} from "@material-ui/core";
import DraftJSEditor from "../../../components/DraftJSEditor/DraftJSEditor";
type CampaignProps = {};
const CampaignPlayerEdit: FunctionComponent<CampaignProps> = () => {
    const selectedPlayer: ISelectedPlayer | undefined = useSelector(
        getSelectedPlayer
    );
    const selectedCampaign: ISelectedCampaign | undefined = useSelector(getSelectedCampaign)
    const isDungeonMaster = useSelector(isDungeonMasterSelector)

    const characterMentionList = useSelector(getSelectedCampaignMonsterMentionList);
    const locationMentionList = useSelector(getSelectedCampaignLocationMentionList);
    const storageRef = useSelector(getSelectedPlayerStorageRef);

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
                firebasePath={`campaigns/${selectedCampaign.id}/players/${selectedPlayer.id}/nickNames`}
            />
            <SensoSwitch
                initValue={selectedPlayer.player.isPublished}
                firebasePath={`campaigns/${selectedCampaign.id}/players/${selectedPlayer.id}/isPublished`}
                label="Is published"
            />
            <div style={{ gridColumn: "1/3" }}>

                <Divider />
            </div>
            <h2 style={{ gridColumn: "1/3", textAlign: "center" }}>Basic info</h2>
            <SensoTextInput
                initValue={selectedPlayer.player.race}
                firebasePath={`campaigns/${selectedCampaign.id}/players/${selectedPlayer.id}/race`}
                label="Race"

            />
            <SensoTextInput
                initValue={selectedPlayer.player.class}
                firebasePath={`campaigns/${selectedCampaign.id}/players/${selectedPlayer.id}/class`}
                label="Class"

            />
            <SensoTextInput
                initValue={selectedPlayer.player.alignment}
                firebasePath={`campaigns/${selectedCampaign.id}/players/${selectedPlayer.id}/alignment`}
                label="Alignment"

            />

            <SensoNumberInput
                initValue={selectedPlayer.player.level}
                firebasePath={`campaigns/${selectedCampaign.id}/players/${selectedPlayer.id}/level`}
                label="Level"
                isNegativeValid={false}
                style={{ width: "10rem" }}


            />

            <div style={{ gridColumn: "1/3" }}>
                <SensoMultilineTextInput
                    initValue={selectedPlayer.player.summary}
                    firebasePath={`campaigns/${selectedCampaign.id}/players/${selectedPlayer.id}/summary`}
                    label="Summary"
                    rows={4}
                />
            </div>
            <div style={{ gridColumn: "1/3" }}>

                <Divider />
            </div>
            <h2 style={{ gridColumn: "1/3", textAlign: "center" }}>Player Stats</h2>
            <SensoNumberInput
                initValue={selectedPlayer.player.stats.armorClass}
                firebasePath={`campaigns/${selectedCampaign.id}/players/${selectedPlayer.id}/stats/armorClass`}
                label="Armor class"
                isNegativeValid={false} />
            <SensoNumberInput
                initValue={selectedPlayer.player.stats.speed}
                firebasePath={`campaigns/${selectedCampaign.id}/players/${selectedPlayer.id}/stats/speed/`}
                label="Speed"
                isNegativeValid={false}
            />
            <SensoNumberInput
                initValue={selectedPlayer.player.stats.proficiency}
                firebasePath={`campaigns/${selectedCampaign.id}/players/${selectedPlayer.id}/stats/proficiency`}
                label="Proficiency bonus"
                isNegativeValid={false}

            />
            <SensoNumberInput
                initValue={selectedPlayer.player.stats.hitPoints}
                firebasePath={`campaigns/${selectedCampaign.id}/players/${selectedPlayer.id}/stats/hitpoints`}
                label="Hit points"
                isNegativeValid={false}
            />
            <SensoSwitch
                initValue={selectedPlayer.player.stats.inspiration}
                firebasePath={`campaigns/${selectedCampaign.id}/players/${selectedPlayer.id}/stats/inspiration`}
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
                firebasePath={`campaigns/${selectedCampaign.id}/players/${selectedPlayer.id}/senses`}
                label="Senses"
            />
            <SensoTextArrayInput
                initArray={selectedPlayer.player.immunities}
                firebasePath={`campaigns/${selectedCampaign.id}/players/${selectedPlayer.id}/immunities`}
                label="Immunities"
            />
            <div style={{ display: "flex", gridColumn: "1/3", justifyContent: "flex-start", flexWrap: "wrap" }}>

                <SensoAbilityInput
                    initAbilityValue={selectedPlayer.player.stats.strength}
                    firebasePath={`campaigns/${selectedCampaign.id}/players/${selectedPlayer.id}/stats/strength`}
                    label="STR"
                    proficiencyBonus={selectedPlayer.player.stats.proficiency}
                />
                <SensoAbilityInput
                    initAbilityValue={selectedPlayer.player.stats.dexterity}
                    firebasePath={`campaigns/${selectedCampaign.id}/players/${selectedPlayer.id}/stats/dexterity`}
                    label="DEX"
                    proficiencyBonus={selectedPlayer.player.stats.proficiency}
                />

                <SensoAbilityInput
                    initAbilityValue={selectedPlayer.player.stats.constitution}
                    firebasePath={`campaigns/${selectedCampaign.id}/players/${selectedPlayer.id}/stats/constitution`}
                    label="CON"
                    proficiencyBonus={selectedPlayer.player.stats.proficiency}
                />

                <SensoAbilityInput
                    initAbilityValue={selectedPlayer.player.stats.intelligence}
                    firebasePath={`campaigns/${selectedCampaign.id}/players/${selectedPlayer.id}/stats/intelligence`}
                    label="INT"
                    proficiencyBonus={selectedPlayer.player.stats.proficiency}
                />

                <SensoAbilityInput
                    initAbilityValue={selectedPlayer.player.stats.wisdom}
                    firebasePath={`campaigns/${selectedCampaign.id}/players/${selectedPlayer.id}/stats/wisdom`}
                    label="WIS"
                    proficiencyBonus={selectedPlayer.player.stats.proficiency}
                />

                <SensoAbilityInput
                    initAbilityValue={selectedPlayer.player.stats.charisma}
                    firebasePath={`campaigns/${selectedCampaign.id}/players/${selectedPlayer.id}/stats/charisma`}
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
                            firebasePath={`campaigns/${selectedCampaign.id}/players/${selectedPlayer.id}/stats/skills/acrobatics`}
                            label="Acrobatics (DEX)"
                        />
                        <SensoSkillInput
                            initSkill={selectedPlayer.player.stats.skills.animalHandling}
                            firebasePath={`campaigns/${selectedCampaign.id}/players/${selectedPlayer.id}/stats/skills/animalHandling`}
                            abilityModifier={selectedPlayer.player.stats.dexterity}
                            label="Animal Handling (DEX)"
                            proficiencyBonus={selectedPlayer.player.stats.proficiency}
                        />
                        <SensoSkillInput
                            initSkill={selectedPlayer.player.stats.skills.arcana}
                            firebasePath={`campaigns/${selectedCampaign.id}/players/${selectedPlayer.id}/stats/skills/arcana`}
                            abilityModifier={selectedPlayer.player.stats.intelligence}
                            label="Arcana (INT)"
                            proficiencyBonus={selectedPlayer.player.stats.proficiency}
                        />
                        <SensoSkillInput
                            initSkill={selectedPlayer.player.stats.skills.athletics}
                            firebasePath={`campaigns/${selectedCampaign.id}/players/${selectedPlayer.id}/stats/skills/athletics`}
                            abilityModifier={selectedPlayer.player.stats.strength}
                            label="Athletics (STR)"
                            proficiencyBonus={selectedPlayer.player.stats.proficiency}
                        />
                        <SensoSkillInput
                            initSkill={selectedPlayer.player.stats.skills.deception}
                            firebasePath={`campaigns/${selectedCampaign.id}/players/${selectedPlayer.id}/stats/skills/deception`}
                            abilityModifier={selectedPlayer.player.stats.charisma}
                            label="Deception (CHA)"
                            proficiencyBonus={selectedPlayer.player.stats.proficiency}
                        />
                        <SensoSkillInput
                            initSkill={selectedPlayer.player.stats.skills.history}
                            firebasePath={`campaigns/${selectedCampaign.id}/players/${selectedPlayer.id}/stats/skills/history`}
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
                            firebasePath={`campaigns/${selectedCampaign.id}/players/${selectedPlayer.id}/stats/skills/insight`}
                            abilityModifier={selectedPlayer.player.stats.wisdom}
                            label="Insight (WIS)"
                            proficiencyBonus={selectedPlayer.player.stats.proficiency}
                        />
                        <SensoSkillInput
                            initSkill={selectedPlayer.player.stats.skills.intimidation}
                            firebasePath={`campaigns/${selectedCampaign.id}/players/${selectedPlayer.id}/stats/skills/intimidation`}
                            abilityModifier={selectedPlayer.player.stats.charisma}
                            label="Intimidation (CHA)"
                            proficiencyBonus={selectedPlayer.player.stats.proficiency}
                        />
                        <SensoSkillInput
                            initSkill={selectedPlayer.player.stats.skills.investigation}
                            firebasePath={`campaigns/${selectedCampaign.id}/players/${selectedPlayer.id}/stats/skills/investigation`}
                            abilityModifier={selectedPlayer.player.stats.intelligence}
                            label="Investigation (INT)"
                            proficiencyBonus={selectedPlayer.player.stats.proficiency}
                        />
                        <SensoSkillInput
                            initSkill={selectedPlayer.player.stats.skills.medicine}
                            firebasePath={`campaigns/${selectedCampaign.id}/players/${selectedPlayer.id}/stats/skills/medicine`}
                            abilityModifier={selectedPlayer.player.stats.wisdom}
                            label="Medicine (Wis)"
                            proficiencyBonus={selectedPlayer.player.stats.proficiency}
                        />
                        <SensoSkillInput
                            initSkill={selectedPlayer.player.stats.skills.nature}
                            firebasePath={`campaigns/${selectedCampaign.id}/players/${selectedPlayer.id}/stats/skills/nature`}
                            abilityModifier={selectedPlayer.player.stats.intelligence}
                            label="Nature (INT)"
                            proficiencyBonus={selectedPlayer.player.stats.proficiency}
                        />
                        <SensoSkillInput
                            initSkill={selectedPlayer.player.stats.skills.perception}
                            firebasePath={`campaigns/${selectedCampaign.id}/players/${selectedPlayer.id}/stats/skills/perception`}
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
                            firebasePath={`campaigns/${selectedCampaign.id}/players/${selectedPlayer.id}/stats/skills/performance`}
                            abilityModifier={selectedPlayer.player.stats.charisma}
                            label="Performance (CHA)"
                            proficiencyBonus={selectedPlayer.player.stats.proficiency}
                        />
                        <SensoSkillInput
                            initSkill={selectedPlayer.player.stats.skills.persuasion}
                            firebasePath={`campaigns/${selectedCampaign.id}/players/${selectedPlayer.id}/stats/skills/persuasion`}
                            abilityModifier={selectedPlayer.player.stats.charisma}
                            label="Persuasion (CHA)"
                            proficiencyBonus={selectedPlayer.player.stats.proficiency}
                        />
                        <SensoSkillInput
                            initSkill={selectedPlayer.player.stats.skills.religion}
                            firebasePath={`campaigns/${selectedCampaign.id}/players/${selectedPlayer.id}/stats/skills/religion`}
                            abilityModifier={selectedPlayer.player.stats.intelligence}
                            label="Religion (INT)"
                            proficiencyBonus={selectedPlayer.player.stats.proficiency}
                        />
                        <SensoSkillInput
                            initSkill={selectedPlayer.player.stats.skills.sleightOfHand}
                            firebasePath={`campaigns/${selectedCampaign.id}/players/${selectedPlayer.id}/stats/skills/sleightOfHand`}
                            abilityModifier={selectedPlayer.player.stats.dexterity}
                            label="	Sleight of Hand (DEX)"
                            proficiencyBonus={selectedPlayer.player.stats.proficiency}
                        />
                        <SensoSkillInput
                            initSkill={selectedPlayer.player.stats.skills.stealth}
                            firebasePath={`campaigns/${selectedCampaign.id}/players/${selectedPlayer.id}/stats/skills/stealth`}
                            abilityModifier={selectedPlayer.player.stats.dexterity}
                            label="Stealth (DEX)"
                            proficiencyBonus={selectedPlayer.player.stats.proficiency}
                        />
                        <SensoSkillInput
                            initSkill={selectedPlayer.player.stats.skills.survival}
                            firebasePath={`campaigns/${selectedCampaign.id}/players/${selectedPlayer.id}/stats/skills/survival`}
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
                firebasePath={`campaigns/${selectedCampaign.id}/players/${selectedPlayer.id}/actions`}
                label="Action" />
            <div style={{ gridColumn: "1/3" }}>

                <Divider />
            </div>
            <div style={{ gridColumn: "1/3" }}>
                <h3>Description and history:</h3>
                <DraftJSEditor
                    characterMentionList={characterMentionList}
                    locationMentionList={locationMentionList}
                    readOnly={false}
                    isDungeonMaster={isDungeonMaster}
                    JSONRef={storageRef?.child("PlayerDescription.json")}
                />
            </div>
            <SensoDelete
                storagePath={`Campaigns/${selectedCampaign.campaign.slug}/Players/${selectedPlayer.player.slug}`}
                databasePath={`campaigns/${selectedCampaign.id}/players/${selectedPlayer.id}`}
                instanceType="Player"
                linkPath={`/${selectedCampaign.campaign.slug}/players`}
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
export default CampaignPlayerEdit;
