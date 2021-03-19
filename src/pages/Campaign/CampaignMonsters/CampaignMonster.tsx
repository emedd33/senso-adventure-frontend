import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import {
    getSelectedMonster,
    getSelectedMonsterStoragePath,
    isDungeonMasterSelector,
} from "../../../store/selected/selectedSelectors";
import styled from "styled-components";
import { OLD_WHITE, OLD_WHITE_DARK } from "../../../assets/constants/Constants";
import IsLoading from "../../../components/IsLoading/IsLoading";
import getAbilityModifier from "../../../utils/getAbilityModifier";

import { Button, Divider } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import renderArrayOfString from "../../../utils/renderArrayToString";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { parseActionUsage, parseSuccessType } from "../../../utils/Api/parseAction";
import DraftJSEditor from "../../../components/DraftJSEditor/DraftJSEditor";
type CampaignProps = {};
const CampaignMonster: FunctionComponent<CampaignProps> = () => {
    const history = useHistory();
    const selectedMonster = useSelector(getSelectedMonster);
    const isDungeonMaster = useSelector(isDungeonMasterSelector);
    const monsterPath = useSelector(getSelectedMonsterStoragePath);

    if (selectedMonster === undefined) {
        return (
            <Container>
                <IsLoading />
            </Container>
        );
    }
    return (
        <Container>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", margin: "1rem" }}>
                <div>

                    <h1 style={{ marginBottom: 0 }}>{`${selectedMonster.monster.name} ${selectedMonster.monster.isPublished === "FALSE" ? "(Unpublished)" : null}`}</h1>
                    {selectedMonster.monster.nickNames ? <h2>Also known as {selectedMonster.monster.nickNames.map((name: string) => name)}</h2> : null}
                    <P>
                        {selectedMonster.monster.size ? `${selectedMonster.monster.size} ` : null}
                        {selectedMonster.monster.type ? `${selectedMonster.monster.type}, ` : null}
                        {selectedMonster.monster.alignment}
                    </P>
                </div>
                <Button
                    onClick={() =>
                        history.push(`${selectedMonster.monster.slug}/edit`)
                    }
                    variant="contained"
                    color="primary"
                    style={{ maxHeight: "2rem", maxWidth: "3rem" }}
                >
                    Edit
            </Button>
            </div>
            <DividerBlock />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(10rem,20rem)" }}>
                <div>

                    <P><b>Armor Class: </b>{selectedMonster.monster.stats.armorClass}</P>
                    <P><b>Hitpoints: </b>{selectedMonster.monster.stats.hitPoints} {selectedMonster.monster.stats.hitDice ? `(${selectedMonster.monster.stats.hitDice})` : null}</P>
                    <P><b>Speed: </b> {selectedMonster.monster.stats.speed ?
                        <ul style={{ marginTop: 0 }}>
                            {selectedMonster.monster.stats.speed.walk ? <li><b>Walk: </b> {selectedMonster.monster.stats.speed.walk} </li> : null}
                            {selectedMonster.monster.stats.speed.swim ? <li><b>Swim: </b> {selectedMonster.monster.stats.speed.swim} </li> : null}
                            {selectedMonster.monster.stats.speed.climb ? <li><b>Climb: </b> {selectedMonster.monster.stats.speed.climb} </li> : null}
                            {selectedMonster.monster.stats.speed.fly ? <li><b>Fly: </b> {selectedMonster.monster.stats.speed.fly} </li> : null}

                        </ul>
                        : null}</P>
                </div>
                <div>
                    <P><b>Challenge rating: </b>{selectedMonster.monster.challengeRating ? selectedMonster.monster.challengeRating : null}</P>
                    <P><b>Languages: </b>{selectedMonster.monster.languages ? renderArrayOfString(selectedMonster.monster.languages) : null}</P>
                    <P><b>Senses: </b> {selectedMonster.monster.senses ?
                        <ul style={{ marginTop: 0 }}>
                            {selectedMonster.monster.senses?.passive_perception ? <li><b>Passive perception: </b> {selectedMonster.monster.senses?.passive_perception} </li> : null}
                            {selectedMonster.monster.senses?.blindsight ? <li><b>Blindsight: </b> {selectedMonster.monster.senses?.blindsight} </li> : null}
                            {selectedMonster.monster.senses?.darkvision ? <li><b>Darkvision: </b> {selectedMonster.monster.senses?.darkvision} </li> : null}
                            {selectedMonster.monster.senses?.truesight ? <li><b>Truesight: </b> {selectedMonster.monster.senses?.truesight} </li> : null}

                        </ul>
                        : null}</P>
                </div>
            </div>
            <DividerBlock />
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", flexDirection: "row", justifyContent: "space-between", gap: "0.5rem", padding: "1rem", }}>
                {/* STRENGTH */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1 fr" }}>
                    <h2 style={{ gridColumn: "1/3", margin: 0 }}>STR</h2>
                    <p style={{ margin: 0, fontSize: "1.2rem" }}>{selectedMonster.monster.stats.strength}</p>
                    <p style={{ margin: 0, fontSize: "1.2rem" }}>{`(${getAbilityModifier(selectedMonster.monster.stats.strength)})`}</p>
                </div>
                {/* DEXTERITY */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1 fr" }}>
                    <h2 style={{ gridColumn: "1/3", margin: 0 }}>DEX</h2>
                    <p style={{ margin: 0, fontSize: "1.2rem" }}>{selectedMonster.monster.stats.dexterity}</p>
                    <p style={{ margin: 0, fontSize: "1.2rem" }}>{`(${getAbilityModifier(selectedMonster.monster.stats.dexterity)})`}</p>
                </div>
                {/* CONSTITUTION */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1 fr" }}>
                    <h2 style={{ gridColumn: "1/3", margin: 0 }}>CON</h2>
                    <p style={{ margin: 0, fontSize: "1.2rem" }}>{selectedMonster.monster.stats.constitution}</p>
                    <p style={{ margin: 0, fontSize: "1.2rem" }}>{`(${getAbilityModifier(selectedMonster.monster.stats.constitution)})`}</p>
                </div>
                {/* INTELLIGENCE */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1 fr" }}>
                    <h2 style={{ gridColumn: "1/3", margin: 0 }}>INT</h2>
                    <p style={{ margin: 0, fontSize: "1.2rem" }}>{selectedMonster.monster.stats.intelligence}</p>
                    <p style={{ margin: 0, fontSize: "1.2rem" }}>{`(${getAbilityModifier(selectedMonster.monster.stats.intelligence)})`}</p>
                </div>
                {/* WISDOM */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1 fr" }}>
                    <h2 style={{ gridColumn: "1/3", margin: 0 }}>WIS</h2>
                    <p style={{ margin: 0, fontSize: "1.2rem" }}>{selectedMonster.monster.stats.wisdom}</p>
                    <p style={{ margin: 0, fontSize: "1.2rem" }}>{`(${getAbilityModifier(selectedMonster.monster.stats.wisdom)})`}</p>
                </div>
                {/* CHARISMA */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1 fr" }}>
                    <h2 style={{ gridColumn: "1/3", margin: 0 }}>CHA</h2>
                    <p style={{ margin: 0, fontSize: "1.2rem" }}>{selectedMonster.monster.stats.charisma}</p>
                    <p style={{ margin: 0, fontSize: "1.2rem" }}>{`(${getAbilityModifier(selectedMonster.monster.stats.charisma)})`}</p>
                </div>


            </div>
            <DividerBlock />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(10rem,20rem)" }}>
                <div>

                    {selectedMonster.monster.stats.proficiencies ? <P><b>Proficiencies: </b>
                        <ul style={{ marginTop: 0 }}>
                            {selectedMonster.monster.stats.proficiencies.map((prof: IMonsterProficiency) => <li><b>{prof.proficiency.name}: </b> {prof.value} </li>)}
                        </ul>
                    </P>
                        : null}

                </div>
                <div>

                    {selectedMonster.monster.conditionImmunities ? <P><b>Condition immunities: </b>{renderArrayOfString(selectedMonster.monster.conditionImmunities)}
                    </P> : null}
                    {selectedMonster.monster.damageImmunities ? <P><b>Damage immunities: </b>{renderArrayOfString(selectedMonster.monster.damageImmunities)}
                    </P> : null}
                    {selectedMonster.monster.damageResistances ? <P><b>Damage resistances: </b>{renderArrayOfString(selectedMonster.monster.damageResistances)}
                    </P> : null}
                    {selectedMonster.monster.damageVulnerabilities ? <><DividerBlock /> <P><b>Damage vulnerabilities: </b>{renderArrayOfString(selectedMonster.monster.damageVulnerabilities)}
                    </P> </> : null}
                </div>
            </div>
            {selectedMonster.monster.specialAbilities ? <>
                <h2 style={{ marginBottom: 0 }}>Special Abilities</h2>
                <Divider />
                {
                    selectedMonster.monster.specialAbilities.map((ability: IMonsterAction) => {
                        return <div style={{ marginTop: "1rem" }}>
                            <p><b>{ability.name}: </b>{ability.desc}</p>
                            <ul style={{ margin: 0 }}>
                                {ability.damage ? <li><b>Damage: </b>{`${ability.damage.map(dmg => `${dmg.damage_dice} (${dmg.damage_type.name}) `)}`} </li> : null}
                                {ability.attack_bonus ? <li><b>Attack Bonus: </b>{ability.attack_bonus} </li> : null}
                                {ability.dc ?
                                    <ul style={{ margin: 0 }}>
                                        <li><b>Saving throw: </b>{ability.dc.dc_type.name} </li>
                                        <li><b>Dc value: </b>{ability.dc.dc_value} </li>
                                        <li><b>Success: </b>{parseSuccessType(ability.dc.success_type)} </li>
                                    </ul>
                                    : null}

                                {ability.usage ? <li><b>Usage: </b>{parseActionUsage(ability.usage)} </li> : null}
                            </ul>
                        </div>
                    })
                }
            </>
                : null}
            {selectedMonster.monster.actions ? <>
                <h2>Actions</h2>
                {
                    selectedMonster.monster.actions.map((action: IMonsterAction) => {
                        return <div >
                            <Accordion style={{ backgroundColor: OLD_WHITE, marginTop: "0.2rem" }}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography >{action.name}</Typography>
                                </AccordionSummary>
                                <AccordionDetails style={{ backgroundColor: OLD_WHITE_DARK, display: "grid", gridTemplateColumns: "auto", gap: "1rem" }}>
                                    <div>
                                        {action.desc}
                                    </div>
                                    <div>
                                        {action.damage ? <li><b>Damage: </b>{`${action.damage.map(dmg => `${dmg.damage_dice} (${dmg.damage_type.name}) `)}`} </li> : null}
                                        {action.attack_bonus ? <li><b>Attack Bonus: </b>{action.attack_bonus} </li> : null}
                                        {action.dc ?
                                            <ul style={{ margin: 0 }}>
                                                <li><b>Saving throw: </b>{action.dc.dc_type.name} </li>
                                                <li><b>Dc value: </b>{action.dc.dc_value} </li>
                                                <li><b>Success: </b>{parseSuccessType(action.dc.success_type)} </li>

                                            </ul>
                                            : null}

                                        {action.usage ? <li><b>Usage: </b>{parseActionUsage(action.usage)} </li> : null}
                                    </div>
                                </AccordionDetails>
                            </Accordion>

                        </div>
                    })
                }
            </>
                : null}
            {selectedMonster.monster.legendaryActions ? <>
                <h2>Legendary Actions</h2>
                {
                    selectedMonster.monster.legendaryActions.map((action: IMonsterAction) => {
                        return <Accordion style={{ backgroundColor: OLD_WHITE, marginTop: "0.2rem" }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography >{action.name}</Typography>
                            </AccordionSummary>
                            <AccordionDetails style={{ backgroundColor: OLD_WHITE_DARK, display: "grid", gridTemplateColumns: "auto", gap: "1rem" }}>
                                <div>
                                    {action.desc}
                                </div>
                                <div>
                                    {action.damage ? <li><b>Damage: </b>{`${action.damage.map(dmg => `${dmg.damage_dice} (${dmg.damage_type.name}) `)}`} </li> : null}
                                    {action.attack_bonus ? <li><b>Attack Bonus: </b>{action.attack_bonus} </li> : null}
                                    {action.dc ?
                                        <ul style={{ margin: 0 }}>
                                            <li><b>Saving throw: </b>{action.dc.dc_type.name} </li>
                                            <li><b>Dc value: </b>{action.dc.dc_value} </li>
                                            <li><b>Success: </b>{parseSuccessType(action.dc.success_type)} </li>

                                        </ul>
                                        : null}

                                    {action.usage ? <li><b>Usage: </b>{parseActionUsage(action.usage)} </li> : null}
                                </div>
                            </AccordionDetails>
                        </Accordion>

                    })
                }
                <h2>Description and history</h2>
                <DraftJSEditor readOnly={true} storagePath={`${monsterPath}/monsterDescription.json`} isDungeonMaster={isDungeonMaster} />
            </>
                : null}




        </Container >
    )

};
const P = styled.div`
margin:0;
`
const Container = styled.div`
  width: 70%;
  padding: 1rem;
  -webkit-box-shadow: 5px 5px 15px 5px #000000;
  box-shadow: 5px 0px 15px 2px #000000;
  background-color: ${OLD_WHITE};
  min-height: 20rem;
`;
const DividerBlock = styled(Divider)`
margin-top:1rem
`
export default CampaignMonster;

