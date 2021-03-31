import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import {
    getSelectedMonster,
    getSelectedMonsterStoragePath,
    isDungeonMasterSelector,
} from "../../../../store/selected/selectedSelectors";
import styled from "styled-components";
import {
    OLD_WHITE,
    OLD_WHITE_DARK,
} from "../../../../assets/constants/Constants";
import IsLoading from "../../../../components/IsLoading/IsLoading";
import getAbilityModifier from "../../../../utils/getAbilityModifier";

import { Button, Divider, Tooltip } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import renderArrayOfString from "../../../../utils/StringProcessing/renderArrayOfString";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import secretIcon from "../../../../assets/icons/hush_icon.png";
import { SensoDescription } from "../../../../components/SensoContainers";
import SensoDraftJS from "../../../../components/SensoDraftJS/SensoDraftJS";
import { useTranslation } from "react-i18next";

type MonsterProps = {};
const Monster: FunctionComponent<MonsterProps> = () => {
    const history = useHistory();
    const translate = useTranslation();
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
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    margin: "1rem",
                    marginLeft: 0,
                }}
            >
                <div>
                    <h1 style={{ marginBottom: 0 }}>{`${selectedMonster.monster.name} ${selectedMonster.monster.isPublished === "FALSE"
                        ? `(${translate.t(`Not published`)})`
                        : ""
                        }`}</h1>
                    {selectedMonster.monster.nickNames ? (
                        <h3 style={{ opacity: 0.7 }}>
                            {translate.t(`Also known as`)}:{" "}
                            {renderArrayOfString(", ", selectedMonster.monster.nickNames)}
                        </h3>
                    ) : null}
                    <P>
                        {selectedMonster.monster.size
                            ? `${selectedMonster.monster.size} `
                            : null}
                        {selectedMonster.monster.type
                            ? `${selectedMonster.monster.type}, `
                            : null}
                        {selectedMonster.monster.alignment}
                    </P>
                </div>
                {isDungeonMaster ? (
                    <Button
                        onClick={() => history.push(`${selectedMonster.monster.slug}/edit`)}
                        variant="contained"
                        color="primary"
                        style={{ maxHeight: "2rem", maxWidth: "3rem" }}
                    >
                        {translate.t(`Edit`)}
                    </Button>
                ) : (
                    <></>
                )}
            </div>
            <DividerBlock />

            <SensoDescription content={selectedMonster.monster.description} />
            {isDungeonMaster ? (
                <>
                    <div
                        style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            marginBottom: "1rem",
                        }}
                    >
                        <Tooltip
                            title={`${translate.t(
                                `Everything below is hidden from players`
                            )}`}
                        >
                            <img src={secretIcon} style={{ width: "3rem" }} alt="Secret" />
                        </Tooltip>
                    </div>
                    <DividerBlock />

                    <div>
                        <p>
                            <b>{translate.t(`Roleplaying`)}: </b>
                            {selectedMonster.monster.rolePlaying}
                        </p>
                    </div>
                    <DividerBlock />

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(10rem,20rem)",
                        }}
                    >
                        <div>
                            <P>
                                <b>{translate.t(`Armor class`)}: </b>
                                {selectedMonster.monster.stats.armorClass}
                            </P>
                            <P>
                                <b>hp: </b>
                                {selectedMonster.monster.stats.hitPoints}{" "}
                                {selectedMonster.monster.stats.hitDice
                                    ? `(${selectedMonster.monster.stats.hitDice})`
                                    : null}
                            </P>
                            <P>
                                <b>{translate.t(`Speed`)}: </b>{" "}
                                {selectedMonster.monster.stats.speed ? (
                                    <ul style={{ marginTop: 0 }}>
                                        {selectedMonster.monster.stats.speed.walk ? (
                                            <li>
                                                <b>Walk: </b> {selectedMonster.monster.stats.speed.walk}{" "}
                                            </li>
                                        ) : null}
                                        {selectedMonster.monster.stats.speed.swim ? (
                                            <li>
                                                <b>Swim: </b> {selectedMonster.monster.stats.speed.swim}{" "}
                                            </li>
                                        ) : null}
                                        {selectedMonster.monster.stats.speed.climb ? (
                                            <li>
                                                <b>Climb: </b>{" "}
                                                {selectedMonster.monster.stats.speed.climb}{" "}
                                            </li>
                                        ) : null}
                                        {selectedMonster.monster.stats.speed.fly ? (
                                            <li>
                                                <b>Fly: </b> {selectedMonster.monster.stats.speed.fly}{" "}
                                            </li>
                                        ) : null}
                                    </ul>
                                ) : null}
                            </P>
                        </div>
                        <div>
                            <P>
                                <b>{translate.t(`Challenge rating`)}: </b>
                                {selectedMonster.monster.challengeRating
                                    ? selectedMonster.monster.challengeRating
                                    : null}
                            </P>
                            <P>
                                <b>{translate.t(`Languages`)}: </b>
                                {selectedMonster.monster.languages
                                    ? renderArrayOfString(", ", selectedMonster.monster.languages)
                                    : null}
                            </P>
                            <P>
                                <b>{translate.t(`Senses`)}: </b>{" "}
                                {selectedMonster.monster.senses ? (
                                    <ul style={{ marginTop: 0 }}>
                                        {selectedMonster.monster.senses?.passive_perception ? (
                                            <li>
                                                <b>{translate.t(`Passive perception`)}: </b>{" "}
                                                {selectedMonster.monster.senses?.passive_perception}{" "}
                                            </li>
                                        ) : null}
                                        {selectedMonster.monster.senses?.blindsight ? (
                                            <li>
                                                <b>{translate.t(`Blindsight`)}: </b>{" "}
                                                {selectedMonster.monster.senses?.blindsight}{" "}
                                            </li>
                                        ) : null}
                                        {selectedMonster.monster.senses?.darkvision ? (
                                            <li>
                                                <b>{translate.t(`Darkvision`)}: </b>{" "}
                                                {selectedMonster.monster.senses?.darkvision}{" "}
                                            </li>
                                        ) : null}
                                        {selectedMonster.monster.senses?.truesight ? (
                                            <li>
                                                <b>{translate.t(`Truesight`)}: </b>{" "}
                                                {selectedMonster.monster.senses?.truesight}{" "}
                                            </li>
                                        ) : null}
                                    </ul>
                                ) : null}
                            </P>
                        </div>
                    </div>

                    <DividerBlock />
                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            alignItems: "center",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            gap: "0.5rem",
                            padding: "1rem",
                        }}
                    >
                        {/* STRENGTH */}
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1 fr" }}>
                            <h2 style={{ gridColumn: "1/3", margin: 0 }}>
                                {translate.t(`Str`)}
                            </h2>
                            <p style={{ margin: 0, fontSize: "1.2rem" }}>
                                {selectedMonster.monster.stats.strength}
                            </p>
                            <p
                                style={{ margin: 0, fontSize: "1.2rem" }}
                            >{`(${getAbilityModifier(
                                selectedMonster.monster.stats.strength
                            )})`}</p>
                        </div>
                        {/* DEXTERITY */}
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1 fr" }}>
                            <h2 style={{ gridColumn: "1/3", margin: 0 }}>
                                {translate.t(`Dex`)}
                            </h2>
                            <p style={{ margin: 0, fontSize: "1.2rem" }}>
                                {selectedMonster.monster.stats.dexterity}
                            </p>
                            <p
                                style={{ margin: 0, fontSize: "1.2rem" }}
                            >{`(${getAbilityModifier(
                                selectedMonster.monster.stats.dexterity
                            )})`}</p>
                        </div>
                        {/* CONSTITUTION */}
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1 fr" }}>
                            <h2 style={{ gridColumn: "1/3", margin: 0 }}>
                                {translate.t(`Con`)}
                            </h2>
                            <p style={{ margin: 0, fontSize: "1.2rem" }}>
                                {selectedMonster.monster.stats.constitution}
                            </p>
                            <p
                                style={{ margin: 0, fontSize: "1.2rem" }}
                            >{`(${getAbilityModifier(
                                selectedMonster.monster.stats.constitution
                            )})`}</p>
                        </div>
                        {/* INTELLIGENCE */}
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1 fr" }}>
                            <h2 style={{ gridColumn: "1/3", margin: 0 }}>
                                {translate.t(`Int`)}
                            </h2>
                            <p style={{ margin: 0, fontSize: "1.2rem" }}>
                                {selectedMonster.monster.stats.intelligence}
                            </p>
                            <p
                                style={{ margin: 0, fontSize: "1.2rem" }}
                            >{`(${getAbilityModifier(
                                selectedMonster.monster.stats.intelligence
                            )})`}</p>
                        </div>
                        {/* WISDOM */}
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1 fr" }}>
                            <h2 style={{ gridColumn: "1/3", margin: 0 }}>
                                {translate.t(`Wis`)}
                            </h2>
                            <p style={{ margin: 0, fontSize: "1.2rem" }}>
                                {selectedMonster.monster.stats.wisdom}
                            </p>
                            <p
                                style={{ margin: 0, fontSize: "1.2rem" }}
                            >{`(${getAbilityModifier(
                                selectedMonster.monster.stats.wisdom
                            )})`}</p>
                        </div>
                        {/* CHARISMA */}
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1 fr" }}>
                            <h2 style={{ gridColumn: "1/3", margin: 0 }}>
                                {translate.t(`Cha`)}
                            </h2>
                            <p style={{ margin: 0, fontSize: "1.2rem" }}>
                                {selectedMonster.monster.stats.charisma}
                            </p>
                            <p
                                style={{ margin: 0, fontSize: "1.2rem" }}
                            >{`(${getAbilityModifier(
                                selectedMonster.monster.stats.charisma
                            )})`}</p>
                        </div>
                    </div>
                    <DividerBlock />
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(10rem,20rem)",
                        }}
                    >
                        <div>
                            {selectedMonster.monster.stats.proficiencies ? (
                                <P>
                                    <b>{translate.t(`Proficiencies`)}: </b>
                                    <ul style={{ marginTop: 0 }}>
                                        {selectedMonster.monster.stats.proficiencies.map(
                                            (prof: IMonsterProficiency) => (
                                                <li>
                                                    <b>{prof.proficiency.name}: </b> {prof.value}{" "}
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </P>
                            ) : null}
                        </div>
                        <div>
                            {selectedMonster.monster.conditionImmunities ? (
                                <P>
                                    <b>{translate.t(`Condition immunities`)}: </b>
                                    {renderArrayOfString(", ",
                                        selectedMonster.monster.conditionImmunities
                                    )}
                                </P>
                            ) : null}
                            {selectedMonster.monster.damageImmunities ? (
                                <P>
                                    <b>{translate.t(`Damage immunities`)}: </b>
                                    {renderArrayOfString(", ",
                                        selectedMonster.monster.damageImmunities
                                    )}
                                </P>
                            ) : null}
                            {selectedMonster.monster.damageResistances ? (
                                <P>
                                    <b>{translate.t(`Damage resistances`)}: </b>
                                    {renderArrayOfString(", ",
                                        selectedMonster.monster.damageResistances
                                    )}
                                </P>
                            ) : null}
                            {selectedMonster.monster.damageVulnerabilities ? (
                                <>
                                    <DividerBlock />{" "}
                                    <P>
                                        <b>{translate.t(`Damage vulnerabilities`)}: </b>
                                        {renderArrayOfString(", ",
                                            selectedMonster.monster.damageVulnerabilities
                                        )}
                                    </P>{" "}
                                </>
                            ) : null}
                        </div>
                    </div>
                    {selectedMonster.monster.specialAbilities ? (
                        <>
                            <h2>{translate.t(`Special abilities`)}</h2>
                            {selectedMonster.monster.specialAbilities.map(
                                (ability: IMonsterAction) => {
                                    return (
                                        <div>
                                            <Accordion
                                                style={{
                                                    backgroundColor: OLD_WHITE,
                                                    marginTop: "0.2rem",
                                                }}
                                            >
                                                <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon />}
                                                    aria-controls="panel1a-content"
                                                    id="panel1a-header"
                                                >
                                                    <Typography>{ability.name}</Typography>
                                                </AccordionSummary>
                                                <AccordionDetails
                                                    style={{
                                                        backgroundColor: OLD_WHITE_DARK,
                                                        display: "grid",
                                                        gridTemplateColumns: "auto",
                                                        gap: "1rem",
                                                    }}
                                                >
                                                    {ability.desc}
                                                </AccordionDetails>
                                            </Accordion>
                                        </div>
                                    );
                                }
                            )}
                        </>
                    ) : null}
                    {selectedMonster.monster.actions ? (
                        <>
                            <h2>{translate.t(`Actions`)}</h2>
                            {selectedMonster.monster.actions.map((action: IMonsterAction) => {
                                return (
                                    <div>
                                        <Accordion
                                            style={{
                                                backgroundColor: OLD_WHITE,
                                                marginTop: "0.2rem",
                                            }}
                                        >
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                            >
                                                <Typography>{action.name}</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails
                                                style={{
                                                    backgroundColor: OLD_WHITE_DARK,
                                                    display: "grid",
                                                    gridTemplateColumns: "auto",
                                                    gap: "1rem",
                                                }}
                                            >
                                                {action.desc}
                                            </AccordionDetails>
                                        </Accordion>
                                    </div>
                                );
                            })}
                        </>
                    ) : null}
                    {selectedMonster.monster.legendaryActions ? (
                        <>
                            <h2>{translate.t(`Legendary actions`)}</h2>
                            {selectedMonster.monster.legendaryActions.map(
                                (action: IMonsterAction) => {
                                    return (
                                        <Accordion
                                            style={{
                                                backgroundColor: OLD_WHITE,
                                                marginTop: "0.2rem",
                                            }}
                                        >
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                            >
                                                <Typography>{action.name}</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails
                                                style={{
                                                    backgroundColor: OLD_WHITE_DARK,
                                                    display: "grid",
                                                    gridTemplateColumns: "auto",
                                                    gap: "1rem",
                                                }}
                                            >
                                                {action.desc}
                                            </AccordionDetails>
                                        </Accordion>
                                    );
                                }
                            )}
                            <h2>{translate.t(`Lore`)}</h2>
                        </>
                    ) : null}
                    <h3>{translate.t(`Lore`)}:</h3>

                    <SensoDraftJS
                        readOnly={true}
                        storagePath={`${monsterPath}`}
                        isDungeonMaster={isDungeonMaster}
                    />
                </>
            ) : null}
        </Container>
    );
};
const P = styled.div`
  margin: 0;
`;
const Container = styled.div`
  width: 70%;
  padding: 1rem;
  margin-bottom: 10rem;
  -webkit-box-shadow: 5px 5px 15px 5px #000000;
  box-shadow: 5px 0px 15px 2px #000000;
  background-color: ${OLD_WHITE};
  min-height: 20rem;
`;
const DividerBlock = styled(Divider)`
  margin-top: 1rem;
`;
export default Monster;
