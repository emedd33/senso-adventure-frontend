import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import {
    getSelectedCharacter,
    isDungeonMasterSelector,
    getSelectedCharacterStorageRef,
} from "../../store/selected/selectedSelectors";
import styled from "styled-components";
import { OLD_WHITE } from "../../assets/constants/Constants";
import IsLoading from "../../components/IsLoading/IsLoading";
import getAbilityModifier from "../../utils/getAbilityModifier";
import parseValuesToString from "../../utils/parseValuesToString";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import renderArrayOfString from "../../utils/renderArrayToString";
import DraftJSEditor from "../../components/DraftJSEditor/DraftJSEditor";

type CampaignProps = {};
const CampaignCharacter: FunctionComponent<CampaignProps> = () => {
    const history = useHistory();
    const selectedCharacter = useSelector(getSelectedCharacter);
    const isDungeonMaster = useSelector(isDungeonMasterSelector);
    const storageRef = useSelector(getSelectedCharacterStorageRef);
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

    if (selectedCharacter === undefined) {
        return (
            <Container>
                <IsLoading />
            </Container>
        );
    }
    return (
        <Container>
            <NestedContainer style={{ flex: 1 }}>
                <div
                    style={{
                        display: "grid",
                        width: "100%",
                        gridTemplateColumns: "1fr 1fr",
                        height: "5rem",
                    }}
                >
                    <div>
                        <h1 style={{ marginBottom: "0" }}>
                            {selectedCharacter.character.name}{" "}
                            {selectedCharacter.character.isPublished === "FALSE"
                                ? "(Unpublished)"
                                : null}
                        </h1>
                    </div>
                    <div>
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
                                            history.push(`${selectedCharacter.character.slug}/edit`)
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
                    <NestedNestedContainer style={{ marginBottom: "1rem" }}>

                        {selectedCharacter.character.isPlayer === "TRUE"
                            ? `Played by: ${selectedCharacter.character.playerName}`
                            : "NPC"}
                    </NestedNestedContainer>
                </div>
                <NestedNestedContainer style={{ marginTop: "1rem" }}>
                    <div>

                    </div>
                    <div>
                        {selectedCharacter.character.race},
          </div>
                    {selectedCharacter.character.class ? (
                        <div style={{ marginLeft: "0.5rem" }}>
                            {parseValuesToString(selectedCharacter.character.class)},
                        </div>
                    ) : null}
                    {isDungeonMaster ? (
                        <>
                            <div style={{ marginLeft: "0.5rem" }}>
                                {selectedCharacter.character.alignment},
              </div>
                            <div style={{ marginLeft: "0.5rem" }}>
                                {selectedCharacter.character.isPlayer === "TRUE"
                                    ? `Level: ${parseValuesToString(
                                        selectedCharacter.character.level
                                    )}`
                                    : `CR: ${parseValuesToString(
                                        selectedCharacter.character.challengeRating
                                    )}`}
                            </div>
                        </>
                    ) : null}
                </NestedNestedContainer>
            </NestedContainer>
            <NestedContainer style={{ width: "100%" }}>
                <div style={{ width: "100%", borderBottom: "double" }}></div>

                <b>Summary: </b>
                {selectedCharacter.character.summary}
                <div style={{ width: "100%", borderBottom: "double" }}></div>
            </NestedContainer>
            {isDungeonMaster || selectedCharacter.character.isPlayer === "TRUE" ? (
                <>
                    <NestedContainer>
                        <NestedNestedContainer>
                            <div>
                                <b>Armor class: </b>{" "}
                            </div>
                            <div style={{ paddingLeft: "0.3rem" }}>
                                {selectedCharacter.character.stats.armorClass}
                            </div>
                        </NestedNestedContainer>
                        <NestedNestedContainer>
                            <div>
                                <b>Proficiency: </b>
                            </div>
                            <div style={{ paddingLeft: "0.3rem" }}>
                                {selectedCharacter.character.stats.proficiency}
                            </div>
                        </NestedNestedContainer>
                        <NestedNestedContainer>
                            <div>
                                <b>Hit points: </b>
                            </div>
                            <div style={{ paddingLeft: "0.3rem" }}>
                                {selectedCharacter.character.stats.hitPoints}
                            </div>
                        </NestedNestedContainer>
                    </NestedContainer>

                    <NestedContainer>
                        <NestedNestedContainer>
                            <div>
                                <b>Passive Perception: </b>{" "}
                            </div>
                            <div style={{ paddingLeft: "0.3rem" }}>
                                {selectedCharacter.character.stats.passivePerception}
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
                                    selectedCharacter.character.stats.inspiration,
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
                                    selectedCharacter.character.isUnique,
                                    true
                                )}
                            </div>
                        </NestedNestedContainer>
                    </NestedContainer>

                    <NestedContainer>
                        <NestedNestedContainer>
                            <div>
                                <b>Senses: </b>{" "}
                            </div>
                            <div style={{ paddingLeft: "0.3rem" }}>
                                {renderArrayOfString(selectedCharacter.character.senses)}
                            </div>
                        </NestedNestedContainer>
                        <NestedNestedContainer>
                            <div>
                                <b>Immunities : </b>
                            </div>
                            <div style={{ paddingLeft: "0.3rem" }}>
                                {renderArrayOfString(selectedCharacter.character.immunities)}
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
                            <b style={{ paddingRight: "0.3rem", fontSize: "1.4rem" }}>STR:</b>
                            {selectedCharacter.character.stats.strength.value}(
              {getAbilityModifier(
                                selectedCharacter.character.stats.strength.value
                            )}
              ),
              <div
                                style={{
                                    paddingLeft: "0.2rem",
                                    paddingRight: "0.2rem",
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                {selectedCharacter.character.stats.strength.isProficient ===
                                    "TRUE" ? (
                                        <CheckIcon style={{ width: "0.8rem", color: "green" }} />
                                    ) : null}
                Saving:
                {getAbilityModifier(
                                        selectedCharacter.character.stats.strength.value,
                                        selectedCharacter.character.stats.strength.isProficient,
                                        selectedCharacter.character.stats.proficiency
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
                            <b style={{ paddingRight: "0.3rem", fontSize: "1.4rem" }}>DEX:</b>
                            {selectedCharacter.character.stats.dexterity.value}(
              {getAbilityModifier(
                                selectedCharacter.character.stats.dexterity.value
                            )}
              ),
              <div
                                style={{
                                    paddingLeft: "0.2rem",
                                    paddingRight: "0.2rem",
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                {selectedCharacter.character.stats.dexterity.isProficient ===
                                    "TRUE" ? (
                                        <CheckIcon style={{ width: "0.8rem", color: "green" }} />
                                    ) : null}
                Saving:
                {getAbilityModifier(
                                        selectedCharacter.character.stats.dexterity.value,
                                        selectedCharacter.character.stats.dexterity.isProficient,
                                        selectedCharacter.character.stats.proficiency
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
                            <b style={{ paddingRight: "0.3rem", fontSize: "1.4rem" }}>CON:</b>
                            {selectedCharacter.character.stats.constitution.value}(
              {getAbilityModifier(
                                selectedCharacter.character.stats.constitution.value
                            )}
              ),
              <div
                                style={{
                                    paddingLeft: "0.2rem",
                                    paddingRight: "0.2rem",
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                {selectedCharacter.character.stats.constitution.isProficient ===
                                    "TRUE" ? (
                                        <CheckIcon style={{ width: "0.8rem", color: "green" }} />
                                    ) : null}
                Saving:
                {getAbilityModifier(
                                        selectedCharacter.character.stats.constitution.value,
                                        selectedCharacter.character.stats.constitution.isProficient,
                                        selectedCharacter.character.stats.proficiency
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
                            <b style={{ paddingRight: "0.3rem", fontSize: "1.4rem" }}>INT:</b>
                            {selectedCharacter.character.stats.intelligence.value}(
              {getAbilityModifier(
                                selectedCharacter.character.stats.intelligence.value
                            )}
              ),
              <div
                                style={{
                                    paddingLeft: "0.2rem",
                                    paddingRight: "0.2rem",
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                {selectedCharacter.character.stats.intelligence.isProficient ===
                                    "TRUE" ? (
                                        <CheckIcon style={{ width: "0.8rem", color: "green" }} />
                                    ) : null}
                Saving:
                {getAbilityModifier(
                                        selectedCharacter.character.stats.intelligence.value,
                                        selectedCharacter.character.stats.intelligence.isProficient,
                                        selectedCharacter.character.stats.proficiency
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
                            <b style={{ paddingRight: "0.3rem", fontSize: "1.4rem" }}>WIS:</b>
                            {selectedCharacter.character.stats.wisdom.value}(
              {getAbilityModifier(
                                selectedCharacter.character.stats.wisdom.value
                            )}
              ),
              <div
                                style={{
                                    paddingLeft: "0.2rem",
                                    paddingRight: "0.2rem",
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                {selectedCharacter.character.stats.wisdom.isProficient ===
                                    "TRUE" ? (
                                        <CheckIcon style={{ width: "0.8rem", color: "green" }} />
                                    ) : null}
                Saving:
                {getAbilityModifier(
                                        selectedCharacter.character.stats.wisdom.value,
                                        selectedCharacter.character.stats.wisdom.isProficient,
                                        selectedCharacter.character.stats.proficiency
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
                            <b style={{ paddingRight: "0.3rem", fontSize: "1.4rem" }}>CHA:</b>
                            {selectedCharacter.character.stats.charisma.value}(
              {getAbilityModifier(
                                selectedCharacter.character.stats.charisma.value
                            )}
              ),
              <div
                                style={{
                                    paddingLeft: "0.2rem",
                                    paddingRight: "0.2rem",
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                {selectedCharacter.character.stats.charisma.isProficient ===
                                    "TRUE" ? (
                                        <CheckIcon style={{ width: "0.8rem", color: "green" }} />
                                    ) : null}
                Saving:
                {getAbilityModifier(
                                        selectedCharacter.character.stats.charisma.value,
                                        selectedCharacter.character.stats.charisma.isProficient,
                                        selectedCharacter.character.stats.proficiency
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
                                    <tr>
                                        <TableHeader>Proficient</TableHeader>
                                        <TableHeader>Modifier</TableHeader>
                                        <TableHeader>Skill</TableHeader>
                                    </tr>
                                    <tr>
                                        <TableElement>
                                            {parseStringBooleanToCheckmark(
                                                selectedCharacter.character.stats.skills.acrobatics
                                                    .proficient,
                                                false
                                            )}
                                        </TableElement>
                                        <TableElement>
                                            {getAbilityModifier(
                                                selectedCharacter.character.stats.dexterity.value,
                                                selectedCharacter.character.stats.skills.acrobatics
                                                    .proficient === "TRUE",
                                                selectedCharacter.character.stats.proficiency
                                            )}
                                        </TableElement>
                                        <TableElement>Acrobatics (Dex)</TableElement>
                                    </tr>
                                    <tr>
                                        <TableElement>
                                            {parseStringBooleanToCheckmark(
                                                selectedCharacter.character.stats.skills.animalHandling
                                                    .proficient,
                                                false
                                            )}
                                        </TableElement>
                                        <TableElement>
                                            {getAbilityModifier(
                                                selectedCharacter.character.stats.dexterity.value,
                                                selectedCharacter.character.stats.skills.animalHandling
                                                    .proficient === "TRUE",
                                                selectedCharacter.character.stats.proficiency
                                            )}
                                        </TableElement>
                                        <TableElement>Animal Handling (Dex)</TableElement>
                                    </tr>
                                    <tr>
                                        <TableElement>
                                            {parseStringBooleanToCheckmark(
                                                selectedCharacter.character.stats.skills.arcana
                                                    .proficient,
                                                false
                                            )}
                                        </TableElement>
                                        <TableElement>
                                            {getAbilityModifier(
                                                selectedCharacter.character.stats.intelligence.value,
                                                selectedCharacter.character.stats.skills.arcana
                                                    .proficient === "TRUE",
                                                selectedCharacter.character.stats.proficiency
                                            )}
                                        </TableElement>
                                        <TableElement>Arcana (Int)</TableElement>
                                    </tr>
                                    <tr>
                                        <TableElement>
                                            {parseStringBooleanToCheckmark(
                                                selectedCharacter.character.stats.skills.athletics
                                                    .proficient,
                                                false
                                            )}
                                        </TableElement>
                                        <TableElement>
                                            {getAbilityModifier(
                                                selectedCharacter.character.stats.strength.value,
                                                selectedCharacter.character.stats.skills.athletics
                                                    .proficient === "TRUE",
                                                selectedCharacter.character.stats.proficiency
                                            )}
                                        </TableElement>
                                        <TableElement>Athletics (Str)</TableElement>
                                    </tr>
                                    <tr>
                                        <TableElement>
                                            {parseStringBooleanToCheckmark(
                                                selectedCharacter.character.stats.skills.deception
                                                    .proficient,
                                                false
                                            )}
                                        </TableElement>
                                        <TableElement>
                                            {getAbilityModifier(
                                                selectedCharacter.character.stats.charisma.value,
                                                selectedCharacter.character.stats.skills.deception
                                                    .proficient === "TRUE",
                                                selectedCharacter.character.stats.proficiency
                                            )}
                                        </TableElement>
                                        <TableElement>Deception (Cha)</TableElement>
                                    </tr>
                                    <tr>
                                        <TableElement>
                                            {parseStringBooleanToCheckmark(
                                                selectedCharacter.character.stats.skills.history
                                                    .proficient,
                                                false
                                            )}
                                        </TableElement>
                                        <TableElement>
                                            {getAbilityModifier(
                                                selectedCharacter.character.stats.intelligence.value,
                                                selectedCharacter.character.stats.skills.history
                                                    .proficient === "TRUE",
                                                selectedCharacter.character.stats.proficiency
                                            )}
                                        </TableElement>
                                        <TableElement>History (Int)</TableElement>
                                    </tr>
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
                                    <tr>
                                        <TableHeader>Proficient</TableHeader>
                                        <TableHeader>Modifier</TableHeader>
                                        <TableHeader>Skill</TableHeader>
                                    </tr>
                                    <tr>
                                        <TableElement>
                                            {parseStringBooleanToCheckmark(
                                                selectedCharacter.character.stats.skills.insight
                                                    .proficient,
                                                false
                                            )}
                                        </TableElement>
                                        <TableElement>
                                            {getAbilityModifier(
                                                selectedCharacter.character.stats.wisdom.value,
                                                selectedCharacter.character.stats.skills.insight
                                                    .proficient === "TRUE",
                                                selectedCharacter.character.stats.proficiency
                                            )}
                                        </TableElement>
                                        <TableElement>Insight (Wis)</TableElement>
                                    </tr>
                                    <tr>
                                        <TableElement>
                                            {parseStringBooleanToCheckmark(
                                                selectedCharacter.character.stats.skills.intimidation
                                                    .proficient,
                                                false
                                            )}
                                        </TableElement>
                                        <TableElement>
                                            {getAbilityModifier(
                                                selectedCharacter.character.stats.charisma.value,
                                                selectedCharacter.character.stats.skills.intimidation
                                                    .proficient === "TRUE",
                                                selectedCharacter.character.stats.proficiency
                                            )}
                                        </TableElement>
                                        <TableElement>Intimidation (Cha)</TableElement>
                                    </tr>
                                    <tr>
                                        <TableElement>
                                            {parseStringBooleanToCheckmark(
                                                selectedCharacter.character.stats.skills.investigation
                                                    .proficient,
                                                false
                                            )}
                                        </TableElement>
                                        <TableElement>
                                            {getAbilityModifier(
                                                selectedCharacter.character.stats.intelligence.value,
                                                selectedCharacter.character.stats.skills.investigation
                                                    .proficient === "TRUE",
                                                selectedCharacter.character.stats.proficiency
                                            )}
                                        </TableElement>
                                        <TableElement>Investigation (Int)</TableElement>
                                    </tr>
                                    <tr>
                                        <TableElement>
                                            {parseStringBooleanToCheckmark(
                                                selectedCharacter.character.stats.skills.medicine
                                                    .proficient,
                                                false
                                            )}
                                        </TableElement>
                                        <TableElement>
                                            {getAbilityModifier(
                                                selectedCharacter.character.stats.wisdom.value,
                                                selectedCharacter.character.stats.skills.medicine
                                                    .proficient === "TRUE",
                                                selectedCharacter.character.stats.proficiency
                                            )}
                                        </TableElement>
                                        <TableElement>Medicine (Wis)</TableElement>
                                    </tr>
                                    <tr>
                                        <TableElement>
                                            {parseStringBooleanToCheckmark(
                                                selectedCharacter.character.stats.skills.nature
                                                    .proficient,
                                                false
                                            )}
                                        </TableElement>
                                        <TableElement>
                                            {getAbilityModifier(
                                                selectedCharacter.character.stats.intelligence.value,
                                                selectedCharacter.character.stats.skills.nature
                                                    .proficient === "TRUE",
                                                selectedCharacter.character.stats.proficiency
                                            )}
                                        </TableElement>
                                        <TableElement>Nature (Int)</TableElement>
                                    </tr>
                                    <tr>
                                        <TableElement>
                                            {parseStringBooleanToCheckmark(
                                                selectedCharacter.character.stats.skills.perception
                                                    .proficient,
                                                false
                                            )}
                                        </TableElement>
                                        <TableElement>
                                            {getAbilityModifier(
                                                selectedCharacter.character.stats.wisdom.value,
                                                selectedCharacter.character.stats.skills.perception
                                                    .proficient === "TRUE",
                                                selectedCharacter.character.stats.proficiency
                                            )}
                                        </TableElement>
                                        <TableElement>Perception (Wis)</TableElement>
                                    </tr>
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
                                    <tr>
                                        <TableHeader>Proficient</TableHeader>
                                        <TableHeader>Modifier</TableHeader>
                                        <TableHeader>Skill</TableHeader>
                                    </tr>
                                    <tr>
                                        <TableElement>
                                            {parseStringBooleanToCheckmark(
                                                selectedCharacter.character.stats.skills.performance
                                                    .proficient,
                                                false
                                            )}
                                        </TableElement>
                                        <TableElement>
                                            {getAbilityModifier(
                                                selectedCharacter.character.stats.charisma.value,
                                                selectedCharacter.character.stats.skills.performance
                                                    .proficient === "TRUE",
                                                selectedCharacter.character.stats.proficiency
                                            )}
                                        </TableElement>
                                        <TableElement>Performance (Cha)</TableElement>
                                    </tr>
                                    <tr>
                                        <TableElement>
                                            {parseStringBooleanToCheckmark(
                                                selectedCharacter.character.stats.skills.persuasion
                                                    .proficient,
                                                false
                                            )}
                                        </TableElement>
                                        <TableElement>
                                            {getAbilityModifier(
                                                selectedCharacter.character.stats.charisma.value,
                                                selectedCharacter.character.stats.skills.persuasion
                                                    .proficient === "TRUE",
                                                selectedCharacter.character.stats.proficiency
                                            )}
                                        </TableElement>
                                        <TableElement>Persuasion (Cha)</TableElement>
                                    </tr>
                                    <tr>
                                        <TableElement>
                                            {parseStringBooleanToCheckmark(
                                                selectedCharacter.character.stats.skills.religion
                                                    .proficient,
                                                false
                                            )}
                                        </TableElement>
                                        <TableElement>
                                            {getAbilityModifier(
                                                selectedCharacter.character.stats.intelligence.value,
                                                selectedCharacter.character.stats.skills.religion
                                                    .proficient === "TRUE",
                                                selectedCharacter.character.stats.proficiency
                                            )}
                                        </TableElement>
                                        <TableElement>Religion (Int)</TableElement>
                                    </tr>
                                    <tr>
                                        <TableElement>
                                            {parseStringBooleanToCheckmark(
                                                selectedCharacter.character.stats.skills.sleightOfHand
                                                    .proficient,
                                                false
                                            )}
                                        </TableElement>
                                        <TableElement>
                                            {getAbilityModifier(
                                                selectedCharacter.character.stats.dexterity.value,
                                                selectedCharacter.character.stats.skills.sleightOfHand
                                                    .proficient === "TRUE",
                                                selectedCharacter.character.stats.proficiency
                                            )}
                                        </TableElement>
                                        <TableElement>Sleight of Hand (Dex)</TableElement>
                                    </tr>
                                    <tr>
                                        <TableElement>
                                            {parseStringBooleanToCheckmark(
                                                selectedCharacter.character.stats.skills.stealth
                                                    .proficient,
                                                false
                                            )}
                                        </TableElement>
                                        <TableElement>
                                            {getAbilityModifier(
                                                selectedCharacter.character.stats.dexterity.value,
                                                selectedCharacter.character.stats.skills.stealth
                                                    .proficient === "TRUE",
                                                selectedCharacter.character.stats.proficiency
                                            )}
                                        </TableElement>
                                        <TableElement>Stealth (Dex)</TableElement>
                                    </tr>
                                    <tr>
                                        <TableElement>
                                            {parseStringBooleanToCheckmark(
                                                selectedCharacter.character.stats.skills.survival
                                                    .proficient,
                                                false
                                            )}
                                        </TableElement>
                                        <TableElement>
                                            {getAbilityModifier(
                                                selectedCharacter.character.stats.wisdom.value,
                                                selectedCharacter.character.stats.skills.survival
                                                    .proficient === "TRUE",
                                                selectedCharacter.character.stats.proficiency
                                            )}
                                        </TableElement>
                                        <TableElement>Survival (Wis)</TableElement>
                                    </tr>
                                </Table>
                            </div>
                        </div>
                        {selectedCharacter.character.actions ? (
                            <NestedContainer style={{ width: "100%" }}>
                                <h3>Actions and Specials:</h3>
                                {selectedCharacter.character.actions.map(
                                    (action: ICharacterAction) => (
                                        <div>
                                            <b>{action.name}:</b> {action.description}
                                        </div>
                                    )
                                )}
                            </NestedContainer>
                        ) : null}
                        {isDungeonMaster ? (
                            <NestedContainer style={{ width: "100%" }}>
                                <h3>Description and history: </h3>
                                <DraftJSEditor
                                    readOnly={true}
                                    JSONRef={storageRef?.child("CharacterDescription.json")}
                                />
                            </NestedContainer>
                        ) : null}
                    </div>
                </>
            ) : null}
        </Container>
    );
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
export default CampaignCharacter;
