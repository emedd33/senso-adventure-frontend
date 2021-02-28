import React, { FunctionComponent, useState } from "react";
import { useSelector } from "react-redux";
import { getSelectedCharacter, getSelectedCharacterDatabaseRef, getSelectedCharacterIsPlayer } from "../../store/selected/selectedSelectors";
import styled from "styled-components";
import { OLD_WHITE } from "../../assets/constants/Constants";
import IsLoading from "../../components/IsLoading/IsLoading";
import getAbilityModifier from "../../utils/getAbilityModifier";
import addPlusMinusPrefix from "../../utils/addPlusMinusPrefix";
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import { Button, Chip, Switch, TextField } from "@material-ui/core";
import useInterval from "../../store/hooks/useInterval";
import useSavedState from "../../store/hooks/useSavedState";
import onChangeNumberField from "../../utils/onChangeNumberField";
import parseValuesToString from "../../utils/parseValuesToString";
type CampaignProps = {};
const CampaignCharacterEdit: FunctionComponent<CampaignProps> = () => {
    const selectedCharacter: ISelectedCharacter | undefined = useSelector(getSelectedCharacter)
    const characterRef = useSelector(getSelectedCharacterDatabaseRef)
    const isPlayer = useSelector(getSelectedCharacterIsPlayer)
    const [race, setRace, saveRace, isSavedRace] = useSavedState(selectedCharacter?.character.race)
    const [characterClass, setCharacterClass, saveCharacterClass, isSavedCharacterClass] = useSavedState(selectedCharacter?.character.class)
    const [alignment, setAlignment, saveAlignment, isSavedAlignment] = useSavedState(selectedCharacter?.character.alignment)
    const [challengeRating, setChallengeRating, saveChallengeRating, isSavedChallengeRating] = useSavedState("")
    const [level, setLevel, saveLevel, isSavedLevel] = useSavedState(selectedCharacter?.character.level)
    const [summary, setSummary, saveSummary, isSavedSummary] = useSavedState(selectedCharacter?.character.summary)
    const [summaryError, setSummaryError] = useState(false)
    const [armorClass, setArmorClass, saveArmorClass, isSavedArmorClass] = useSavedState(selectedCharacter?.character.stats.armorClass)
    const [hitPoints, setHitPoints, saveHitPoints, isSavedHitPoints] = useSavedState(selectedCharacter?.character.stats.hitPoints)
    const [tempHitPoints, setTempHitPoints, saveTempHitPoints, isSavedTempHitPoints] = useSavedState(selectedCharacter?.character.stats.tempHitPoints)
    const [passivePerception, setPassivePerception, savePassivePerception, isSavedPassivePerception] = useSavedState(selectedCharacter?.character.stats.passivePerception)
    const [proficiency, setProficiency, saveProficiency, isSavedProficiency] = useSavedState(selectedCharacter?.character.stats.proficiency)
    const [inspiration, setInspiration, saveInspiration, isSavedInspiration] = useSavedState(selectedCharacter?.character.stats.inspiration === "TRUE")
    const [senses, setSenses, saveSenses, isSavedSenses] = useSavedState(selectedCharacter?.character.senses ? selectedCharacter?.character.senses : [])
    const [newSens, setNewSens] = useState("")
    const [immunities, setImmunities, saveImmunities, isSavedImmunities] = useSavedState(selectedCharacter?.character.immunities ? selectedCharacter?.character.immunities : [])
    const [newImmunity, setNewImmunity] = useState("")
    const [isUnique, setIsUnique, saveIsUnique, isSavedIsUnique] = useSavedState(selectedCharacter?.character.isUnique === "TRUE")


    const parseStringBooleanToCheckmark = (proficient: any, setCross: boolean) => {
        if (proficient === "TRUE") {
            return <CheckIcon style={{ width: "0.8rem", color: "green" }} />
        } if (setCross) {
            return <ClearIcon style={{ width: "0.8rem", color: "red" }} />

        }
        return null
    }
    const renderArrayOfString = (array: string[] | undefined) => {
        if (!array) {
            return ""
        }
        let lastIndex = array.length - 1
        return array.map((elem: string, index: number) => {
            if (index !== lastIndex) {
                return `${elem}, `
            }
            return `${elem}`
        })
    }
    useInterval(() => {
        if (characterRef) {
            if (!isSavedRace) {
                saveRace()
                characterRef.child("race").set(race)
            }
            if (!isSavedCharacterClass) {
                saveCharacterClass()
                characterRef.child("class").set(characterClass)
            }
            if (!isSavedAlignment) {
                saveAlignment()
                characterRef.child("alignment").set(alignment)
            }
            if (!isSavedChallengeRating) {
                saveChallengeRating()
                characterRef.child("challengeRating").set(challengeRating)
            }
            if (!isSavedLevel) {
                saveLevel()
                characterRef.child("level").set(level)
            }
            if (!isSavedSummary) {
                saveSummary()
                characterRef.child("summary").set(summary)
            }
            if (!isSavedArmorClass) {
                saveArmorClass()
                characterRef.child("armorClass").set(armorClass)
            }
            if (!isSavedHitPoints) {
                saveHitPoints()
                characterRef.child("stats").child("hitPoints").set(hitPoints)
            }
            if (!isSavedTempHitPoints) {
                saveTempHitPoints()
                characterRef.child("stats").child("tempHitPoints").set(tempHitPoints)
            }
            if (!isSavedPassivePerception) {
                savePassivePerception()
                characterRef.child("stats").child("passivePerception").set(passivePerception)
            }
            if (!isSavedProficiency) {
                saveProficiency()
                characterRef.child("stats").child("proficiency").set(proficiency)

            }
            if (!isSavedInspiration) {
                saveInspiration()
                characterRef.child("stats").child("inspiration").set(inspiration ? "TRUE" : "FALSE")
            }
            if (!isSavedSenses) {
                saveSenses()
                characterRef.child("senses").set(senses)
            }
            if (!isSavedImmunities) {
                saveImmunities()
                characterRef.child("stats").child("immunities").set(immunities)
            }
            if (!isSavedIsUnique) {
                saveIsUnique()
                characterRef.child("isUnique").set(isUnique ? "TRUE" : "FALSE")
            }
        }
    }, 3000)
    if (selectedCharacter === undefined) {
        return (<Container><IsLoading /></Container>)
    }
    return (
        <Container>
            <NestedContainer style={{ flex: 1 }} >
                <div style={{ display: "grid", width: "100%", gridTemplateColumns: "1fr 1fr", height: "5rem" }}>
                    <h1 style={{ marginBottom: "0" }}>
                        {selectedCharacter.character.name}
                    </h1>

                </div>
                <NestedNestedContainer>
                    <div style={{ marginLeft: "0.5rem" }}>
                        <TextField variant="outlined" label="Race" value={race} onChange={(event) => { console.log("onChange", event.target.value); setRace(event.target.value) }} />
                    </div>
                    {selectedCharacter.character.class ?
                        <div style={{ marginLeft: "0.5rem" }}>
                            <TextField variant="outlined" label="Class" value={characterClass} onChange={(event) => setCharacterClass(event.target.value)} />
                        </div>
                        : null}
                    <div style={{ marginLeft: "0.5rem" }}>
                        <TextField variant="outlined" label="Alignment" value={alignment} onChange={(event) => setAlignment(event.target.value)} />
                    </div>
                    <div style={{ marginLeft: "0.5rem" }}>
                        {isPlayer ? (
                            <TextField label="Level" type="number" variant="outlined" InputLabelProps={{ shrink: true }} value={level} onChange={(event) => onChangeNumberField(event.target.value, setLevel, true, false)} />

                        ) : (
                                <TextField variant="outlined" label="Challenge Rating" value={challengeRating} onChange={(event) => setChallengeRating(event.target.value)} />

                            )}
                    </div>
                </NestedNestedContainer>

            </NestedContainer>
            <NestedContainer style={{ width: "100%", marginTop: "1rem", marginBottom: "1rem" }} >

                <TextField
                    label="Summary"
                    multiline
                    rows={4}
                    value={summary}
                    error={summaryError}
                    onChange={(event) => {
                        if (event.target.value.length > 400) {
                            setSummaryError(true)
                        } else {
                            setSummaryError(false)
                            setSummary(event.target.value)
                        }
                    }}
                    defaultValue="Default Value"
                    variant="filled"
                />

            </NestedContainer>
            <div >
                <NestedNestedContainer>
                    <div style={{ paddingLeft: "0.3rem", margin: "0.3rem" }}>
                        <TextField label="Armor Class" type="number" variant="outlined" InputLabelProps={{ shrink: true }} value={armorClass} onChange={(event) => onChangeNumberField(event.target.value, setArmorClass, true, false)} />
                    </div>
                </NestedNestedContainer>
                <NestedNestedContainer>
                    <div style={{ paddingLeft: "0.3rem", margin: "0.3rem" }}>
                        <TextField label="Hitpoints" type="number" variant="outlined" InputLabelProps={{ shrink: true }} value={hitPoints} onChange={(event) => onChangeNumberField(event.target.value, setHitPoints, true, false)} />
                    </div>
                </NestedNestedContainer>
                <NestedNestedContainer>
                    <div style={{ paddingLeft: "0.3rem", margin: "0.3rem" }}>
                        <TextField label="Temporarly Hitpoints" type="number" variant="outlined" InputLabelProps={{ shrink: true }} value={tempHitPoints} onChange={(event) => onChangeNumberField(event.target.value, setTempHitPoints, true, false)} />
                    </div>
                </NestedNestedContainer>
            </div>

            <div   >
                <NestedNestedContainer>
                    <div ><b>Passive Perception: </b> </div>
                    <div style={{ paddingLeft: "0.3rem" }}>
                        {passivePerception}
                    </div>
                </NestedNestedContainer>
                <NestedNestedContainer>
                    <div style={{ paddingLeft: "0.3rem" }}>
                        <TextField label="Proficiency" type="number" variant="outlined" InputLabelProps={{ shrink: true }} value={proficiency} onChange={(event) => onChangeNumberField(event.target.value, setProficiency, true, false)} />
                    </div>
                </NestedNestedContainer>
                <NestedNestedContainer>

                    <div>
                        <b>Inspiration: </b>
                    </div>
                    <Switch
                        checked={inspiration}
                        onChange={(event) => {
                            setInspiration(event.target.checked)
                        }}
                        color="primary"
                        name="checkedB"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />

                </NestedNestedContainer>
            </div>

            <div >
                <NestedNestedContainer style={{ flexDirection: "column", width: "15rem", alignItems: "flex-start" }}>

                    <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", margin: "0.3rem" }}>
                        <b>Senses: </b>
                        {senses ? senses.map((sens: string) => <Chip style={{ marginLeft: "0.2rem", backgroundColor: "white" }} label={sens} onDelete={() => setSenses((existingSenses: string[]) => existingSenses.filter((existingSens: string) => existingSens !== sens))} variant="outlined" />) : null}
                    </div>
                    <div style={{ display: "flex", flexDirection: "row", marginLeft: "1rem", alignItems: "center", margin: "0.3rem" }}>

                        <TextField onKeyDown={(event) => (newSens && event.key === "Enter") ? setSenses((existingSenses: string[]) => [...existingSenses, newSens]) : null} style={{ marginTop: "0.5rem", marginRight: "0.5rem" }} variant="outlined" onChange={(event) => setNewSens(event.target.value)} label="Senses" value={newSens} />
                        <Button variant="contained" color="primary" style={{ height: "2rem" }} onClick={() => newSens ? setSenses((existingSenses: string[]) => [...existingSenses, newSens]) : null}>Add</Button>
                    </div>
                </NestedNestedContainer>
                <NestedNestedContainer style={{ flexDirection: "column", alignItems: "flex-start", width: "15rem", }}>
                    <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", margin: "0.3rem" }}>
                        <b>Immunities: </b>
                        {immunities ? immunities.map((immunity: string) => <Chip style={{ marginLeft: "0.2rem", backgroundColor: "white" }} label={immunity} onDelete={() => setImmunities((existingImmunities: string[]) => existingImmunities.filter((existingImmunity: string) => existingImmunity !== immunity))} variant="outlined" />) : null}
                    </div>
                    <div style={{ display: "flex", flexDirection: "row", marginLeft: "1rem", alignItems: "center", margin: "0.3rem" }}>

                        <TextField onKeyDown={(event) => (newImmunity && event.key === "Enter") ? setImmunities((existingImmunities: string[]) => [...existingImmunities, newImmunity]) : null} style={{ marginTop: "0.5rem", marginRight: "0.5rem" }} variant="outlined" onChange={(event) => setNewImmunity(event.target.value)} label="Immunities" value={newImmunity} />
                        <Button variant="contained" color="primary" style={{ height: "2rem" }} onClick={() => newImmunity ? setImmunities((existingImmunities: string[]) => [...existingImmunities, newImmunity]) : null}>Add</Button>
                    </div>
                </NestedNestedContainer>
                <NestedNestedContainer>
                    <div>
                        <b>Unique: </b>
                    </div>
                    <Switch
                        checked={isUnique}
                        onChange={(event) => {
                            setIsUnique(event.target.checked)
                        }}
                        color="primary"
                        name="checkedB"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                </NestedNestedContainer>
            </div>

            <div style={{ width: "100%", borderBottom: "double" }}></div>

            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", flexDirection: "row", alignItems: "space-between", width: "100%" }}>

                <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", width: "5rem" }}>
                    <b style={{ paddingRight: "0.3rem", fontSize: "1.4rem" }}>STR:</b>
                    {selectedCharacter.character.stats.strength}
                    ({getAbilityModifier(selectedCharacter.character.stats.strength)}),
                    <div style={{ paddingLeft: "0.2rem", paddingRight: "0.2rem" }}>Saving:
                    {addPlusMinusPrefix(selectedCharacter.character.stats.savingThrows.strength.value)}
                    </div>
                </div>
                <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", width: "5rem" }}>
                    <b style={{ paddingRight: "0.3rem", fontSize: "1.4rem" }}>DEX:</b>
                    {selectedCharacter.character.stats.dexterity}
                    ({getAbilityModifier(selectedCharacter.character.stats.dexterity)}),
                    <div style={{ paddingLeft: "0.2rem", paddingRight: "0.2rem" }}>Saving:
                    {addPlusMinusPrefix(selectedCharacter.character.stats.savingThrows.dexterity.value)}
                    </div>
                </div>
                <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", width: "5rem" }}>
                    <b style={{ paddingRight: "0.3rem", fontSize: "1.4rem" }}>CON:</b>
                    {selectedCharacter.character.stats.strength}
                    ({getAbilityModifier(selectedCharacter.character.stats.constitution)}),
                    <div style={{ paddingLeft: "0.2rem", paddingRight: "0.2rem" }}>Saving:
                    {addPlusMinusPrefix(selectedCharacter.character.stats.savingThrows.constitution.value)}
                    </div>
                </div>

                <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", width: "5rem" }}>
                    <b style={{ paddingRight: "0.3rem", fontSize: "1.4rem" }}>INT:</b>
                    {selectedCharacter.character.stats.strength}
                    ({getAbilityModifier(selectedCharacter.character.stats.intelligence)}),
                    <div style={{ paddingLeft: "0.2rem", paddingRight: "0.2rem" }}>Saving:
                    {addPlusMinusPrefix(selectedCharacter.character.stats.savingThrows.intelligence.value)}
                    </div>
                </div>
                <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", width: "5rem" }}>
                    <b style={{ paddingRight: "0.3rem", fontSize: "1.4rem" }}>WIS:</b>
                    {selectedCharacter.character.stats.strength}
                    ({getAbilityModifier(selectedCharacter.character.stats.wisdom)}),
                    <div style={{ paddingLeft: "0.2rem", paddingRight: "0.2rem" }}>Saving:
                    {addPlusMinusPrefix(selectedCharacter.character.stats.savingThrows.wisdom.value)}
                    </div>
                </div>
                <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", width: "5rem" }}>
                    <b style={{ paddingRight: "0.3rem", fontSize: "1.4rem" }}>CHA:</b>
                    {selectedCharacter.character.stats.strength}
                    ({getAbilityModifier(selectedCharacter.character.stats.charisma)}),
                    <div style={{ paddingLeft: "0.2rem", paddingRight: "0.2rem" }}>Saving:
                    {addPlusMinusPrefix(selectedCharacter.character.stats.savingThrows.charisma.value)}
                    </div>
                </div>

                <div style={{ display: "flex", width: "100%", justifyContent: "space-around", flexDirection: "row", flexWrap: "wrap" }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <Table >
                            <tr>
                                <TableHeader >Proficient</TableHeader>
                                <TableHeader >Modifier</TableHeader>
                                <TableHeader >Skill</TableHeader>
                            </tr>
                            <tr>
                                <TableElement >{parseStringBooleanToCheckmark(selectedCharacter.character.stats.skills.acrobatics.proficient, false)}</TableElement>
                                <TableElement>{selectedCharacter.character.stats.skills.acrobatics.value}</TableElement>
                                <TableElement >Acrobatics (Dex)</TableElement>
                            </tr>
                            <tr>
                                <TableElement >{parseStringBooleanToCheckmark(selectedCharacter.character.stats.skills.animalHandling.proficient, false)}</TableElement>
                                <TableElement >{selectedCharacter.character.stats.skills.animalHandling.value}</TableElement>
                                <TableElement >Animal Handling (Dex)</TableElement>
                            </tr>
                            <tr>
                                <TableElement >{parseStringBooleanToCheckmark(selectedCharacter.character.stats.skills.arcana.proficient, false)}</TableElement>
                                <TableElement>{selectedCharacter.character.stats.skills.arcana.value}</TableElement>
                                <TableElement>Arcana (Int)</TableElement>
                            </tr>
                            <tr>
                                <TableElement >{parseStringBooleanToCheckmark(selectedCharacter.character.stats.skills.athletics.proficient, false)}</TableElement>
                                <TableElement>{selectedCharacter.character.stats.skills.athletics.value}</TableElement>
                                <TableElement>Athletics (Str)</TableElement>
                            </tr>
                            <tr>
                                <TableElement >{parseStringBooleanToCheckmark(selectedCharacter.character.stats.skills.deception.proficient, false)}</TableElement>
                                <TableElement>{selectedCharacter.character.stats.skills.deception.value}</TableElement>
                                <TableElement>Deception (Cha)</TableElement>
                            </tr>
                            <tr>
                                <TableElement >{parseStringBooleanToCheckmark(selectedCharacter.character.stats.skills.history.proficient, false)}</TableElement>
                                <TableElement>{selectedCharacter.character.stats.skills.history.value}</TableElement>
                                <TableElement>History (Int)</TableElement>
                            </tr>
                        </Table>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <Table >
                            <tr>
                                <TableHeader >Proficient</TableHeader>
                                <TableHeader >Modifier</TableHeader>
                                <TableHeader >Skill</TableHeader>
                            </tr>
                            <tr>
                                <TableElement >{parseStringBooleanToCheckmark(selectedCharacter.character.stats.skills.insight.proficient, false)}</TableElement>
                                <TableElement>{selectedCharacter.character.stats.skills.insight.value}</TableElement>
                                <TableElement >Insight (Wis)</TableElement>
                            </tr>
                            <tr>
                                <TableElement >{parseStringBooleanToCheckmark(selectedCharacter.character.stats.skills.intimidation.proficient, false)}</TableElement>
                                <TableElement>{selectedCharacter.character.stats.skills.intimidation.value}</TableElement>
                                <TableElement>Intimidation (Cha)</TableElement>
                            </tr>
                            <tr>
                                <TableElement >{parseStringBooleanToCheckmark(selectedCharacter.character.stats.skills.investigation.proficient, false)}</TableElement>
                                <TableElement>{selectedCharacter.character.stats.skills.investigation.value}</TableElement>
                                <TableElement>Investigation (Int)</TableElement>
                            </tr>
                            <tr>
                                <TableElement >{parseStringBooleanToCheckmark(selectedCharacter.character.stats.skills.medicine.proficient, false)}</TableElement>
                                <TableElement>{selectedCharacter.character.stats.skills.medicine.value}</TableElement>
                                <TableElement>Medicine (Nature)</TableElement>
                            </tr>
                            <tr>
                                <TableElement >{parseStringBooleanToCheckmark(selectedCharacter.character.stats.skills.nature.proficient, false)}</TableElement>
                                <TableElement>{selectedCharacter.character.stats.skills.nature.value}</TableElement>
                                <TableElement>Nature (Int)</TableElement>
                            </tr>
                            <tr>
                                <TableElement >{parseStringBooleanToCheckmark(selectedCharacter.character.stats.skills.perception.proficient, false)}</TableElement>
                                <TableElement>{selectedCharacter.character.stats.skills.perception.value}</TableElement>
                                <TableElement>Perception (Wis)</TableElement>
                            </tr>
                        </Table>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <Table >
                            <tr>
                                <TableHeader >Proficient</TableHeader>
                                <TableHeader >Modifier</TableHeader>
                                <TableHeader >Skill</TableHeader>
                            </tr>
                            <tr>
                                <TableElement >{parseStringBooleanToCheckmark(selectedCharacter.character.stats.skills.performance.proficient, false)}</TableElement>
                                <TableElement>{selectedCharacter.character.stats.skills.performance.value}</TableElement>
                                <TableElement >Performance (Cha)</TableElement>
                            </tr>
                            <tr>
                                <TableElement >{parseStringBooleanToCheckmark(selectedCharacter.character.stats.skills.persuasion.proficient, false)}</TableElement>
                                <TableElement>{selectedCharacter.character.stats.skills.persuasion.value}</TableElement>
                                <TableElement>Persuasion (Cha)</TableElement>
                            </tr>
                            <tr>
                                <TableElement >{parseStringBooleanToCheckmark(selectedCharacter.character.stats.skills.religion.proficient, false)}</TableElement>
                                <TableElement>{selectedCharacter.character.stats.skills.religion.value}</TableElement>
                                <TableElement>Religion (Int)</TableElement>
                            </tr>
                            <tr>
                                <TableElement >{parseStringBooleanToCheckmark(selectedCharacter.character.stats.skills.sleightOfHand.proficient, false)}</TableElement>
                                <TableElement>{selectedCharacter.character.stats.skills.sleightOfHand.value}</TableElement>
                                <TableElement>Sleight of Hand (Dex)</TableElement>
                            </tr>
                            <tr>
                                <TableElement >{parseStringBooleanToCheckmark(selectedCharacter.character.stats.skills.stealth.proficient, false)}</TableElement>
                                <TableElement>{selectedCharacter.character.stats.skills.stealth.value}</TableElement>
                                <TableElement>Stealth (Dex)</TableElement>
                            </tr>
                            <tr>
                                <TableElement >{parseStringBooleanToCheckmark(selectedCharacter.character.stats.skills.survival.proficient, false)}</TableElement>
                                <TableElement>{selectedCharacter.character.stats.skills.survival.value}</TableElement>
                                <TableElement>Survival (Wis)</TableElement>
                            </tr>
                        </Table>
                    </div>
                </div>
                {selectedCharacter.character.actions ?
                    <NestedContainer style={{ gridColumn: 1 / 3 }} >
                        <h3>
                            Actions and Specials:
                    </h3>
                        {selectedCharacter.character.actions.map((action: ICharacterAction) => <div><b >{action.name}</b> {action.tags ? `(${renderArrayOfString(action.tags)}):` : ":"} {action.description}</div>)}
                        <div style={{ width: "100%", borderBottom: "double" }}></div>
                    </NestedContainer>

                    : null}
                <NestedContainer style={{ gridColumn: "1/3" }} >
                </NestedContainer>
                <NestedContainer style={{ gridColumn: "1/3" }} >
                    <h3>Description and history: </h3>
                    <div>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</div>
                </NestedContainer>

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
grid-template-rows: 1fr ;
justify-self: start;
min-width:15rem;
`

const NestedNestedContainer = styled.div`
display:flex;
margin:0.2rem;
font-size:1.2rem;
`
const Table = styled.table`
margin:0.3rem;
border-radius:0.2rem;
border: double;
width:20rem;
padding:0.2rem;
`

const TableHeader = styled.th`
text-align: center
`

const TableElement = styled.td`
text-align: center
`
export default CampaignCharacterEdit;
