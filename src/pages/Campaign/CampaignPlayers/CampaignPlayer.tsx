import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import {
    isDungeonMasterSelector,
    getSelectedMonsterStorageRef,
    getSelectedPlayer,
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
const CampaignPlayer: FunctionComponent<CampaignProps> = () => {
    const history = useHistory();
    const selectedPlayer = useSelector(getSelectedPlayer);
    const isDungeonMaster = useSelector(isDungeonMasterSelector);
    const storageRef = useSelector(getSelectedMonsterStorageRef);
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

    if (selectedPlayer === undefined) {
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
                                            history.push(`${selectedPlayer.player.slug}/edit`)
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
                        {selectedPlayer.player.name}
                        {selectedPlayer.player.isPublished === "FALSE"
                            ? " (Unpublished)"
                            : null}
                    </h1>
                    <h3 style={{ opacity: 0.7 }}>
                        {`Played by: ${selectedPlayer.player.playerName}`}
                    </h3>

                    <div style={{ gridColumn: "1/3" }}>
                        <b>Also known as: </b>{selectedPlayer.player.nickNames ? renderArrayOfString(selectedPlayer.player.nickNames) : null}
                    </div>
                    {isDungeonMaster ?
                        <div >
                            {` ${selectedPlayer.player.race}`}
                            {selectedPlayer.player.class ? `, ${selectedPlayer.player.class}` : null}
                            {`, ${selectedPlayer.player.alignment}`}
                        </div>
                        : null}
                    {isDungeonMaster ?
                        <div style={{ gridColumn: "1/3" }}>
                            {`Level: ${parseValuesToString(
                                selectedPlayer.player.level
                            )}`}

                        </div>
                        : null}

                </div>
            </div>
            <div style={{ width: "100%" }}>
                <b>Summary: </b>
                <div style={{ width: "100%" }}></div>

                {selectedPlayer.player.summary}
                <div style={{ width: "100%", borderBottom: "double" }}></div>
            </div>
            <>
                <NestedContainer>
                    <NestedNestedContainer>
                        <div>
                            <b>Armor class: </b>{" "}
                        </div>
                        <div style={{ paddingLeft: "0.3rem" }}>
                            {selectedPlayer.player.stats.armorClass}
                        </div>
                    </NestedNestedContainer>
                    <NestedNestedContainer>
                        <div>
                            <b>Proficiency: </b>
                        </div>
                        <div style={{ paddingLeft: "0.3rem" }}>
                            {selectedPlayer.player.stats.proficiency}
                        </div>
                    </NestedNestedContainer>
                    <NestedNestedContainer>
                        <div>
                            <b>Hit points: </b>
                        </div>
                        <div style={{ paddingLeft: "0.3rem" }}>
                            {selectedPlayer.player.stats.hitPoints}
                        </div>
                    </NestedNestedContainer>
                </NestedContainer>

                <NestedContainer>
                    <NestedNestedContainer>
                        <div>
                            <b>Passive Perception: </b>{" "}
                        </div>
                        <div style={{ paddingLeft: "0.3rem" }}>
                            {selectedPlayer.player.stats.passivePerception}
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
                                selectedPlayer.player.stats.inspiration,
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
                            {selectedPlayer.player.stats.speed}'
                            </div>
                    </NestedNestedContainer>
                    <NestedNestedContainer>
                        <div>
                            <b>Senses: </b>{" "}
                        </div>
                        <div style={{ paddingLeft: "0.3rem" }}>
                            {renderArrayOfString(selectedPlayer.player.senses)}
                        </div>
                    </NestedNestedContainer>
                    <NestedNestedContainer>
                        <div>
                            <b>Immunities : </b>
                        </div>
                        <div style={{ paddingLeft: "0.3rem" }}>
                            {renderArrayOfString(selectedPlayer.player.immunities)}
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

                            {selectedPlayer.player.stats.strength.value}(
              {getAbilityModifier(
                                selectedPlayer.player.stats.strength.value
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
                            {selectedPlayer.player.stats.strength.isProficient ===
                                "TRUE" ? (
                                <CheckIcon style={{ width: "0.8rem", color: "green" }} />
                            ) : null}
                Saving:
                {getAbilityModifier(
                                selectedPlayer.player.stats.strength.value,
                                selectedPlayer.player.stats.strength.isProficient,
                                selectedPlayer.player.stats.proficiency
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

                            {selectedPlayer.player.stats.dexterity.value}(
              {getAbilityModifier(
                                selectedPlayer.player.stats.dexterity.value
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
                            {selectedPlayer.player.stats.dexterity.isProficient ===
                                "TRUE" ? (
                                <CheckIcon style={{ width: "0.8rem", color: "green" }} />
                            ) : null}
                Saving:
                {getAbilityModifier(
                                selectedPlayer.player.stats.dexterity.value,
                                selectedPlayer.player.stats.dexterity.isProficient,
                                selectedPlayer.player.stats.proficiency
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

                            {selectedPlayer.player.stats.constitution.value}(
              {getAbilityModifier(
                                selectedPlayer.player.stats.constitution.value
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
                            {selectedPlayer.player.stats.constitution.isProficient ===
                                "TRUE" ? (
                                <CheckIcon style={{ width: "0.8rem", color: "green" }} />
                            ) : null}
                Saving:
                {getAbilityModifier(
                                selectedPlayer.player.stats.constitution.value,
                                selectedPlayer.player.stats.constitution.isProficient,
                                selectedPlayer.player.stats.proficiency
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

                            {selectedPlayer.player.stats.intelligence.value}(
              {getAbilityModifier(
                                selectedPlayer.player.stats.intelligence.value
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
                            {selectedPlayer.player.stats.intelligence.isProficient ===
                                "TRUE" ? (
                                <CheckIcon style={{ width: "0.8rem", color: "green" }} />
                            ) : null}
                Saving:
                {getAbilityModifier(
                                selectedPlayer.player.stats.intelligence.value,
                                selectedPlayer.player.stats.intelligence.isProficient,
                                selectedPlayer.player.stats.proficiency
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

                            {selectedPlayer.player.stats.wisdom.value}(
              {getAbilityModifier(
                                selectedPlayer.player.stats.wisdom.value
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
                            {selectedPlayer.player.stats.wisdom.isProficient ===
                                "TRUE" ? (
                                <CheckIcon style={{ width: "0.8rem", color: "green" }} />
                            ) : null}
                Saving:
                {getAbilityModifier(
                                selectedPlayer.player.stats.wisdom.value,
                                selectedPlayer.player.stats.wisdom.isProficient,
                                selectedPlayer.player.stats.proficiency
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

                            {selectedPlayer.player.stats.charisma.value}(
              {getAbilityModifier(
                                selectedPlayer.player.stats.charisma.value
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
                            {selectedPlayer.player.stats.charisma.isProficient ===
                                "TRUE" ? (
                                <CheckIcon style={{ width: "0.8rem", color: "green" }} />
                            ) : null}
                Saving:
                {getAbilityModifier(
                                selectedPlayer.player.stats.charisma.value,
                                selectedPlayer.player.stats.charisma.isProficient,
                                selectedPlayer.player.stats.proficiency
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
                                                selectedPlayer.player.stats.skills.acrobatics
                                                    .proficient,
                                                false
                                            )}
                                        </TableElement>
                                        <TableElement>
                                            {getAbilityModifier(
                                                selectedPlayer.player.stats.dexterity.value,
                                                selectedPlayer.player.stats.skills.acrobatics
                                                    .proficient === "TRUE",
                                                selectedPlayer.player.stats.proficiency
                                            )}
                                        </TableElement>
                                        <TableElement>Acrobatics (Dex)</TableElement>
                                    </tr>
                                    <tr>
                                        <TableElement>
                                            {parseStringBooleanToCheckmark(
                                                selectedPlayer.player.stats.skills.animalHandling
                                                    .proficient,
                                                false
                                            )}
                                        </TableElement>
                                        <TableElement>
                                            {getAbilityModifier(
                                                selectedPlayer.player.stats.dexterity.value,
                                                selectedPlayer.player.stats.skills.animalHandling
                                                    .proficient === "TRUE",
                                                selectedPlayer.player.stats.proficiency
                                            )}
                                        </TableElement>
                                        <TableElement>Animal Handling (Dex)</TableElement>
                                    </tr>
                                    <tr>
                                        <TableElement>
                                            {parseStringBooleanToCheckmark(
                                                selectedPlayer.player.stats.skills.arcana
                                                    .proficient,
                                                false
                                            )}
                                        </TableElement>
                                        <TableElement>
                                            {getAbilityModifier(
                                                selectedPlayer.player.stats.intelligence.value,
                                                selectedPlayer.player.stats.skills.arcana
                                                    .proficient === "TRUE",
                                                selectedPlayer.player.stats.proficiency
                                            )}
                                        </TableElement>
                                        <TableElement>Arcana (Int)</TableElement>
                                    </tr>
                                    <tr>
                                        <TableElement>
                                            {parseStringBooleanToCheckmark(
                                                selectedPlayer.player.stats.skills.athletics
                                                    .proficient,
                                                false
                                            )}
                                        </TableElement>
                                        <TableElement>
                                            {getAbilityModifier(
                                                selectedPlayer.player.stats.strength.value,
                                                selectedPlayer.player.stats.skills.athletics
                                                    .proficient === "TRUE",
                                                selectedPlayer.player.stats.proficiency
                                            )}
                                        </TableElement>
                                        <TableElement>Athletics (Str)</TableElement>
                                    </tr>
                                    <tr>
                                        <TableElement>
                                            {parseStringBooleanToCheckmark(
                                                selectedPlayer.player.stats.skills.deception
                                                    .proficient,
                                                false
                                            )}
                                        </TableElement>
                                        <TableElement>
                                            {getAbilityModifier(
                                                selectedPlayer.player.stats.charisma.value,
                                                selectedPlayer.player.stats.skills.deception
                                                    .proficient === "TRUE",
                                                selectedPlayer.player.stats.proficiency
                                            )}
                                        </TableElement>
                                        <TableElement>Deception (Cha)</TableElement>
                                    </tr>
                                    <tr>
                                        <TableElement>
                                            {parseStringBooleanToCheckmark(
                                                selectedPlayer.player.stats.skills.history
                                                    .proficient,
                                                false
                                            )}
                                        </TableElement>
                                        <TableElement>
                                            {getAbilityModifier(
                                                selectedPlayer.player.stats.intelligence.value,
                                                selectedPlayer.player.stats.skills.history
                                                    .proficient === "TRUE",
                                                selectedPlayer.player.stats.proficiency
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
                                                selectedPlayer.player.stats.skills.insight
                                                    .proficient,
                                                false
                                            )}
                                        </TableElement>
                                        <TableElement>
                                            {getAbilityModifier(
                                                selectedPlayer.player.stats.wisdom.value,
                                                selectedPlayer.player.stats.skills.insight
                                                    .proficient === "TRUE",
                                                selectedPlayer.player.stats.proficiency
                                            )}
                                        </TableElement>
                                        <TableElement>Insight (Wis)</TableElement>
                                    </tr>
                                    <tr>
                                        <TableElement>
                                            {parseStringBooleanToCheckmark(
                                                selectedPlayer.player.stats.skills.intimidation
                                                    .proficient,
                                                false
                                            )}
                                        </TableElement>
                                        <TableElement>
                                            {getAbilityModifier(
                                                selectedPlayer.player.stats.charisma.value,
                                                selectedPlayer.player.stats.skills.intimidation
                                                    .proficient === "TRUE",
                                                selectedPlayer.player.stats.proficiency
                                            )}
                                        </TableElement>
                                        <TableElement>Intimidation (Cha)</TableElement>
                                    </tr>
                                    <tr>
                                        <TableElement>
                                            {parseStringBooleanToCheckmark(
                                                selectedPlayer.player.stats.skills.investigation
                                                    .proficient,
                                                false
                                            )}
                                        </TableElement>
                                        <TableElement>
                                            {getAbilityModifier(
                                                selectedPlayer.player.stats.intelligence.value,
                                                selectedPlayer.player.stats.skills.investigation
                                                    .proficient === "TRUE",
                                                selectedPlayer.player.stats.proficiency
                                            )}
                                        </TableElement>
                                        <TableElement>Investigation (Int)</TableElement>
                                    </tr>
                                    <tr>
                                        <TableElement>
                                            {parseStringBooleanToCheckmark(
                                                selectedPlayer.player.stats.skills.medicine
                                                    .proficient,
                                                false
                                            )}
                                        </TableElement>
                                        <TableElement>
                                            {getAbilityModifier(
                                                selectedPlayer.player.stats.wisdom.value,
                                                selectedPlayer.player.stats.skills.medicine
                                                    .proficient === "TRUE",
                                                selectedPlayer.player.stats.proficiency
                                            )}
                                        </TableElement>
                                        <TableElement>Medicine (Wis)</TableElement>
                                    </tr>
                                    <tr>
                                        <TableElement>
                                            {parseStringBooleanToCheckmark(
                                                selectedPlayer.player.stats.skills.nature
                                                    .proficient,
                                                false
                                            )}
                                        </TableElement>
                                        <TableElement>
                                            {getAbilityModifier(
                                                selectedPlayer.player.stats.intelligence.value,
                                                selectedPlayer.player.stats.skills.nature
                                                    .proficient === "TRUE",
                                                selectedPlayer.player.stats.proficiency
                                            )}
                                        </TableElement>
                                        <TableElement>Nature (Int)</TableElement>
                                    </tr>
                                    <tr>
                                        <TableElement>
                                            {parseStringBooleanToCheckmark(
                                                selectedPlayer.player.stats.skills.perception
                                                    .proficient,
                                                false
                                            )}
                                        </TableElement>
                                        <TableElement>
                                            {getAbilityModifier(
                                                selectedPlayer.player.stats.wisdom.value,
                                                selectedPlayer.player.stats.skills.perception
                                                    .proficient === "TRUE",
                                                selectedPlayer.player.stats.proficiency
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
                                                selectedPlayer.player.stats.skills.performance
                                                    .proficient,
                                                false
                                            )}
                                        </TableElement>
                                        <TableElement>
                                            {getAbilityModifier(
                                                selectedPlayer.player.stats.charisma.value,
                                                selectedPlayer.player.stats.skills.performance
                                                    .proficient === "TRUE",
                                                selectedPlayer.player.stats.proficiency
                                            )}
                                        </TableElement>
                                        <TableElement>Performance (Cha)</TableElement>
                                    </tr>
                                    <tr>
                                        <TableElement>
                                            {parseStringBooleanToCheckmark(
                                                selectedPlayer.player.stats.skills.persuasion
                                                    .proficient,
                                                false
                                            )}
                                        </TableElement>
                                        <TableElement>
                                            {getAbilityModifier(
                                                selectedPlayer.player.stats.charisma.value,
                                                selectedPlayer.player.stats.skills.persuasion
                                                    .proficient === "TRUE",
                                                selectedPlayer.player.stats.proficiency
                                            )}
                                        </TableElement>
                                        <TableElement>Persuasion (Cha)</TableElement>
                                    </tr>
                                    <tr>
                                        <TableElement>
                                            {parseStringBooleanToCheckmark(
                                                selectedPlayer.player.stats.skills.religion
                                                    .proficient,
                                                false
                                            )}
                                        </TableElement>
                                        <TableElement>
                                            {getAbilityModifier(
                                                selectedPlayer.player.stats.intelligence.value,
                                                selectedPlayer.player.stats.skills.religion
                                                    .proficient === "TRUE",
                                                selectedPlayer.player.stats.proficiency
                                            )}
                                        </TableElement>
                                        <TableElement>Religion (Int)</TableElement>
                                    </tr>
                                    <tr>
                                        <TableElement>
                                            {parseStringBooleanToCheckmark(
                                                selectedPlayer.player.stats.skills.sleightOfHand
                                                    .proficient,
                                                false
                                            )}
                                        </TableElement>
                                        <TableElement>
                                            {getAbilityModifier(
                                                selectedPlayer.player.stats.dexterity.value,
                                                selectedPlayer.player.stats.skills.sleightOfHand
                                                    .proficient === "TRUE",
                                                selectedPlayer.player.stats.proficiency
                                            )}
                                        </TableElement>
                                        <TableElement>Sleight of Hand (Dex)</TableElement>
                                    </tr>
                                    <tr>
                                        <TableElement>
                                            {parseStringBooleanToCheckmark(
                                                selectedPlayer.player.stats.skills.stealth
                                                    .proficient,
                                                false
                                            )}
                                        </TableElement>
                                        <TableElement>
                                            {getAbilityModifier(
                                                selectedPlayer.player.stats.dexterity.value,
                                                selectedPlayer.player.stats.skills.stealth
                                                    .proficient === "TRUE",
                                                selectedPlayer.player.stats.proficiency
                                            )}
                                        </TableElement>
                                        <TableElement>Stealth (Dex)</TableElement>
                                    </tr>
                                    <tr>
                                        <TableElement>
                                            {parseStringBooleanToCheckmark(
                                                selectedPlayer.player.stats.skills.survival
                                                    .proficient,
                                                false
                                            )}
                                        </TableElement>
                                        <TableElement>
                                            {getAbilityModifier(
                                                selectedPlayer.player.stats.wisdom.value,
                                                selectedPlayer.player.stats.skills.survival
                                                    .proficient === "TRUE",
                                                selectedPlayer.player.stats.proficiency
                                            )}
                                        </TableElement>
                                        <TableElement>Survival (Wis)</TableElement>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </div>

                </div>
                {selectedPlayer.player.actions ?
                    <NestedContainer style={{ width: "100%" }} >
                        <h3>
                            Actions and Specials:
                    </h3>
                        {selectedPlayer.player.actions.map((action: IMonsterAction, index: number) => <div key={index}><b >{action.name}:</b> {action.description}</div>)}
                    </NestedContainer>

                    : null}
                <NestedContainer style={{ width: "100%" }} >
                    <h3>Description and history: </h3>
                    <DraftJSEditor readOnly={true} JSONRef={storageRef?.child("PlayerDescription.json")} isDungeonMaster={isDungeonMaster} />

                </NestedContainer>

            </>
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
export default CampaignPlayer;
