import React, {
    FunctionComponent,
} from "react";
import { useSelector } from "react-redux";
import { ChaTextInput, ChaNumberInput, ChaSwitch, ChaTextArrayInput, ChaMultilineTextInput, ChaAccordianInput, ChaAbilityInput, ChaSkillInput } from "../../components/CharacterEditSheet"

import {
    getSelectedCampaign,
    getSelectedCampaignCharacterMentionList,
    getSelectedCharacter,
    getSelectedCharacterIsPlayer,
    getSelectedCharacterStorageRef,
} from "../../store/selected/selectedSelectors";
import styled from "styled-components";
import { OLD_WHITE } from "../../assets/constants/Constants";
import IsLoading from "../../components/IsLoading/IsLoading";

import {

    Divider,
} from "@material-ui/core";
import DraftJSEditor from "../../components/DraftJSEditor/DraftJSEditor";
type CampaignProps = {};
const CampaignCharacterEdit: FunctionComponent<CampaignProps> = () => {
    const selectedCharacter: ISelectedCharacter | undefined = useSelector(
        getSelectedCharacter
    );
    const selectedCampaign: ISelectedCampaign | undefined = useSelector(getSelectedCampaign)
    const characerMentionList = useSelector(getSelectedCampaignCharacterMentionList);
    const storageRef = useSelector(getSelectedCharacterStorageRef);
    const isPlayer = useSelector(getSelectedCharacterIsPlayer);

    if (selectedCharacter === undefined || selectedCampaign === undefined) {
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
                    {selectedCharacter.character.name} {selectedCharacter.character.isPublished === "FALSE" ? "(Unpublished)" : null}
                </h1>
            </div>



            <ChaTextArrayInput
                initArray={selectedCharacter.character.nickNames}
                label="Also known as"
                firebasePath={`campaigns/${selectedCampaign.id}/characters/${selectedCharacter.id}/nickNames`}
            />
            <ChaSwitch
                initValue={selectedCharacter.character.isPublished}
                firebasePath={`campaigns/${selectedCampaign.id}/characters/${selectedCharacter.id}/isPublished`}
                label="Is published"
            />
            <div style={{ gridColumn: "1/3" }}>

                <Divider />
            </div>
            <h2 style={{ gridColumn: "1/3", textAlign: "center" }}>Basic info</h2>
            <ChaTextInput
                initValue={selectedCharacter.character.race}
                firebasePath={`campaigns/${selectedCampaign.id}/characters/${selectedCharacter.id}/race`}
                label="Race"

            />
            <ChaTextInput
                initValue={selectedCharacter.character.class}
                firebasePath={`campaigns/${selectedCampaign.id}/characters/${selectedCharacter.id}/class`}
                label="Class"

            />
            <ChaTextInput
                initValue={selectedCharacter.character.alignment}
                firebasePath={`campaigns/${selectedCampaign.id}/characters/${selectedCharacter.id}/alignment`}
                label="Alignment"

            />
            {isPlayer ? (
                <ChaNumberInput
                    initValue={selectedCharacter.character.level}
                    firebasePath={`campaigns/${selectedCampaign.id}/characters/${selectedCharacter.id}/level`}
                    label="Level"
                    isNegativeValid={false}
                    style={{ width: "10rem" }}


                />
            ) : (
                <ChaTextInput
                    initValue={selectedCharacter.character.challengeRating}
                    firebasePath={`campaigns/${selectedCampaign.id}/characters/${selectedCharacter.id}/challengeRating`}
                    label="Challenge rating"
                    style={{ maxWidth: "10rem" }}


                />
            )}

            <div style={{ gridColumn: "1/3" }}>
                <ChaMultilineTextInput
                    initValue={selectedCharacter.character.summary}
                    firebasePath={`campaigns/${selectedCampaign.id}/characters/${selectedCharacter.id}/summary`}
                    label="Summary"
                    rows={4}
                />
            </div>
            <div style={{ gridColumn: "1/3" }}>

                <Divider />
            </div>
            <h2 style={{ gridColumn: "1/3", textAlign: "center" }}>Character Stats</h2>
            <ChaNumberInput
                initValue={selectedCharacter.character.stats.armorClass}
                firebasePath={`campaigns/${selectedCampaign.id}/characters/${selectedCharacter.id}/stats/armorClass`}
                label="Armor class"
                isNegativeValid={false} />
            <ChaNumberInput
                initValue={selectedCharacter.character.stats.speed}
                firebasePath={`campaigns/${selectedCampaign.id}/characters/${selectedCharacter.id}/stats/speed/`}
                label="Speed"
                isNegativeValid={false}
            />
            <ChaNumberInput
                initValue={selectedCharacter.character.stats.proficiency}
                firebasePath={`campaigns/${selectedCampaign.id}/characters/${selectedCharacter.id}/stats/proficiency`}
                label="Proficiency bonus"
                isNegativeValid={false}

            />
            <ChaNumberInput
                initValue={selectedCharacter.character.stats.hitPoints}
                firebasePath={`campaigns/${selectedCampaign.id}/characters/${selectedCharacter.id}/stats/hitpoints`}
                label="Hit points"
                isNegativeValid={false}
            />
            <ChaSwitch
                initValue={selectedCharacter.character.stats.inspiration}
                firebasePath={`campaigns/${selectedCampaign.id}/characters/${selectedCharacter.id}/stats/inspiration`}
                label="Inspiration"
            />

            <ChaSwitch
                initValue={selectedCharacter.character.isUnique}
                firebasePath={`campaigns/${selectedCampaign.id}/characters/${selectedCharacter.id}/isUnique`}
                label="is Unique" />

            <div style={{ display: "grid", gridTemplateColumns: "1fr" }}>
                <p>
                    <b>Passive Perception: </b>123
                    </p>
                <i>Calculated from Wisdom</i>
            </div>
            <ChaTextArrayInput
                initArray={selectedCharacter.character.senses}
                firebasePath={`campaigns/${selectedCampaign.id}/characters/${selectedCharacter.id}/senses`}
                label="Senses"
            />
            <ChaTextArrayInput
                initArray={selectedCharacter.character.immunities}
                firebasePath={`campaigns/${selectedCampaign.id}/characters/${selectedCharacter.id}/immunities`}
                label="Immunities"
            />
            <div style={{ display: "flex", gridColumn: "1/3", justifyContent: "flex-start", flexWrap: "wrap" }}>

                <ChaAbilityInput
                    initAbilityValue={selectedCharacter.character.stats.strength}
                    firebasePath={`campaigns/${selectedCampaign.id}/characters/${selectedCharacter.id}/stats/strength`}
                    label="STR"
                    proficiencyBonus={selectedCharacter.character.stats.proficiency}
                />
                <ChaAbilityInput
                    initAbilityValue={selectedCharacter.character.stats.dexterity}
                    firebasePath={`campaigns/${selectedCampaign.id}/characters/${selectedCharacter.id}/stats/dexterity`}
                    label="DEX"
                    proficiencyBonus={selectedCharacter.character.stats.proficiency}
                />

                <ChaAbilityInput
                    initAbilityValue={selectedCharacter.character.stats.constitution}
                    firebasePath={`campaigns/${selectedCampaign.id}/characters/${selectedCharacter.id}/stats/constitution`}
                    label="CON"
                    proficiencyBonus={selectedCharacter.character.stats.proficiency}
                />

                <ChaAbilityInput
                    initAbilityValue={selectedCharacter.character.stats.intelligence}
                    firebasePath={`campaigns/${selectedCampaign.id}/characters/${selectedCharacter.id}/stats/intelligence`}
                    label="INT"
                    proficiencyBonus={selectedCharacter.character.stats.proficiency}
                />

                <ChaAbilityInput
                    initAbilityValue={selectedCharacter.character.stats.wisdom}
                    firebasePath={`campaigns/${selectedCampaign.id}/characters/${selectedCharacter.id}/stats/wisdom`}
                    label="WIS"
                    proficiencyBonus={selectedCharacter.character.stats.proficiency}
                />

                <ChaAbilityInput
                    initAbilityValue={selectedCharacter.character.stats.charisma}
                    firebasePath={`campaigns/${selectedCampaign.id}/characters/${selectedCharacter.id}/stats/charisma`}
                    label="CHA"
                    proficiencyBonus={selectedCharacter.character.stats.proficiency}
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
                        <ChaSkillInput
                            abilityModifier={selectedCharacter.character.stats.dexterity}
                            initSkill={selectedCharacter.character.stats.skills.acrobatics}
                            proficiencyBonus={selectedCharacter.character.stats.proficiency}
                            firebasePath={`campaigns/${selectedCampaign.id}/characters/${selectedCharacter.id}/stats/skills/acrobatics`}
                            label="Acrobatics (DEX)"
                        />
                        <ChaSkillInput
                            initSkill={selectedCharacter.character.stats.skills.animalHandling}
                            firebasePath={`campaigns/${selectedCampaign.id}/characters/${selectedCharacter.id}/stats/skills/animalHandling`}
                            abilityModifier={selectedCharacter.character.stats.dexterity}
                            label="Animal Handling (DEX)"
                            proficiencyBonus={selectedCharacter.character.stats.proficiency}
                        />
                        <ChaSkillInput
                            initSkill={selectedCharacter.character.stats.skills.arcana}
                            firebasePath={`campaigns/${selectedCampaign.id}/characters/${selectedCharacter.id}/stats/skills/arcana`}
                            abilityModifier={selectedCharacter.character.stats.intelligence}
                            label="Arcana (INT)"
                            proficiencyBonus={selectedCharacter.character.stats.proficiency}
                        />
                        <ChaSkillInput
                            initSkill={selectedCharacter.character.stats.skills.athletics}
                            firebasePath={`campaigns/${selectedCampaign.id}/characters/${selectedCharacter.id}/stats/skills/athletics`}
                            abilityModifier={selectedCharacter.character.stats.strength}
                            label="Athletics (STR)"
                            proficiencyBonus={selectedCharacter.character.stats.proficiency}
                        />
                        <ChaSkillInput
                            initSkill={selectedCharacter.character.stats.skills.deception}
                            firebasePath={`campaigns/${selectedCampaign.id}/characters/${selectedCharacter.id}/stats/skills/deception`}
                            abilityModifier={selectedCharacter.character.stats.charisma}
                            label="Deception (CHA)"
                            proficiencyBonus={selectedCharacter.character.stats.proficiency}
                        />
                        <ChaSkillInput
                            initSkill={selectedCharacter.character.stats.skills.history}
                            firebasePath={`campaigns/${selectedCampaign.id}/characters/${selectedCharacter.id}/stats/skills/history`}
                            abilityModifier={selectedCharacter.character.stats.intelligence}
                            label="History (INT)"
                            proficiencyBonus={selectedCharacter.character.stats.proficiency}
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

                        <ChaSkillInput
                            initSkill={selectedCharacter.character.stats.skills.insight}
                            firebasePath={`campaigns/${selectedCampaign.id}/characters/${selectedCharacter.id}/stats/skills/insight`}
                            abilityModifier={selectedCharacter.character.stats.wisdom}
                            label="Insight (WIS)"
                            proficiencyBonus={selectedCharacter.character.stats.proficiency}
                        />
                        <ChaSkillInput
                            initSkill={selectedCharacter.character.stats.skills.intimidation}
                            firebasePath={`campaigns/${selectedCampaign.id}/characters/${selectedCharacter.id}/stats/skills/intimidation`}
                            abilityModifier={selectedCharacter.character.stats.charisma}
                            label="Intimidation (CHA)"
                            proficiencyBonus={selectedCharacter.character.stats.proficiency}
                        />
                        <ChaSkillInput
                            initSkill={selectedCharacter.character.stats.skills.investigation}
                            firebasePath={`campaigns/${selectedCampaign.id}/characters/${selectedCharacter.id}/stats/skills/investigation`}
                            abilityModifier={selectedCharacter.character.stats.intelligence}
                            label="Investigation (INT)"
                            proficiencyBonus={selectedCharacter.character.stats.proficiency}
                        />
                        <ChaSkillInput
                            initSkill={selectedCharacter.character.stats.skills.medicine}
                            firebasePath={`campaigns/${selectedCampaign.id}/characters/${selectedCharacter.id}/stats/skills/medicine`}
                            abilityModifier={selectedCharacter.character.stats.wisdom}
                            label="Medicine (Wis)"
                            proficiencyBonus={selectedCharacter.character.stats.proficiency}
                        />
                        <ChaSkillInput
                            initSkill={selectedCharacter.character.stats.skills.nature}
                            firebasePath={`campaigns/${selectedCampaign.id}/characters/${selectedCharacter.id}/stats/skills/nature`}
                            abilityModifier={selectedCharacter.character.stats.intelligence}
                            label="Nature (INT)"
                            proficiencyBonus={selectedCharacter.character.stats.proficiency}
                        />
                        <ChaSkillInput
                            initSkill={selectedCharacter.character.stats.skills.perception}
                            firebasePath={`campaigns/${selectedCampaign.id}/characters/${selectedCharacter.id}/stats/skills/perception`}
                            abilityModifier={selectedCharacter.character.stats.wisdom}
                            label="Perception (WIS)"
                            proficiencyBonus={selectedCharacter.character.stats.proficiency}
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

                        <ChaSkillInput
                            initSkill={selectedCharacter.character.stats.skills.performance}
                            firebasePath={`campaigns/${selectedCampaign.id}/characters/${selectedCharacter.id}/stats/skills/performance`}
                            abilityModifier={selectedCharacter.character.stats.charisma}
                            label="Performance (CHA)"
                            proficiencyBonus={selectedCharacter.character.stats.proficiency}
                        />
                        <ChaSkillInput
                            initSkill={selectedCharacter.character.stats.skills.persuasion}
                            firebasePath={`campaigns/${selectedCampaign.id}/characters/${selectedCharacter.id}/stats/skills/persuasion`}
                            abilityModifier={selectedCharacter.character.stats.charisma}
                            label="Persuasion (CHA)"
                            proficiencyBonus={selectedCharacter.character.stats.proficiency}
                        />
                        <ChaSkillInput
                            initSkill={selectedCharacter.character.stats.skills.religion}
                            firebasePath={`campaigns/${selectedCampaign.id}/characters/${selectedCharacter.id}/stats/skills/religion`}
                            abilityModifier={selectedCharacter.character.stats.intelligence}
                            label="Religion (INT)"
                            proficiencyBonus={selectedCharacter.character.stats.proficiency}
                        />
                        <ChaSkillInput
                            initSkill={selectedCharacter.character.stats.skills.sleightOfHand}
                            firebasePath={`campaigns/${selectedCampaign.id}/characters/${selectedCharacter.id}/stats/skills/sleightOfHand`}
                            abilityModifier={selectedCharacter.character.stats.dexterity}
                            label="	Sleight of Hand (DEX)"
                            proficiencyBonus={selectedCharacter.character.stats.proficiency}
                        />
                        <ChaSkillInput
                            initSkill={selectedCharacter.character.stats.skills.stealth}
                            firebasePath={`campaigns/${selectedCampaign.id}/characters/${selectedCharacter.id}/stats/skills/stealth`}
                            abilityModifier={selectedCharacter.character.stats.dexterity}
                            label="Stealth (DEX)"
                            proficiencyBonus={selectedCharacter.character.stats.proficiency}
                        />
                        <ChaSkillInput
                            initSkill={selectedCharacter.character.stats.skills.survival}
                            firebasePath={`campaigns/${selectedCampaign.id}/characters/${selectedCharacter.id}/stats/skills/survival`}
                            abilityModifier={selectedCharacter.character.stats.wisdom}
                            label="Survival (WIS)"
                            proficiencyBonus={selectedCharacter.character.stats.proficiency}
                        />
                    </tbody>
                </table>

            </div>
            <ChaAccordianInput
                style={{ gridColumn: "1/3" }}
                initArray={selectedCharacter.character.actions}
                firebasePath={`campaigns/${selectedCampaign.id}/characters/${selectedCharacter.id}/actions`}
                label="Action" />
            <div style={{ gridColumn: "1/3" }}>

                <Divider />
            </div>
            <div style={{ gridColumn: "1/3" }}>
                <h3>Description and history:</h3>
                <DraftJSEditor
                    characterMentionList={characerMentionList}
                    readOnly={false}
                    JSONRef={storageRef?.child("CharacterDescription.json")}
                />
            </div>

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
export default CampaignCharacterEdit;
