import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getSelectedCampaign, getSelectedCharacter } from "../../store/selected/selectedSelectors";
import styled from "styled-components";
import { OLD_WHITE } from "../../assets/constants/Constants";
import IsLoading from "../../components/IsLoading/IsLoading";
import getAbilityModifier from "../../utils/getAbilityModifier";
import addPlusMinusPrefix from "../../utils/addPlusMinusPrefix";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
type CampaignProps = {};
const CampaignCharacter: FunctionComponent<CampaignProps> = () => {
    const history = useHistory();
    const selectedCampaign = useSelector(getSelectedCampaign);
    const selectedCharacter = useSelector(getSelectedCharacter)
    const parseProficiency = (proficient: any) => {
        if (proficient === "TRUE") {
            return <FiberManualRecordIcon style={{ width: "0.8rem" }} />
        }
        return null
    }
    if (selectedCharacter === undefined) {
        return (<Container><IsLoading /></Container>)
    }
    return (
        <Container>
            <NestedContainer style={{ width: "100%" }} >
                <h1 style={{ marginBottom: "0" }}>
                    {selectedCharacter.character.name}
                </h1>
                <NestedNestedContainer>
                    <div style={{ marginLeft: "0.5rem" }}>
                        {selectedCharacter.character.race},
                </div>
                    <div style={{ marginLeft: "0.5rem" }}>
                        {selectedCharacter.character.alignment}
                    </div>
                </NestedNestedContainer>
            </NestedContainer>
            <NestedContainer style={{ width: "100%" }} >
                <div style={{ width: "100%", borderBottom: "double" }}></div>

                <b>Summary: </b>{selectedCharacter.character.summary}
                <div style={{ width: "100%", borderBottom: "double" }}></div>

            </NestedContainer>
            <NestedContainer >
                <NestedNestedContainer>
                    <div ><b>Armor class: </b> </div>
                    <div style={{ paddingLeft: "0.3rem" }}>
                        {selectedCharacter.character.stats.armorClass}
                    </div>
                </NestedNestedContainer>
                <NestedNestedContainer>
                    <div >
                        <b>Hit points: </b>
                    </div>
                    <div style={{ paddingLeft: "0.3rem" }}>

                        {selectedCharacter.character.stats.hitPoints}
                    </div>
                </NestedNestedContainer>
                <NestedNestedContainer>
                    <div >
                        <b>Temporarly hitpoints: </b>
                    </div>
                    <div style={{ paddingLeft: "0.3rem" }}>
                        {selectedCharacter.character.stats.tempHitPoints}
                    </div>
                </NestedNestedContainer>
            </NestedContainer>

            <NestedContainer >
                <NestedNestedContainer>
                    <div ><b>Passive Perception: </b> </div>
                    <div style={{ paddingLeft: "0.3rem" }}>
                        {selectedCharacter.character.stats.passivePerception}
                    </div>
                </NestedNestedContainer>
                <NestedNestedContainer>
                    <div >
                        <b>Proficiency: </b>
                    </div>
                    <div style={{ paddingLeft: "0.3rem" }}>
                        {selectedCharacter.character.stats.proficiency}

                    </div>
                </NestedNestedContainer>
                <NestedNestedContainer>
                    <div>
                        <b>Inspiration: </b>
                    </div>
                    <div style={{ paddingLeft: "0.3rem" }}>
                        {selectedCharacter.character.stats.inspiration ? selectedCharacter.character.stats.inspiration === "TRUE" ? "Y" : "N" : null}
                    </div>
                </NestedNestedContainer>
            </NestedContainer>
            <div style={{ width: "100%", borderBottom: "double" }}></div>

            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", flexDirection: "row", alignItems: "space-between", width: "100%" }}>

                <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", width: "5rem" }}>
                    <b style={{ paddingRight: "0.3rem", fontSize: "1.4rem" }}>STR:</b>
                    {selectedCharacter.character.stats.strength}
                    ({getAbilityModifier(selectedCharacter.character.stats.strength)}),
                    <div style={{ paddingLeft: "0.2rem", paddingRight: "0.2rem" }}>Saving throw:
                    {addPlusMinusPrefix(selectedCharacter.character.stats.savingThrows.strength.value)}
                    </div>
                </div>
                <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", width: "5rem" }}>
                    <b style={{ paddingRight: "0.3rem", fontSize: "1.4rem" }}>DEX:</b>
                    {selectedCharacter.character.stats.dexterity}
                    ({getAbilityModifier(selectedCharacter.character.stats.dexterity)}),
                    <div style={{ paddingLeft: "0.2rem", paddingRight: "0.2rem" }}>Saving throw:
                    {addPlusMinusPrefix(selectedCharacter.character.stats.savingThrows.dexterity.value)}
                    </div>
                </div>
                <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", width: "5rem" }}>
                    <b style={{ paddingRight: "0.3rem", fontSize: "1.4rem" }}>CON:</b>
                    {selectedCharacter.character.stats.strength}
                    ({getAbilityModifier(selectedCharacter.character.stats.constitution)}),
                    <div style={{ paddingLeft: "0.2rem", paddingRight: "0.2rem" }}>Saving throw:
                    {addPlusMinusPrefix(selectedCharacter.character.stats.savingThrows.constitution.value)}
                    </div>
                </div>

                <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", width: "5rem" }}>
                    <b style={{ paddingRight: "0.3rem", fontSize: "1.4rem" }}>INT:</b>
                    {selectedCharacter.character.stats.strength}
                    ({getAbilityModifier(selectedCharacter.character.stats.intelligence)}),
                    <div style={{ paddingLeft: "0.2rem", paddingRight: "0.2rem" }}>Saving throw:
                    {addPlusMinusPrefix(selectedCharacter.character.stats.savingThrows.intelligence.value)}
                    </div>
                </div>
                <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", width: "5rem" }}>
                    <b style={{ paddingRight: "0.3rem", fontSize: "1.4rem" }}>WIS:</b>
                    {selectedCharacter.character.stats.strength}
                    ({getAbilityModifier(selectedCharacter.character.stats.wisdom)}),
                    <div style={{ paddingLeft: "0.2rem", paddingRight: "0.2rem" }}>Saving throw:
                    {addPlusMinusPrefix(selectedCharacter.character.stats.savingThrows.wisdom.value)}
                    </div>
                </div>
                <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", width: "5rem" }}>
                    <b style={{ paddingRight: "0.3rem", fontSize: "1.4rem" }}>CHA:</b>
                    {selectedCharacter.character.stats.strength}
                    ({getAbilityModifier(selectedCharacter.character.stats.charisma)}),
                    <div style={{ paddingLeft: "0.2rem", paddingRight: "0.2rem" }}>Saving throw:
                    {addPlusMinusPrefix(selectedCharacter.character.stats.savingThrows.charisma.value)}
                    </div>
                </div>
                <div style={{ width: "100%", borderBottom: "double" }}>

                </div>
                <div style={{ display: "flex", width: "100%", justifyContent: "space-between", flexDirection: "row", flexWrap: "wrap" }}>
                    <div style={{ display: "flex", width: "15rem", flexDirection: "column", alignItems: "center" }}>
                        <table style={{ width: "14rem" }}>
                            <tr>
                                <TableHeader >Proficient</TableHeader>
                                <TableHeader >Modifier</TableHeader>
                                <TableHeader >Skill</TableHeader>
                            </tr>
                            <tr>
                                <TableElement >{parseProficiency(selectedCharacter.character.stats.skills.acrobatics.proficient)}</TableElement>
                                <TableElement>{selectedCharacter.character.stats.skills.acrobatics.value}</TableElement>
                                <TableElement >Acrobatics (Dex)</TableElement>
                            </tr>
                            <tr>
                                <TableElement >{parseProficiency(selectedCharacter.character.stats.skills.animalHandling.proficient)}</TableElement>
                                <TableElement >{selectedCharacter.character.stats.skills.animalHandling.value}</TableElement>
                                <TableElement >Animal Handling (Dex)</TableElement>
                            </tr>
                            <tr>
                                <TableElement >{parseProficiency(selectedCharacter.character.stats.skills.arcana.proficient)}</TableElement>
                                <TableElement>{selectedCharacter.character.stats.skills.arcana.value}</TableElement>
                                <TableElement>Arcana (Int)</TableElement>
                            </tr>
                            <tr>
                                <TableElement >{parseProficiency(selectedCharacter.character.stats.skills.athletics.proficient)}</TableElement>
                                <TableElement>{selectedCharacter.character.stats.skills.athletics.value}</TableElement>
                                <TableElement>Athletics (Str)</TableElement>
                            </tr>
                            <tr>
                                <TableElement >{parseProficiency(selectedCharacter.character.stats.skills.deception.proficient)}</TableElement>
                                <TableElement>{selectedCharacter.character.stats.skills.deception.value}</TableElement>
                                <TableElement>Deception (Cha)</TableElement>
                            </tr>
                            <tr>
                                <TableElement >{parseProficiency(selectedCharacter.character.stats.skills.history.proficient)}</TableElement>
                                <TableElement>{selectedCharacter.character.stats.skills.history.value}</TableElement>
                                <TableElement>History (Int)</TableElement>
                            </tr>
                        </table>
                    </div>
                    <div style={{ display: "flex", width: "15rem", flexDirection: "column", alignItems: "center" }}>
                        <table style={{ width: "14rem" }}>
                            <tr>
                                <TableHeader >Proficient</TableHeader>
                                <TableHeader >Modifier</TableHeader>
                                <TableHeader >Skill</TableHeader>
                            </tr>
                            <tr>
                                <TableElement >{parseProficiency(selectedCharacter.character.stats.skills.insight.proficient)}</TableElement>
                                <TableElement>{selectedCharacter.character.stats.skills.insight.value}</TableElement>
                                <TableElement >Insight (Wis)</TableElement>
                            </tr>
                            <tr>
                                <TableElement >{parseProficiency(selectedCharacter.character.stats.skills.intimidation.proficient)}</TableElement>
                                <TableElement>{selectedCharacter.character.stats.skills.intimidation.value}</TableElement>
                                <TableElement>Intimidation (Cha)</TableElement>
                            </tr>
                            <tr>
                                <TableElement >{parseProficiency(selectedCharacter.character.stats.skills.investigation.proficient)}</TableElement>
                                <TableElement>{selectedCharacter.character.stats.skills.investigation.value}</TableElement>
                                <TableElement>Investigation (Int)</TableElement>
                            </tr>
                            <tr>
                                <TableElement >{parseProficiency(selectedCharacter.character.stats.skills.medicine.proficient)}</TableElement>
                                <TableElement>{selectedCharacter.character.stats.skills.medicine.value}</TableElement>
                                <TableElement>Medicine (Nature)</TableElement>
                            </tr>
                            <tr>
                                <TableElement >{parseProficiency(selectedCharacter.character.stats.skills.nature.proficient)}</TableElement>
                                <TableElement>{selectedCharacter.character.stats.skills.nature.value}</TableElement>
                                <TableElement>Nature (Int)</TableElement>
                            </tr>
                            <tr>
                                <TableElement >{parseProficiency(selectedCharacter.character.stats.skills.perception.proficient)}</TableElement>
                                <TableElement>{selectedCharacter.character.stats.skills.perception.value}</TableElement>
                                <TableElement>Perception (Wis)</TableElement>
                            </tr>
                        </table>
                    </div>
                    <div style={{ display: "flex", width: "15rem", flexDirection: "column", alignItems: "center" }}>
                        <table style={{ width: "14rem" }}>
                            <tr>
                                <TableHeader >Proficient</TableHeader>
                                <TableHeader >Modifier</TableHeader>
                                <TableHeader >Skill</TableHeader>
                            </tr>
                            <tr>
                                <TableElement >{parseProficiency(selectedCharacter.character.stats.skills.performance.proficient)}</TableElement>
                                <TableElement>{selectedCharacter.character.stats.skills.performance.value}</TableElement>
                                <TableElement >Performance (Cha)</TableElement>
                            </tr>
                            <tr>
                                <TableElement >{parseProficiency(selectedCharacter.character.stats.skills.persuasion.proficient)}</TableElement>
                                <TableElement>{selectedCharacter.character.stats.skills.persuasion.value}</TableElement>
                                <TableElement>Persuasion (Cha)</TableElement>
                            </tr>
                            <tr>
                                <TableElement >{parseProficiency(selectedCharacter.character.stats.skills.religion.proficient)}</TableElement>
                                <TableElement>{selectedCharacter.character.stats.skills.religion.value}</TableElement>
                                <TableElement>Religion (Int)</TableElement>
                            </tr>
                            <tr>
                                <TableElement >{parseProficiency(selectedCharacter.character.stats.skills.sleightOfHand.proficient)}</TableElement>
                                <TableElement>{selectedCharacter.character.stats.skills.sleightOfHand.value}</TableElement>
                                <TableElement>Sleight of Hand (Dex)</TableElement>
                            </tr>
                            <tr>
                                <TableElement >{parseProficiency(selectedCharacter.character.stats.skills.stealth.proficient)}</TableElement>
                                <TableElement>{selectedCharacter.character.stats.skills.stealth.value}</TableElement>
                                <TableElement>Stealth (Dex)</TableElement>
                            </tr>
                            <tr>
                                <TableElement >{parseProficiency(selectedCharacter.character.stats.skills.survival.proficient)}</TableElement>
                                <TableElement>{selectedCharacter.character.stats.skills.survival.value}</TableElement>
                                <TableElement>Survival (Wis)</TableElement>
                            </tr>
                        </table>
                    </div>
                </div>

            </div>
        </Container >
    )
};
const Container = styled.div`
width: 70%;
padding: 1rem;
-webkit-box-shadow: 5px 5px 15px 5px #000000;
box-shadow: 5px 0px 15px 2px #000000;
background-color: ${OLD_WHITE};
display: flex;
justify-content:space-between;
align-center: center;
flex-wrap:wrap;
min-height:20rem;
`;
const NestedContainer = styled.div`
display:grid;
grid-template-columns: 1fr;
justify-self: end;
grid-gap:auto;
min-width:15rem;
`

const NestedNestedContainer = styled.div`
display:flex;
align-items:center;
justify-items:flex-start;
font-size:1.2rem;

`
const TableHeader = styled.th`
text-align: center
`

const TableElement = styled.td`
text-align: center
`
export default CampaignCharacter;
