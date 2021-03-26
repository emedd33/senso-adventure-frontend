import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import {
    isDungeonMasterSelector,
    getSelectedPlayerStoragePath,
    getSelectedPlayer,
} from "../../../../store/selected/selectedSelectors";
import styled from "styled-components";
import { OLD_WHITE } from "../../../../assets/constants/Constants";
import IsLoading from "../../../../components/IsLoading/IsLoading";
import getAbilityModifier from "../../../../utils/getAbilityModifier";
import parseValuesToString from "../../../../utils/parseValuesToString";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import renderArrayOfString from "../../../../utils/renderArrayToString";
import DraftJSEditor from "../../../../components/DraftJSEditor/DraftJSEditor";
import {SensoDescription} from "../../../../components/SensoContainers";
import { useTranslation } from "react-i18next";
type PlayerProps = {};
const Player: FunctionComponent<PlayerProps> = () => {
    const history = useHistory();
    const selectedPlayer = useSelector(getSelectedPlayer);
    const isDungeonMaster = useSelector(isDungeonMasterSelector);
    const playerPath = useSelector(getSelectedPlayerStoragePath);
    const translate = useTranslation()
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
            <div style={{width:"100%" }}>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                    }}
                >
                                        <h1 style={{ marginBottom: "0" }}>
                                            {selectedPlayer.player.name}
                                            {selectedPlayer.player.isPublished === "FALSE"
                                                ? `(${translate.t('Not published')})`
                                                : null}
                                        </h1>
                    <div style={{ display: "flex", justifyContent: "flex-end", }}>
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
                                        style={{ maxHeight: "2rem", maxWidth: "3rem", textTransform:"none" }}
                                    >
                                        {translate.t('Edit')}
                                    </Button>
                                </NestedContainer>
                            </>
                        ) :null}
                    </div>

                    <div style={{ gridColumn: "1/3" }}>
                        <b> </b>{selectedPlayer.player.nickNames ? <>{translate.t('Also known as')}: {renderArrayOfString(selectedPlayer.player.nickNames)}</> : null}
                    </div>
                    <h3 style={{ gridColumn: "1/3"  }}>
                        {`${translate.t('Played by')}: ${selectedPlayer.player.playerName}`}
                    </h3>

                    {isDungeonMaster ?
                        <div >
                            {` ${selectedPlayer.player.race}`}
                            {selectedPlayer.player.class ? `, ${selectedPlayer.player.class}` : null}
                            {`, ${selectedPlayer.player.alignment}`}
                        </div>
                        : null}
                    {isDungeonMaster ?
                        <div style={{ gridColumn: "1/3" }}>
                            {translate.t('Level')}: {`${parseValuesToString(
                                selectedPlayer.player.level
                            )}`}

                        </div>
                        : null}

                </div>
            </div>
            <SensoDescription content={selectedPlayer.player.description}/>
            <>
                <NestedContainer>
                    <NestedNestedContainer>
                        <div>
                            <b>{translate.t('Armor class')}: </b>{" "}
                        </div>
                        <div style={{ paddingLeft: "0.3rem" }}>
                            {selectedPlayer.player.stats.armorClass}
                        </div>
                    </NestedNestedContainer>
                    <NestedNestedContainer>
                        <div>
                            <b>{translate.t('Proficiency')}: </b>
                        </div>
                        <div style={{ paddingLeft: "0.3rem" }}>
                            {selectedPlayer.player.stats.proficiency}
                        </div>
                    </NestedNestedContainer>
                    <NestedNestedContainer>
                        <div>
                            <b>Hp: </b>
                        </div>
                        <div style={{ paddingLeft: "0.3rem" }}>
                            {selectedPlayer.player.stats.hitPoints}
                        </div>
                    </NestedNestedContainer>
                </NestedContainer>

                <NestedContainer>
                    <NestedNestedContainer>
                        <div>
                            <b>{translate.t('Passive Perception')}: </b>{" "}
                        </div>
                        <div style={{ paddingLeft: "0.3rem" }}>
                            {selectedPlayer.player.stats.passivePerception}
                        </div>
                    </NestedNestedContainer>

                    <NestedNestedContainer>
                        <div>
                            <b>{translate.t('Inspiration')}: </b>
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
                            <b>{translate.t('Speed')}: </b>{" "}
                        </div>
                        <div style={{ paddingLeft: "0.3rem" }}>
                            {selectedPlayer.player.stats.speed}'
                            </div>
                    </NestedNestedContainer>
                    <NestedNestedContainer>
                        <div>
                            <b>{translate.t('Senses')}: </b>{" "}
                        </div>
                        <div style={{ paddingLeft: "0.3rem" }}>
                            {renderArrayOfString(selectedPlayer.player.senses)}
                        </div>
                    </NestedNestedContainer>
                    <NestedNestedContainer>
                        <div>
                            <b>{translate.t('Immunities')} : </b>
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
                        <b style={{ paddingRight: "0.3rem", fontSize: "1.4rem" }}>{translate.t('STR')}</b>
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
                {translate.t('Saving')}:
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
                        <b style={{ paddingRight: "0.3rem", fontSize: "1.4rem" }}>{translate.t('Dex')}</b>
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
                {translate.t('Saving')}:
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
                        <b style={{ paddingRight: "0.3rem", fontSize: "1.4rem" }}>{translate.t('Con')}</b>
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
                {translate.t('Saving')}:
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
                        <b style={{ paddingRight: "0.3rem", fontSize: "1.4rem" }}>{translate.t('Int')}</b>
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
                {translate.t('Saving')}:
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
                        <b style={{ paddingRight: "0.3rem", fontSize: "1.4rem" }}>{translate.t('Wis')}</b>
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
                {translate.t('Saving')}:
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
                        <b style={{ paddingRight: "0.3rem", fontSize: "1.4rem" }}>{translate.t('Cha')}</b>
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
                {translate.t('Saving')}:
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
                                        <TableHeader>{translate.t('Proficiency')}</TableHeader>
                                        <TableHeader>{translate.t('Modifier')}</TableHeader>
                                        <TableHeader>{translate.t('Skill')}</TableHeader>
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
                                        <TableElement>{translate.t('Acrobatics')} ({translate.t('Dex')})</TableElement>
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
                                        <TableElement>{translate.t('Animal handling')} ({translate.t('Dex')})</TableElement>
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
                                        <TableElement>{translate.t('Arcana')} ({translate.t('Int')})</TableElement>
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
                                        <TableElement>{translate.t('Athletics')} ({translate.t('Str')})</TableElement>
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
                                        <TableElement>{translate.t('Deception')} ({translate.t('Cha')})</TableElement>
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
                                        <TableElement>{translate.t('History')} ({translate.t('Int')})</TableElement>
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
                                          <TableHeader>{translate.t('Proficiency')}</TableHeader>
                                        <TableHeader>{translate.t('Modifier')}</TableHeader>
                                        <TableHeader>{translate.t('Skill')}</TableHeader>
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
                                        <TableElement>{translate.t('Insight')} ({translate.t('Wis')})</TableElement>
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
                                        <TableElement>{translate.t('Intimidation')} ({translate.t('Cha')})</TableElement>
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
                                        <TableElement>{translate.t('Medicine')} ({translate.t('Wis')})</TableElement>
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
                                        <TableElement>{translate.t('Nature')} ({translate.t('Int')})</TableElement>
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
                                        <TableElement>{translate.t('Perception')} ({translate.t('Wis')})</TableElement>
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
                                          <TableHeader>{translate.t('Proficiency')}</TableHeader>
                                        <TableHeader>{translate.t('Modifier')}</TableHeader>
                                        <TableHeader>{translate.t('Skill')}</TableHeader>
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
                                        <TableElement>{translate.t('Performance')} ({translate.t('Cha')})</TableElement>
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
                                        <TableElement>{translate.t('Persuasion')} ({translate.t('Cha')})</TableElement>
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
                                        <TableElement>{translate.t('Religion')} ({translate.t('Int')})</TableElement>
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
                                        <TableElement>{translate.t('Sleight of hand')} ({translate.t('Dex')})</TableElement>
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
                                        <TableElement>{translate.t('Stealth')} ({translate.t('Dex')})</TableElement>
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
                                        <TableElement>{translate.t('Survival')} ({translate.t('Wis')})</TableElement>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </div>

                </div>
                {selectedPlayer.player.actions ?
                    <NestedContainer style={{ width: "100%" }} >
                        <h3>
                            {translate.t('Actions and specials')}:
                    </h3>
                        {selectedPlayer.player.actions.map((action: IAction, index: number) => <div key={index}><b >{action.name}:</b> {action.description}</div>)}
                    </NestedContainer>

                    : null}
                <NestedContainer style={{ width: "100%" }} >
                    <h3>{translate.t('Lore')}: </h3>
                    <DraftJSEditor readOnly={true} storagePath={`${playerPath}/playerDescription.json`} isDungeonMaster={isDungeonMaster} />

                </NestedContainer>

            </>
        </Container >
    )
};
const Container = styled.div`
  width: 90%;
  padding: 1rem;
  z-index:100;
  -webkit-box-shadow: 5px 5px 15px 5px #000000;
  box-shadow: 5px 0px 15px 2px #000000;
  background-color: ${OLD_WHITE};
  display: flex;
  justify-content: space-between;
  align-center: center;
  flex-wrap: wrap;
  min-height: 20rem;
  min-width:20rem;
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
export default Player;
