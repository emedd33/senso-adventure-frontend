import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import {
    getSelectedMonster,
    isDungeonMasterSelector,
    getSelectedMonsterStoragePath,
} from "../../../store/selected/selectedSelectors";
import styled from "styled-components";
import { OLD_WHITE } from "../../../assets/constants/Constants";
import IsLoading from "../../../components/IsLoading/IsLoading";
import getAbilityModifier from "../../../utils/getAbilityModifier";
import parseValuesToString from "../../../utils/parseValuesToString";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import renderArrayOfString from "../../../utils/renderArrayToString";
import DraftJSEditor from "../../../components/DraftJSEditor/DraftJSEditor";

type CampaignProps = {};
const CampaignMonster: FunctionComponent<CampaignProps> = () => {
    const history = useHistory();
    const selectedMonster = useSelector(getSelectedMonster);
    const isDungeonMaster = useSelector(isDungeonMasterSelector);
    const monsterPath = useSelector(getSelectedMonsterStoragePath);
    const parseStringBooleanToCheckmark = (
        proficient: any,
        setCross: boolean
    ) => {
        if (proficient === "TRUE") {
            return <CheckIcon style={{ width: "0.8rem", color: "green" }} />;
        }
        if (setCross) {
            return <ClearIcon style={{ width: "0.8rem", color: "red" }} />;
        }
        return null;
    };

    if (selectedMonster === undefined) {
        return (
            <Container>
                <IsLoading />
            </Container>
        );
    }
    return (
        <Container>
            <div style={{ flex: 1 }}>
                <div
                    style={{
                        display: "grid",
                        width: "100%",
                        gridTemplateColumns: "1fr 1fr",
                    }}
                >
                    <div style={{ display: "flex", justifyContent: "flex-end", gridColumn: "1/3" }}>
                        {isDungeonMaster ? (
                            <>
                                <NestedContainer
                                    style={{
                                        flex: 1,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "flex-end",
                                    }}
                                >
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
                                </NestedContainer>
                            </>
                        ) : null}
                    </div>

                    <h1 style={{ marginBottom: "0", gridColumn: "1/3" }}>
                        {selectedMonster.monster.name}
                        {selectedMonster.monster.isPublished === "FALSE"
                            ? " (Unpublished)"
                            : null}
                    </h1>


                    <div style={{ gridColumn: "1/3" }}>
                        <b>Also known as: </b>{selectedMonster.monster.nickNames ? renderArrayOfString(selectedMonster.monster.nickNames) : null}
                    </div>
                    {isDungeonMaster ?
                        <div >
                            {` ${selectedMonster.monster.race}`}
                            {selectedMonster.monster.class ? `, ${selectedMonster.monster.class}` : null}
                            {`, ${selectedMonster.monster.alignment}`}
                        </div>
                        : null}
                    {isDungeonMaster ?
                        <div style={{ gridColumn: "1/3" }}>
                            {`Challenge Rating: ${parseValuesToString(selectedMonster.monster.challengeRating)}`}
                        </div>
                        : null}

                </div>
            </div>
            <div style={{ width: "100%" }}>
                <b>Summary: </b>
                <div style={{ width: "100%" }}></div>

                {selectedMonster.monster.summary}
                <div style={{ width: "100%", borderBottom: "double" }}></div>
            </div>
            {isDungeonMaster ? (
                <>
                    <NestedContainer>
                        <NestedNestedContainer>
                            <div>
                                <b>Armor class: </b>{" "}
                            </div>
                            <div style={{ paddingLeft: "0.3rem" }}>
                                {selectedMonster.monster.stats.armorClass}
                            </div>
                        </NestedNestedContainer>
                        <NestedNestedContainer>
                            <div>
                                <b>Proficiency: </b>
                            </div>
                            <div style={{ paddingLeft: "0.3rem" }}>
                                {selectedMonster.monster.stats.proficiency}
                            </div>
                        </NestedNestedContainer>
                        <NestedNestedContainer>
                            <div>
                                <b>Hit points: </b>
                            </div>
                            <div style={{ paddingLeft: "0.3rem" }}>
                                {selectedMonster.monster.stats.hitPoints}
                            </div>
                        </NestedNestedContainer>
                    </NestedContainer>

                    <NestedContainer>
                        <NestedNestedContainer>
                            <div>
                                <b>Passive Perception: </b>{" "}
                            </div>
                            <div style={{ paddingLeft: "0.3rem" }}>
                                {selectedMonster.monster.stats.passivePerception}
                            </div>
                        </NestedNestedContainer>

                        <NestedNestedContainer>
                            <div>
                                <b>Inspiration: </b>
                            </div>
                            <div
                                style={{
                                    paddingLeft: "0.3rem",
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                {parseStringBooleanToCheckmark(
                                    selectedMonster.monster.stats.inspiration,
                                    true
                                )}
                            </div>
                        </NestedNestedContainer>
                        <NestedNestedContainer>
                            <div>
                                <b>Unique: </b>
                            </div>
                            <div
                                style={{
                                    paddingLeft: "0.3rem",
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                {parseStringBooleanToCheckmark(
                                    selectedMonster.monster.isUnique,
                                    true
                                )}
                            </div>
                        </NestedNestedContainer>
                    </NestedContainer>

                    <NestedContainer>
                        <NestedNestedContainer>
                            <div>
                                <b>Speed: </b>{" "}
                            </div>
                            <div style={{ paddingLeft: "0.3rem" }}>
                                {selectedMonster.monster.stats.speed}'
                            </div>
                        </NestedNestedContainer>
                        <NestedNestedContainer>
                            <div>
                                <b>Senses: </b>{" "}
                            </div>
                            <div style={{ paddingLeft: "0.3rem" }}>
                                {renderArrayOfString(selectedMonster.monster.senses)}
                            </div>
                        </NestedNestedContainer>
                        <NestedNestedContainer>
                            <div>
                                <b>Immunities : </b>
                            </div>
                            <div style={{ paddingLeft: "0.3rem" }}>
                                {renderArrayOfString(selectedMonster.monster.immunities)}
                            </div>
                        </NestedNestedContainer>
                    </NestedContainer>

                    <div style={{ width: "100%", borderBottom: "double" }}></div>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            flexWrap: "wrap",
                            flexDirection: "row",
                            alignItems: "space-between",
                            width: "100%",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                flexDirection: "column",
                                alignItems: "center",
                                width: "5rem",
                            }}
                        >
                            <b style={{ paddingRight: "0.3rem", fontSize: "1.4rem" }}>STR</b>
                            <h3>

                                {selectedMonster.monster.stats.strength.value}(
              {getAbilityModifier(
                                    selectedMonster.monster.stats.strength.value
                                )}
              )
                  </h3>
                            <div
                                style={{
                                    paddingLeft: "0.2rem",
                                    paddingRight: "0.2rem",
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                {selectedMonster.monster.stats.strength.isProficient ===
                                    "TRUE" ? (
                                    <CheckIcon style={{ width: "0.8rem", color: "green" }} />
                                ) : null}
                Saving:
                {getAbilityModifier(
                                    selectedMonster.monster.stats.strength.value,
                                    selectedMonster.monster.stats.strength.isProficient,
                                    selectedMonster.monster.stats.proficiency
                                )}
                            </div>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                flexDirection: "column",
                                alignItems: "center",
                                width: "5rem",
                            }}
                        >
                            <b style={{ paddingRight: "0.3rem", fontSize: "1.4rem" }}>DEX</b>
                            <h3>

                                {selectedMonster.monster.stats.dexterity.value}(
              {getAbilityModifier(
                                    selectedMonster.monster.stats.dexterity.value
                                )}
              )
                  </h3>
                            <div
                                style={{
                                    paddingLeft: "0.2rem",
                                    paddingRight: "0.2rem",
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                {selectedMonster.monster.stats.dexterity.isProficient ===
                                    "TRUE" ? (
                                    <CheckIcon style={{ width: "0.8rem", color: "green" }} />
                                ) : null}
                Saving:
                {getAbilityModifier(
                                    selectedMonster.monster.stats.dexterity.value,
                                    selectedMonster.monster.stats.dexterity.isProficient,
                                    selectedMonster.monster.stats.proficiency
                                )}
                            </div>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                flexDirection: "column",
                                alignItems: "center",
                                width: "5rem",
                            }}
                        >
                            <b style={{ paddingRight: "0.3rem", fontSize: "1.4rem" }}>CON</b>
                            <h3>

                                {selectedMonster.monster.stats.constitution.value}(
              {getAbilityModifier(
                                    selectedMonster.monster.stats.constitution.value
                                )}
              )
                  </h3>
                            <div
                                style={{
                                    paddingLeft: "0.2rem",
                                    paddingRight: "0.2rem",
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                {selectedMonster.monster.stats.constitution.isProficient ===
                                    "TRUE" ? (
                                    <CheckIcon style={{ width: "0.8rem", color: "green" }} />
                                ) : null}
                Saving:
                {getAbilityModifier(
                                    selectedMonster.monster.stats.constitution.value,
                                    selectedMonster.monster.stats.constitution.isProficient,
                                    selectedMonster.monster.stats.proficiency
                                )}
                            </div>
                        </div>

                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                flexDirection: "column",
                                alignItems: "center",
                                width: "5rem",
                            }}
                        >
                            <b style={{ paddingRight: "0.3rem", fontSize: "1.4rem" }}>INT</b>
                            <h3>

                                {selectedMonster.monster.stats.intelligence.value}(
              {getAbilityModifier(
                                    selectedMonster.monster.stats.intelligence.value
                                )}
              )
                  </h3>
                            <div
                                style={{
                                    paddingLeft: "0.2rem",
                                    paddingRight: "0.2rem",
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                {selectedMonster.monster.stats.intelligence.isProficient ===
                                    "TRUE" ? (
                                    <CheckIcon style={{ width: "0.8rem", color: "green" }} />
                                ) : null}
                Saving:
                {getAbilityModifier(
                                    selectedMonster.monster.stats.intelligence.value,
                                    selectedMonster.monster.stats.intelligence.isProficient,
                                    selectedMonster.monster.stats.proficiency
                                )}
                            </div>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                flexDirection: "column",
                                alignItems: "center",
                                width: "5rem",
                            }}
                        >
                            <b style={{ paddingRight: "0.3rem", fontSize: "1.4rem" }}>WIS</b>
                            <h3>

                                {selectedMonster.monster.stats.wisdom.value}(
              {getAbilityModifier(
                                    selectedMonster.monster.stats.wisdom.value
                                )}
              )
                  </h3>
                            <div
                                style={{
                                    paddingLeft: "0.2rem",
                                    paddingRight: "0.2rem",
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                {selectedMonster.monster.stats.wisdom.isProficient ===
                                    "TRUE" ? (
                                    <CheckIcon style={{ width: "0.8rem", color: "green" }} />
                                ) : null}
                Saving:
                {getAbilityModifier(
                                    selectedMonster.monster.stats.wisdom.value,
                                    selectedMonster.monster.stats.wisdom.isProficient,
                                    selectedMonster.monster.stats.proficiency
                                )}
                            </div>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                flexDirection: "column",
                                alignItems: "center",
                                width: "5rem",
                            }}
                        >
                            <b style={{ paddingRight: "0.3rem", fontSize: "1.4rem" }}>CHA</b>
                            <h3>

                                {selectedMonster.monster.stats.charisma.value}(
              {getAbilityModifier(
                                    selectedMonster.monster.stats.charisma.value
                                )}
              )
                  </h3>
                            <div
                                style={{
                                    paddingLeft: "0.2rem",
                                    paddingRight: "0.2rem",
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                {selectedMonster.monster.stats.charisma.isProficient ===
                                    "TRUE" ? (
                                    <CheckIcon style={{ width: "0.8rem", color: "green" }} />
                                ) : null}
                Saving:
                {getAbilityModifier(
                                    selectedMonster.monster.stats.charisma.value,
                                    selectedMonster.monster.stats.charisma.isProficient,
                                    selectedMonster.monster.stats.proficiency
                                )}
                            </div>
                        </div>

                        <div
                            style={{
                                display: "flex",
                                width: "100%",
                                justifyContent: "space-around",
                                flexDirection: "row",
                                flexWrap: "wrap",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}
                            >
                                <Table>
                                    <thead>

                                        <tr>
                                            <TableHeader>Proficient</TableHeader>
                                            <TableHeader>Modifier</TableHeader>
                                            <TableHeader>Skill</TableHeader>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        <tr>
                                            <TableElement>
                                                {parseStringBooleanToCheckmark(
                                                    selectedMonster.monster.stats.skills.acrobatics
                                                        .proficient,
                                                    false
                                                )}
                                            </TableElement>
                                            <TableElement>
                                                {getAbilityModifier(
                                                    selectedMonster.monster.stats.dexterity.value,
                                                    selectedMonster.monster.stats.skills.acrobatics
                                                        .proficient === "TRUE",
                                                    selectedMonster.monster.stats.proficiency
                                                )}
                                            </TableElement>
                                            <TableElement>Acrobatics (Dex)</TableElement>
                                        </tr>
                                        <tr>
                                            <TableElement>
                                                {parseStringBooleanToCheckmark(
                                                    selectedMonster.monster.stats.skills.animalHandling
                                                        .proficient,
                                                    false
                                                )}
                                            </TableElement>
                                            <TableElement>
                                                {getAbilityModifier(
                                                    selectedMonster.monster.stats.dexterity.value,
                                                    selectedMonster.monster.stats.skills.animalHandling
                                                        .proficient === "TRUE",
                                                    selectedMonster.monster.stats.proficiency
                                                )}
                                            </TableElement>
                                            <TableElement>Animal Handling (Dex)</TableElement>
                                        </tr>
                                        <tr>
                                            <TableElement>
                                                {parseStringBooleanToCheckmark(
                                                    selectedMonster.monster.stats.skills.arcana
                                                        .proficient,
                                                    false
                                                )}
                                            </TableElement>
                                            <TableElement>
                                                {getAbilityModifier(
                                                    selectedMonster.monster.stats.intelligence.value,
                                                    selectedMonster.monster.stats.skills.arcana
                                                        .proficient === "TRUE",
                                                    selectedMonster.monster.stats.proficiency
                                                )}
                                            </TableElement>
                                            <TableElement>Arcana (Int)</TableElement>
                                        </tr>
                                        <tr>
                                            <TableElement>
                                                {parseStringBooleanToCheckmark(
                                                    selectedMonster.monster.stats.skills.athletics
                                                        .proficient,
                                                    false
                                                )}
                                            </TableElement>
                                            <TableElement>
                                                {getAbilityModifier(
                                                    selectedMonster.monster.stats.strength.value,
                                                    selectedMonster.monster.stats.skills.athletics
                                                        .proficient === "TRUE",
                                                    selectedMonster.monster.stats.proficiency
                                                )}
                                            </TableElement>
                                            <TableElement>Athletics (Str)</TableElement>
                                        </tr>
                                        <tr>
                                            <TableElement>
                                                {parseStringBooleanToCheckmark(
                                                    selectedMonster.monster.stats.skills.deception
                                                        .proficient,
                                                    false
                                                )}
                                            </TableElement>
                                            <TableElement>
                                                {getAbilityModifier(
                                                    selectedMonster.monster.stats.charisma.value,
                                                    selectedMonster.monster.stats.skills.deception
                                                        .proficient === "TRUE",
                                                    selectedMonster.monster.stats.proficiency
                                                )}
                                            </TableElement>
                                            <TableElement>Deception (Cha)</TableElement>
                                        </tr>
                                        <tr>
                                            <TableElement>
                                                {parseStringBooleanToCheckmark(
                                                    selectedMonster.monster.stats.skills.history
                                                        .proficient,
                                                    false
                                                )}
                                            </TableElement>
                                            <TableElement>
                                                {getAbilityModifier(
                                                    selectedMonster.monster.stats.intelligence.value,
                                                    selectedMonster.monster.stats.skills.history
                                                        .proficient === "TRUE",
                                                    selectedMonster.monster.stats.proficiency
                                                )}
                                            </TableElement>
                                            <TableElement>History (Int)</TableElement>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}
                            >
                                <Table>
                                    <thead>

                                        <tr>
                                            <TableHeader>Proficient</TableHeader>
                                            <TableHeader>Modifier</TableHeader>
                                            <TableHeader>Skill</TableHeader>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        <tr>
                                            <TableElement>
                                                {parseStringBooleanToCheckmark(
                                                    selectedMonster.monster.stats.skills.insight
                                                        .proficient,
                                                    false
                                                )}
                                            </TableElement>
                                            <TableElement>
                                                {getAbilityModifier(
                                                    selectedMonster.monster.stats.wisdom.value,
                                                    selectedMonster.monster.stats.skills.insight
                                                        .proficient === "TRUE",
                                                    selectedMonster.monster.stats.proficiency
                                                )}
                                            </TableElement>
                                            <TableElement>Insight (Wis)</TableElement>
                                        </tr>
                                        <tr>
                                            <TableElement>
                                                {parseStringBooleanToCheckmark(
                                                    selectedMonster.monster.stats.skills.intimidation
                                                        .proficient,
                                                    false
                                                )}
                                            </TableElement>
                                            <TableElement>
                                                {getAbilityModifier(
                                                    selectedMonster.monster.stats.charisma.value,
                                                    selectedMonster.monster.stats.skills.intimidation
                                                        .proficient === "TRUE",
                                                    selectedMonster.monster.stats.proficiency
                                                )}
                                            </TableElement>
                                            <TableElement>Intimidation (Cha)</TableElement>
                                        </tr>
                                        <tr>
                                            <TableElement>
                                                {parseStringBooleanToCheckmark(
                                                    selectedMonster.monster.stats.skills.investigation
                                                        .proficient,
                                                    false
                                                )}
                                            </TableElement>
                                            <TableElement>
                                                {getAbilityModifier(
                                                    selectedMonster.monster.stats.intelligence.value,
                                                    selectedMonster.monster.stats.skills.investigation
                                                        .proficient === "TRUE",
                                                    selectedMonster.monster.stats.proficiency
                                                )}
                                            </TableElement>
                                            <TableElement>Investigation (Int)</TableElement>
                                        </tr>
                                        <tr>
                                            <TableElement>
                                                {parseStringBooleanToCheckmark(
                                                    selectedMonster.monster.stats.skills.medicine
                                                        .proficient,
                                                    false
                                                )}
                                            </TableElement>
                                            <TableElement>
                                                {getAbilityModifier(
                                                    selectedMonster.monster.stats.wisdom.value,
                                                    selectedMonster.monster.stats.skills.medicine
                                                        .proficient === "TRUE",
                                                    selectedMonster.monster.stats.proficiency
                                                )}
                                            </TableElement>
                                            <TableElement>Medicine (Wis)</TableElement>
                                        </tr>
                                        <tr>
                                            <TableElement>
                                                {parseStringBooleanToCheckmark(
                                                    selectedMonster.monster.stats.skills.nature
                                                        .proficient,
                                                    false
                                                )}
                                            </TableElement>
                                            <TableElement>
                                                {getAbilityModifier(
                                                    selectedMonster.monster.stats.intelligence.value,
                                                    selectedMonster.monster.stats.skills.nature
                                                        .proficient === "TRUE",
                                                    selectedMonster.monster.stats.proficiency
                                                )}
                                            </TableElement>
                                            <TableElement>Nature (Int)</TableElement>
                                        </tr>
                                        <tr>
                                            <TableElement>
                                                {parseStringBooleanToCheckmark(
                                                    selectedMonster.monster.stats.skills.perception
                                                        .proficient,
                                                    false
                                                )}
                                            </TableElement>
                                            <TableElement>
                                                {getAbilityModifier(
                                                    selectedMonster.monster.stats.wisdom.value,
                                                    selectedMonster.monster.stats.skills.perception
                                                        .proficient === "TRUE",
                                                    selectedMonster.monster.stats.proficiency
                                                )}
                                            </TableElement>
                                            <TableElement>Perception (Wis)</TableElement>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}
                            >
                                <Table>
                                    <thead>

                                        <tr>
                                            <TableHeader>Proficient</TableHeader>
                                            <TableHeader>Modifier</TableHeader>
                                            <TableHeader>Skill</TableHeader>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        <tr>
                                            <TableElement>
                                                {parseStringBooleanToCheckmark(
                                                    selectedMonster.monster.stats.skills.performance
                                                        .proficient,
                                                    false
                                                )}
                                            </TableElement>
                                            <TableElement>
                                                {getAbilityModifier(
                                                    selectedMonster.monster.stats.charisma.value,
                                                    selectedMonster.monster.stats.skills.performance
                                                        .proficient === "TRUE",
                                                    selectedMonster.monster.stats.proficiency
                                                )}
                                            </TableElement>
                                            <TableElement>Performance (Cha)</TableElement>
                                        </tr>
                                        <tr>
                                            <TableElement>
                                                {parseStringBooleanToCheckmark(
                                                    selectedMonster.monster.stats.skills.persuasion
                                                        .proficient,
                                                    false
                                                )}
                                            </TableElement>
                                            <TableElement>
                                                {getAbilityModifier(
                                                    selectedMonster.monster.stats.charisma.value,
                                                    selectedMonster.monster.stats.skills.persuasion
                                                        .proficient === "TRUE",
                                                    selectedMonster.monster.stats.proficiency
                                                )}
                                            </TableElement>
                                            <TableElement>Persuasion (Cha)</TableElement>
                                        </tr>
                                        <tr>
                                            <TableElement>
                                                {parseStringBooleanToCheckmark(
                                                    selectedMonster.monster.stats.skills.religion
                                                        .proficient,
                                                    false
                                                )}
                                            </TableElement>
                                            <TableElement>
                                                {getAbilityModifier(
                                                    selectedMonster.monster.stats.intelligence.value,
                                                    selectedMonster.monster.stats.skills.religion
                                                        .proficient === "TRUE",
                                                    selectedMonster.monster.stats.proficiency
                                                )}
                                            </TableElement>
                                            <TableElement>Religion (Int)</TableElement>
                                        </tr>
                                        <tr>
                                            <TableElement>
                                                {parseStringBooleanToCheckmark(
                                                    selectedMonster.monster.stats.skills.sleightOfHand
                                                        .proficient,
                                                    false
                                                )}
                                            </TableElement>
                                            <TableElement>
                                                {getAbilityModifier(
                                                    selectedMonster.monster.stats.dexterity.value,
                                                    selectedMonster.monster.stats.skills.sleightOfHand
                                                        .proficient === "TRUE",
                                                    selectedMonster.monster.stats.proficiency
                                                )}
                                            </TableElement>
                                            <TableElement>Sleight of Hand (Dex)</TableElement>
                                        </tr>
                                        <tr>
                                            <TableElement>
                                                {parseStringBooleanToCheckmark(
                                                    selectedMonster.monster.stats.skills.stealth
                                                        .proficient,
                                                    false
                                                )}
                                            </TableElement>
                                            <TableElement>
                                                {getAbilityModifier(
                                                    selectedMonster.monster.stats.dexterity.value,
                                                    selectedMonster.monster.stats.skills.stealth
                                                        .proficient === "TRUE",
                                                    selectedMonster.monster.stats.proficiency
                                                )}
                                            </TableElement>
                                            <TableElement>Stealth (Dex)</TableElement>
                                        </tr>
                                        <tr>
                                            <TableElement>
                                                {parseStringBooleanToCheckmark(
                                                    selectedMonster.monster.stats.skills.survival
                                                        .proficient,
                                                    false
                                                )}
                                            </TableElement>
                                            <TableElement>
                                                {getAbilityModifier(
                                                    selectedMonster.monster.stats.wisdom.value,
                                                    selectedMonster.monster.stats.skills.survival
                                                        .proficient === "TRUE",
                                                    selectedMonster.monster.stats.proficiency
                                                )}
                                            </TableElement>
                                            <TableElement>Survival (Wis)</TableElement>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </div>

                    </div>
                    {selectedMonster.monster.actions ?
                        <NestedContainer style={{ width: "100%" }} >
                            <h3>
                                Actions and Specials:
                    </h3>
                            {selectedMonster.monster.actions.map((action: IMonsterAction, index: number) => <div key={index}><b >{action.name}:</b> {action.description}</div>)}
                        </NestedContainer>

                        : null}
                    <NestedContainer style={{ width: "100%" }} >
                        <h3>Description and history: </h3>
                        <DraftJSEditor readOnly={true} storagePath={`${monsterPath}/monsterDescription.json`} isDungeonMaster={isDungeonMaster} />

                    </NestedContainer>

                </>
            ) : null}
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
  justify-content: space-between;
  align-center: center;
  flex-wrap: wrap;
  min-height: 20rem;
`;
const NestedContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  justify-self: end;
  margin:0.5rem;
  grid-gap: auto;
  min-width: 15rem;
`;

const NestedNestedContainer = styled.div`
  display: flex;
  align-items: center;
  justify-items: flex-start;
  font-size: 1.2rem;
`;
const Table = styled.table`
  margin: 0.3rem;
  border-radius: 0.2rem;
  border: double;
  width: 20rem;
  padding: 0.2rem;
`;

const TableHeader = styled.th`
  text-align: center;
`;

const TableElement = styled.td`
  text-align: center;
`;
export default CampaignMonster;
