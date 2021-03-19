import React, {
    FunctionComponent,
} from "react";
import { useSelector } from "react-redux";
import { SensoTextInput, SensoNumberInput, SensoSwitch, SensoTextArrayInput, SensoMultilineTextInput, SensoActionInputs, SensoAbilityInput, SensoSkillInput, SensoDelete, SensoProficiencyInput } from "../../../components/SensoInputs"

import {
    getSelectedCampaign,
    getSelectedCampaignMonsterMentionList,
    getSelectedCampaignLocationMentionList,
    getSelectedMonster,
    getSelectedMonsterStoragePath,
    isDungeonMasterSelector,
    getSelectedCampaignPlayerMentionList
} from "../../../store/selected/selectedSelectors";
import styled from "styled-components";
import { OLD_WHITE } from "../../../assets/constants/Constants";
import IsLoading from "../../../components/IsLoading/IsLoading";
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

import {

    Divider, Tooltip,
} from "@material-ui/core";
import DraftJSEditor from "../../../components/DraftJSEditor/DraftJSEditor";
type CampaignProps = {};
const CampaignMonsterEdit: FunctionComponent<CampaignProps> = () => {
    const selectedMonster: ISelectedMonster | undefined = useSelector(
        getSelectedMonster
    );
    const selectedCampaign: ISelectedCampaign | undefined = useSelector(getSelectedCampaign)
    const isDungeonMaster = useSelector(isDungeonMasterSelector)
    console.log("selectedMonster", selectedMonster?.monster)
    const monsterMentionList = useSelector(getSelectedCampaignMonsterMentionList);
    const playerMentionList = useSelector(getSelectedCampaignPlayerMentionList);
    const locationMentionList = useSelector(getSelectedCampaignLocationMentionList);
    const monsterPath = useSelector(getSelectedMonsterStoragePath);

    if (selectedMonster === undefined || selectedCampaign === undefined) {
        return (
            <Container>
                <IsLoading />
            </Container>
        );
    }
    return (
        <Container>
            <div >
                <h1 style={{ marginBottom: "0" }}>
                    {selectedMonster.monster.name} {selectedMonster.monster.isPublished === "FALSE" ? "(Unpublished)" : null}
                </h1>
            </div>




            <SensoSwitch
                initValue={selectedMonster.monster.isPublished}
                firebasePath={`campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/isPublished`}
                label="Is published"
            />
            <SensoTextArrayInput
                initArray={selectedMonster.monster.nickNames}
                label="Also known as"
                firebasePath={`campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/nickNames`}
            />
            <div style={{ display: "flex", flexWrap: "wrap", flexDirection: "row" }}>

                <SensoTextInput
                    initValue={selectedMonster.monster.size}
                    firebasePath={`campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/size`}
                    label="Size"

                />
                <SensoTextInput
                    initValue={selectedMonster.monster.type}
                    firebasePath={`campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/type`}
                    label="Type"

                />
                <SensoTextInput
                    initValue={selectedMonster.monster.alignment}
                    firebasePath={`campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/alignment`}
                    label="Alignment"

                />

            </div>

            <DividerBlock style={{ width: "100%" }} />

            <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
                <div style={{ display: "grid", gap: "0.5rem" }}>

                    <SensoNumberInput
                        initValue={selectedMonster.monster.stats.armorClass}
                        firebasePath={`campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/stats/armorClass`}
                        label="Armor class"
                        isNegativeValid={false} />
                    <div style={{ display: "flex", flexWrap: "wrap" }}>

                        <SensoNumberInput
                            initValue={selectedMonster.monster.stats.hitPoints}
                            firebasePath={`campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/stats/hitpoints`}
                            label="Hit points"
                            isNegativeValid={false}
                        />
                        <SensoTextInput
                            initValue={selectedMonster.monster.stats.hitDice}
                            firebasePath={`campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/stats/hitDice`}
                            label="Hit dice"

                        />
                    </div>
                    <h3>Speed</h3>
                    <SensoTextInput
                        initValue={selectedMonster.monster.stats.speed.walk}
                        firebasePath={`campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/stats/speed/walk`}
                        label="Walking speed"
                    />
                    <SensoTextInput
                        initValue={selectedMonster.monster.stats.speed.swim}
                        firebasePath={`campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/stats/speed/swim`}
                        label="Swiming speed"
                    />
                    <SensoTextInput
                        initValue={selectedMonster.monster.stats.speed.climb}
                        firebasePath={`campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/stats/speed/climb`}
                        label="Climbing speed"
                    />
                    <SensoTextInput
                        initValue={selectedMonster.monster.stats.speed.fly}
                        firebasePath={`campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/stats/speed/fly`}
                        label="Flying speed"
                    />
                </div>
                <div style={{ display: "grid", gap: "0.5rem" }}>
                    <SensoTextInput
                        initValue={selectedMonster.monster.challengeRating}
                        firebasePath={`campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/challengeRating`}
                        label="Challenge rating"
                        style={{ maxWidth: "10rem" }}
                    />
                    <SensoTextArrayInput
                        initArray={selectedMonster.monster.languages}
                        label="Languages"
                        firebasePath={`campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/languages`}
                    />
                    <h3>Senses</h3>
                    <SensoNumberInput
                        initValue={selectedMonster.monster.senses?.passive_perception}
                        firebasePath={`campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/senses/passive_perception`}
                        label="Passive perception"
                        isNegativeValid={false}
                    />
                    <SensoTextInput
                        initValue={selectedMonster.monster.senses?.darkvision}
                        firebasePath={`campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/senses/darkvision`}
                        label="Darkvision"
                    />
                    <SensoTextInput
                        initValue={selectedMonster.monster.senses?.blindsight}
                        firebasePath={`campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/senses/blindsight`}
                        label="Blindsight"
                    />
                    <SensoTextInput
                        initValue={selectedMonster.monster.senses?.truesight}
                        firebasePath={`campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/senses/truesight`}
                        label="Truesight"
                    />

                    <SensoTextInput
                        initValue={selectedMonster.monster.senses?.tremorsense}
                        firebasePath={`campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/senses/tremorsense`}
                        label="Tremorsense"
                    />

                </div>
            </div>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <Tooltip title={"This summary is visible for players"}>
                    <HelpOutlineIcon />
                </Tooltip>
            </div>
            <SensoMultilineTextInput
                initValue={selectedMonster.monster.summary}
                firebasePath={`campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/summary`}
                label="Summary"
                rows={4}
            />
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>

                <SensoProficiencyInput
                    initProficiencies={selectedMonster.monster.stats.proficiencies}
                    firebasePath={`campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/stats/proficiencies`}

                />
                <DividerBlock style={{ width: "100%" }} />
                <SensoTextArrayInput
                    initArray={selectedMonster.monster.damageImmunities}
                    label="Damage immunities"
                    firebasePath={`campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/damageImmunities`}
                />
                <SensoTextArrayInput
                    initArray={selectedMonster.monster.conditionImmunities}
                    label="Condition immunities"
                    firebasePath={`campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/conditionImmunities`}
                />
                <SensoTextArrayInput
                    initArray={selectedMonster.monster.damageResistances}
                    label="Damage resistance"
                    firebasePath={`campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/damageResistances`}
                />
                <SensoTextArrayInput
                    initArray={selectedMonster.monster.damageVulnerabilities}
                    label="Damage vulnerabilities"
                    firebasePath={`campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/damageVulnerabilities`}
                />


            </div>
            <h2>Special Abilities</h2>
            <SensoActionInputs
                actions={selectedMonster.monster.specialAbilities}
                label="Abilities"
                firebasePath={`campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/specialAbilities`}
            />
            <h2>Actions</h2>
            <SensoActionInputs
                actions={selectedMonster.monster.actions}
                label="Actions"
                firebasePath={`campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}/actions`}
            />
            {/*
           

           
            
   
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
                    storagePath={`${monsterPath}/monsterDescription.json`}
                />
            </div>
            <SensoDelete
                storagePath={`Campaigns/${selectedCampaign.campaign.slug}/Monsters/${selectedMonster.monster.slug}`}
                databasePath={`campaigns/${selectedCampaign.id}/monsters/${selectedMonster.id}`}
                instanceType="Character"
                linkPath={`/${selectedCampaign.campaign.slug}/monsters`}
            /> */}
        </Container >
    );
};

const Container = styled.div`
width: 70%;
  padding: 1rem;
  display:grid;
  gap:0.5rem;
  grid-template-columns: auto-fit;
  -webkit-box-shadow: 5px 5px 15px 5px #000000;
  box-shadow: 5px 0px 15px 2px #000000;
  background-color: ${OLD_WHITE};
  min-height: 20rem;
`;
const DividerBlock = styled(Divider)`
margin-top:1rem;
margin-bottom:1rem;
`
export default CampaignMonsterEdit;
