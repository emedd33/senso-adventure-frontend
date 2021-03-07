import React, {
    FunctionComponent,
    useCallback,
    useEffect,
    useState,
} from "react";
import { useSelector } from "react-redux";
import {
    getSelectedCampaignCharacterMentionList,
    getSelectedCharacter,
    getSelectedCharacterDatabaseRef,
    getSelectedCharacterIsPlayer,
    getSelectedCharacterStorageRef,
} from "../../store/selected/selectedSelectors";
import styled from "styled-components";
import { OLD_WHITE, OLD_WHITE_DARK } from "../../assets/constants/Constants";
import IsLoading from "../../components/IsLoading/IsLoading";
import getAbilityModifier from "../../utils/getAbilityModifier";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DeleteIcon from "@material-ui/icons/Delete";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Chip,
    IconButton,
    Switch,
    TextField,
    Typography,
} from "@material-ui/core";
import useInterval from "../../store/hooks/useInterval";
import useSavedState from "../../store/hooks/useSavedState";
import onChangeNumberField from "../../utils/onChangeNumberField";
import DraftJSEditor from "../../components/DraftJSEditor/DraftJSEditor";
type CampaignProps = {};
const CampaignCharacterEdit: FunctionComponent<CampaignProps> = () => {
    const selectedCharacter: ISelectedCharacter | undefined = useSelector(
        getSelectedCharacter
    );
    const characterRef = useSelector(getSelectedCharacterDatabaseRef);
    const storageRef = useSelector(getSelectedCharacterStorageRef);
    const isPlayer = useSelector(getSelectedCharacterIsPlayer);
    const [race, setRace, saveRace, isSavedRace] = useSavedState(
        selectedCharacter?.character.race
    );
    const [
        isPublished,
        setIsPublished,
        saveIsPublished,
        isSavedIsPublished,
    ] = useSavedState(selectedCharacter?.character.isPublished === "TRUE");
    const [
        characterClass,
        setCharacterClass,
        saveCharacterClass,
        isSavedCharacterClass,
    ] = useSavedState(selectedCharacter?.character.class);
    const [
        alignment,
        setAlignment,
        saveAlignment,
        isSavedAlignment,
    ] = useSavedState(selectedCharacter?.character.alignment);
    const [
        challengeRating,
        setChallengeRating,
        saveChallengeRating,
        isSavedChallengeRating,
    ] = useSavedState(selectedCharacter?.character.challengeRating);
    const [level, setLevel, saveLevel, isSavedLevel] = useSavedState(
        selectedCharacter?.character.level
    );
    const [summary, setSummary, saveSummary, isSavedSummary] = useSavedState(
        selectedCharacter?.character.summary
    );
    const [summaryError, setSummaryError] = useState(false);
    const [
        armorClass,
        setArmorClass,
        saveArmorClass,
        isSavedArmorClass,
    ] = useSavedState(selectedCharacter?.character.stats.armorClass);
    const [
        hitPoints,
        setHitPoints,
        saveHitPoints,
        isSavedHitPoints,
    ] = useSavedState(selectedCharacter?.character.stats.hitPoints);
    const [
        passivePerception,
        setPassivePerception,
        savePassivePerception,
        isSavedPassivePerception,
    ] = useSavedState(selectedCharacter?.character.stats.passivePerception);
    const [
        proficiency,
        setProficiency,
        saveProficiency,
        isSavedProficiency,
    ] = useSavedState(selectedCharacter?.character.stats.proficiency);
    const [
        inspiration,
        setInspiration,
        saveInspiration,
        isSavedInspiration,
    ] = useSavedState(selectedCharacter?.character.stats.inspiration === "TRUE");
    const [nickNames, setNickNames, saveNickNames, isSavedNickNames] = useSavedState(
        selectedCharacter?.character.nickNames
            ? selectedCharacter?.character.nickNames
            : []
    );
    const [newNickName, setNewNickName] = useState("");
    const [senses, setSenses, saveSenses, isSavedSenses] = useSavedState(
        selectedCharacter?.character.senses
            ? selectedCharacter?.character.senses
            : []
    );
    const [newSens, setNewSens] = useState("");
    const [
        immunities,
        setImmunities,
        saveImmunities,
        isSavedImmunities,
    ] = useSavedState(
        selectedCharacter?.character.immunities
            ? selectedCharacter?.character.immunities
            : []
    );
    const [newImmunity, setNewImmunity] = useState("");
    const [isUnique, setIsUnique, saveIsUnique, isSavedIsUnique] = useSavedState(
        selectedCharacter?.character.isUnique === "TRUE"
    );
    const [strength, setStrength, saveStrength, isSavedStrength] = useSavedState(
        selectedCharacter?.character.stats.strength.value
    );
    const [
        isStrengthProficient,
        setIsStrengthProficient,
        saveIsStrengthProficient,
        isSavedIsStrengthProficient,
    ] = useSavedState(
        selectedCharacter?.character.stats.strength.isProficient === "TRUE"
    );
    const [
        dexterity,
        setDexterity,
        saveDexterity,
        isSavedDexterity,
    ] = useSavedState(selectedCharacter?.character.stats.dexterity.value);
    const [
        isDexterityProficient,
        setIsDexterityProficient,
        saveIsDexterityProficient,
        isSavedIsDexterityProficient,
    ] = useSavedState(
        selectedCharacter?.character.stats.dexterity.isProficient === "TRUE"
    );
    const [
        constitution,
        setConstitution,
        saveConstitution,
        isSavedConstitution,
    ] = useSavedState(selectedCharacter?.character.stats.constitution.value);
    const [
        isConstitutionProficient,
        setIsConstitutionProficient,
        saveIsConstitutionProficient,
        isSavedIsConstitutionProficient,
    ] = useSavedState(
        selectedCharacter?.character.stats.constitution.isProficient === "TRUE"
    );
    const [wisdom, setWisdom, saveWisdom, isSavedWisdom] = useSavedState(
        selectedCharacter?.character.stats.wisdom.value
    );
    const [
        isWisdomProficient,
        setIsWisdomProficient,
        saveIsWisdomProficient,
        isSavedIsWisdomProficient,
    ] = useSavedState(
        selectedCharacter?.character.stats.wisdom.isProficient === "TRUE"
    );
    const [
        intelligence,
        setIntelligence,
        saveIntelligence,
        isSavedIntelligence,
    ] = useSavedState(selectedCharacter?.character.stats.intelligence.value);
    const [
        isIntelligenceProficient,
        setIsIntelligenceProficient,
        saveIsIntelligenceProficient,
        isSavedIsIntelligenceProficient,
    ] = useSavedState(
        selectedCharacter?.character.stats.intelligence.isProficient === "TRUE"
    );
    const [charisma, setCharisma, saveCharisma, isSavedCharisma] = useSavedState(
        selectedCharacter?.character.stats.charisma.value
    );
    const [
        isCharismaProficient,
        setIsCharismaProficient,
        saveIsCharismaProficient,
        isSavedIsCharismaProficient,
    ] = useSavedState(
        selectedCharacter?.character.stats.charisma.isProficient === "TRUE"
    );
    const [
        isAcrobaticsProficient,
        setIsAcrobaticsProficient,
        saveIsAcrobaticsProficient,
        isSavedIsAcrobaticsProficient,
    ] = useSavedState(
        selectedCharacter?.character.stats.skills.acrobatics.proficient === "TRUE"
    );
    const [
        isAnimalHandlingProficient,
        setIsAnimalHandlingProficient,
        saveIsAnimalHandlingProficient,
        isSavedIsAnimalHandlingProficient,
    ] = useSavedState(
        selectedCharacter?.character.stats.skills.animalHandling.proficient ===
        "TRUE"
    );
    const [
        isArcanaProficient,
        setIsArcanaProficient,
        saveIsArcanaProficient,
        isSavedIsArcanaProficient,
    ] = useSavedState(
        selectedCharacter?.character.stats.skills.arcana.proficient === "TRUE"
    );
    const [
        isAthleticsProficient,
        setIsAthleticsProficient,
        saveIsAthleticsProficient,
        isSavedIsAthleticsProficient,
    ] = useSavedState(
        selectedCharacter?.character.stats.skills.athletics.proficient === "TRUE"
    );
    const [
        isDeceptionProficient,
        setIsDeceptionProficient,
        saveIsDeceptionProficient,
        isSavedIsDeceptionProficient,
    ] = useSavedState(
        selectedCharacter?.character.stats.skills.deception.proficient === "TRUE"
    );
    const [
        isHistoryProficient,
        setIsHistoryProficient,
        saveIsHistoryProficient,
        isSavedIsHistoryProficient,
    ] = useSavedState(
        selectedCharacter?.character.stats.skills.history.proficient === "TRUE"
    );
    const [
        isInsightProficient,
        setIsInsightProficient,
        saveIsInsightProficient,
        isSavedIsInsightProficient,
    ] = useSavedState(
        selectedCharacter?.character.stats.skills.insight.proficient === "TRUE"
    );
    const [
        isIntimidationProficient,
        setIsIntimidationProficient,
        saveIsIntimidationProficient,
        isSavedIsIntimidationProficient,
    ] = useSavedState(
        selectedCharacter?.character.stats.skills.intimidation.proficient === "TRUE"
    );
    const [
        isInvestigationProficient,
        setIsInvestigationProficient,
        saveIsInvestigationProficient,
        isSavedIsInvestigationProficient,
    ] = useSavedState(
        selectedCharacter?.character.stats.skills.investigation.proficient ===
        "TRUE"
    );
    const [
        isMedicineProficient,
        setIsMedicineProficient,
        saveIsMedicineProficient,
        isSavedIsMedicineProficient,
    ] = useSavedState(
        selectedCharacter?.character.stats.skills.medicine.proficient === "TRUE"
    );
    const [
        isNatureProficient,
        setIsNatureProficient,
        saveIsNatureProficient,
        isSavedIsNatureProficient,
    ] = useSavedState(
        selectedCharacter?.character.stats.skills.nature.proficient === "TRUE"
    );
    const [
        isPerceptionProficient,
        setIsPerceptionProficient,
        saveIsPerceptionProficient,
        isSavedIsPerceptionProficient,
    ] = useSavedState(
        selectedCharacter?.character.stats.skills.perception.proficient === "TRUE"
    );
    const [
        isPerformanceProficient,
        setIsPerformanceProficient,
        saveIsPerformanceProficient,
        isSavedIsPerformanceProficient,
    ] = useSavedState(
        selectedCharacter?.character.stats.skills.performance.proficient === "TRUE"
    );
    const [
        isPersuasionProficient,
        setIsPersuasionProficient,
        saveIsPersuasionProficient,
        isSavedIsPersuasionProficient,
    ] = useSavedState(
        selectedCharacter?.character.stats.skills.persuasion.proficient === "TRUE"
    );
    const [
        isReligionProficient,
        setIsReligionProficient,
        saveIsReligionProficient,
        isSavedIsReligionProficient,
    ] = useSavedState(
        selectedCharacter?.character.stats.skills.religion.proficient === "TRUE"
    );
    const [
        isSleightOfHandProficient,
        setIsSleightOfHandProficient,
        saveIsSleightOfHandProficient,
        isSavedIsSleightOfHandProficient,
    ] = useSavedState(
        selectedCharacter?.character.stats.skills.sleightOfHand.proficient ===
        "TRUE"
    );
    const [
        isStealthProficient,
        setIsStealthProficient,
        saveIsStealthProficient,
        isSavedIsStealthProficient,
    ] = useSavedState(
        selectedCharacter?.character.stats.skills.stealth.proficient === "TRUE"
    );
    const [
        isSurvivalProficient,
        setIsSurvivalProficient,
        saveIsSurvivalProficient,
        isSavedIsSurvivalProficient,
    ] = useSavedState(
        selectedCharacter?.character.stats.skills.survival.proficient === "TRUE"
    );
    const [actions, setActions, saveActions, isSavedActions] = useSavedState(
        selectedCharacter?.character.actions
    );
    const [newActionName, setNewActionName] = useState("");
    const characerMentionList = useSelector(getSelectedCampaignCharacterMentionList)
    const renderAccordian = useCallback(
        (actions) =>
            actions.map((action: ICharacterAction, index: number) => {
                return (
                    <Accordion style={{ width: "100%", backgroundColor: "transparent" }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>{action.name}</Typography>
                        </AccordionSummary>
                        <AccordionDetails
                            style={{
                                display: "grid",
                                gridTemplateColumns: "4fr 1fr",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <TextField
                                label="Action description"
                                multiline
                                style={{ backgroundColor: OLD_WHITE_DARK }}
                                rows={4}
                                value={action.description}
                                onChange={(event) => {
                                    if (event.target.value.length < 400) {
                                        setActions((existingActions: ICharacterAction[]) => {
                                            existingActions[index].description = event.target.value;
                                            return [...existingActions];
                                        });
                                    }
                                }}
                                defaultValue="Default Value"
                                variant="filled"
                            />
                            <IconButton>
                                <DeleteIcon
                                    onClick={() =>
                                        setActions((existingActions: ICharacterAction[]) =>
                                            existingActions.filter(
                                                (existingAction: ICharacterAction) =>
                                                    existingAction.name !== action.name
                                            )
                                        )
                                    }
                                    color="secondary"
                                />
                            </IconButton>
                        </AccordionDetails>
                    </Accordion>
                );
            }),
        [setActions]
    );
    useInterval(() => {
        if (characterRef) {
            if (!isSavedNickNames) {
                saveNickNames();
                characterRef.child("nickNames").set(nickNames);
            }
            if (!isSavedRace) {
                saveRace();
                characterRef.child("race").set(race);
            }
            if (!isSavedIsPublished) {
                saveIsPublished();
                characterRef.child("isPublished").set(isPublished ? "TRUE" : "FALSE");
            }
            if (!isSavedCharacterClass) {
                saveCharacterClass();
                characterRef.child("class").set(characterClass);
            }
            if (!isSavedAlignment) {
                saveAlignment();
                characterRef.child("alignment").set(alignment);
            }
            if (!isSavedChallengeRating) {
                saveChallengeRating();
                characterRef.child("challengeRating").set(challengeRating);
            }
            if (!isSavedLevel) {
                saveLevel();
                characterRef.child("level").set(level);
            }
            if (!isSavedSummary) {
                saveSummary();
                characterRef.child("summary").set(summary);
            }
            if (!isSavedArmorClass) {
                saveArmorClass();
                characterRef.child("stats").child("armorClass").set(armorClass);
            }
            if (!isSavedHitPoints) {
                saveHitPoints();
                characterRef.child("stats").child("hitPoints").set(hitPoints);
            }
            if (!isSavedPassivePerception) {
                savePassivePerception();
                characterRef
                    .child("stats")
                    .child("passivePerception")
                    .set(passivePerception);
            }
            if (!isSavedProficiency) {
                saveProficiency();
                characterRef.child("stats").child("proficiency").set(proficiency);
            }
            if (!isSavedInspiration) {
                saveInspiration();
                characterRef
                    .child("stats")
                    .child("inspiration")
                    .set(inspiration ? "TRUE" : "FALSE");
            }
            if (!isSavedSenses) {
                saveSenses();
                characterRef.child("senses").set(senses);
            }
            if (!isSavedImmunities) {
                saveImmunities();
                characterRef.child("immunities").set(immunities);
            }
            if (!isSavedIsUnique) {
                saveIsUnique();
                characterRef.child("isUnique").set(isUnique ? "TRUE" : "FALSE");
            }
            if (!isSavedStrength) {
                saveStrength();
                characterRef
                    .child("stats")
                    .child("strength")
                    .child("value")
                    .set(strength);
            }
            if (!isSavedIsStrengthProficient) {
                saveIsStrengthProficient();
                characterRef
                    .child("stats")
                    .child("strength")
                    .child("isProficient")
                    .set(isStrengthProficient ? "TRUE" : "FALSE");
            }
            if (!isSavedDexterity) {
                saveDexterity();
                characterRef
                    .child("stats")
                    .child("dexterity")
                    .child("value")
                    .set(dexterity);
            }
            if (!isSavedIsDexterityProficient) {
                saveIsDexterityProficient();
                characterRef
                    .child("stats")
                    .child("dexterity")
                    .child("isProficient")
                    .set(isDexterityProficient ? "TRUE" : "FALSE");
            }
            if (!isSavedConstitution) {
                saveConstitution();
                characterRef
                    .child("stats")
                    .child("constitution")
                    .child("value")
                    .set(constitution);
            }
            if (!isSavedIsConstitutionProficient) {
                saveIsConstitutionProficient();
                characterRef
                    .child("stats")
                    .child("constitution")
                    .child("isProficient")
                    .set(isConstitutionProficient ? "TRUE" : "FALSE");
            }
            if (!isSavedWisdom) {
                saveWisdom();
                characterRef.child("stats").child("wisdom").child("value").set(wisdom);
            }
            if (!isSavedIsWisdomProficient) {
                saveIsWisdomProficient();
                characterRef
                    .child("stats")
                    .child("wisdom")
                    .child("isProficient")
                    .set(isWisdomProficient ? "TRUE" : "FALSE");
            }
            if (!isSavedIntelligence) {
                saveIntelligence();
                characterRef
                    .child("stats")
                    .child("intelligence")
                    .child("value")
                    .set(intelligence);
            }
            if (!isSavedIsIntelligenceProficient) {
                saveIsIntelligenceProficient();
                characterRef
                    .child("stats")
                    .child("intelligence")
                    .child("isProficient")
                    .set(isIntelligenceProficient ? "TRUE" : "FALSE");
            }
            if (!isSavedCharisma) {
                saveCharisma();
                characterRef
                    .child("stats")
                    .child("charisma")
                    .child("value")
                    .set(charisma);
            }
            if (!isSavedIsCharismaProficient) {
                saveIsCharismaProficient();
                characterRef
                    .child("stats")
                    .child("charisma")
                    .child("isProficient")
                    .set(isCharismaProficient ? "TRUE" : "FALSE");
            }

            if (!isSavedIsAcrobaticsProficient) {
                saveIsAcrobaticsProficient();
                characterRef
                    .child("stats")
                    .child("skills")
                    .child("acrobatics")
                    .child("proficient")
                    .set(isAcrobaticsProficient ? "TRUE" : "FALSE");
            }
            if (!isSavedIsAnimalHandlingProficient) {
                saveIsAnimalHandlingProficient();
                characterRef
                    .child("stats")
                    .child("animalHandling")
                    .child("isProficient")
                    .set(isAnimalHandlingProficient ? "TRUE" : "FALSE");
            }
            if (!isSavedIsArcanaProficient) {
                saveIsArcanaProficient();
                characterRef
                    .child("stats")
                    .child("arcana")
                    .child("isProficient")
                    .set(isArcanaProficient ? "TRUE" : "FALSE");
            }
            if (!isSavedIsAthleticsProficient) {
                saveIsAthleticsProficient();
                characterRef
                    .child("stats")
                    .child("athletics")
                    .child("isProficient")
                    .set(isAthleticsProficient ? "TRUE" : "FALSE");
            }
            if (!isSavedIsDeceptionProficient) {
                saveIsDeceptionProficient();
                characterRef
                    .child("stats")
                    .child("deception")
                    .child("isProficient")
                    .set(isDeceptionProficient ? "TRUE" : "FALSE");
            }
            if (!isSavedIsHistoryProficient) {
                saveIsHistoryProficient();
                characterRef
                    .child("stats")
                    .child("history")
                    .child("isProficient")
                    .set(isHistoryProficient ? "TRUE" : "FALSE");
            }
            if (!isSavedIsInsightProficient) {
                saveIsInsightProficient();
                characterRef
                    .child("stats")
                    .child("insight")
                    .child("isProficient")
                    .set(isInsightProficient ? "TRUE" : "FALSE");
            }
            if (!isSavedIsIntimidationProficient) {
                saveIsIntimidationProficient();
                characterRef
                    .child("stats")
                    .child("intimidation")
                    .child("isProficient")
                    .set(isIntimidationProficient ? "TRUE" : "FALSE");
            }
            if (!isSavedIsInvestigationProficient) {
                saveIsInvestigationProficient();
                characterRef
                    .child("stats")
                    .child("investigation")
                    .child("isProficient")
                    .set(isInvestigationProficient ? "TRUE" : "FALSE");
            }
            if (!isSavedIsMedicineProficient) {
                saveIsMedicineProficient();
                characterRef
                    .child("stats")
                    .child("medicine")
                    .child("isProficient")
                    .set(isMedicineProficient ? "TRUE" : "FALSE");
            }
            if (!isSavedIsNatureProficient) {
                saveIsNatureProficient();
                characterRef
                    .child("stats")
                    .child("nature")
                    .child("isProficient")
                    .set(isNatureProficient ? "TRUE" : "FALSE");
            }
            if (!isSavedIsPerceptionProficient) {
                saveIsPerceptionProficient();
                characterRef
                    .child("stats")
                    .child("perception")
                    .child("isProficient")
                    .set(isPerceptionProficient ? "TRUE" : "FALSE");
            }
            if (!isSavedIsPerformanceProficient) {
                saveIsPerformanceProficient();
                characterRef
                    .child("stats")
                    .child("performance")
                    .child("isProficient")
                    .set(isPerformanceProficient ? "TRUE" : "FALSE");
            }
            if (!isSavedIsPersuasionProficient) {
                saveIsPersuasionProficient();
                characterRef
                    .child("stats")
                    .child("persuasion")
                    .child("isProficient")
                    .set(isPersuasionProficient ? "TRUE" : "FALSE");
            }
            if (!isSavedIsReligionProficient) {
                saveIsReligionProficient();
                characterRef
                    .child("stats")
                    .child("religion")
                    .child("isProficient")
                    .set(isReligionProficient ? "TRUE" : "FALSE");
            }
            if (!isSavedIsSleightOfHandProficient) {
                saveIsSleightOfHandProficient();
                characterRef
                    .child("stats")
                    .child("sleightOfHand")
                    .child("isProficient")
                    .set(isSleightOfHandProficient ? "TRUE" : "FALSE");
            }
            if (!isSavedIsStealthProficient) {
                saveIsStealthProficient();
                characterRef
                    .child("stats")
                    .child("stealth")
                    .child("isProficient")
                    .set(isStealthProficient ? "TRUE" : "FALSE");
            }
            if (!isSavedIsSurvivalProficient) {
                saveIsSurvivalProficient();
                characterRef
                    .child("stats")
                    .child("survival")
                    .child("isProficient")
                    .set(isSurvivalProficient ? "TRUE" : "FALSE");
            }
            if (!isSavedActions) {
                saveActions();
                characterRef.child("actions").set(actions);
            }
        }
    }, 3000);

    useEffect(() => {
        let modifier = getAbilityModifier(wisdom, false, 0, true);
        if (typeof modifier === "number") {
            setPassivePerception(modifier + 10);
        }
    }, [wisdom, setPassivePerception]);
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
                <div style={{ display: "grid", width: "100%" }}>
                    <h1 style={{ marginBottom: "0" }}>
                        {selectedCharacter.character.name}
                    </h1>
                </div>
                <b>Also known as:</b>
                {nickNames
                    ? nickNames.map((nickName: string) => (
                        <Chip
                            style={{ marginLeft: "0.2rem", backgroundColor: OLD_WHITE_DARK, maxWidth: "10rem" }}
                            label={nickName}
                            onDelete={() =>
                                setNickNames((existingNickNames: string[]) =>
                                    existingNickNames.filter(
                                        (existingNickName: string) => existingNickName !== nickName
                                    )
                                )
                            }
                            variant="outlined"
                        />
                    ))
                    : null}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        marginLeft: "1rem",
                        alignItems: "center",
                        margin: "0.3rem",
                    }}
                >
                    <TextField
                        onKeyDown={(event) => {

                            if (newNickName && event.key === "Enter") {
                                setNickNames((existingNickNames: string[]) => [
                                    ...existingNickNames,
                                    newNickName,
                                ])
                                setNewNickName("")
                            }
                        }
                        }
                        style={{ marginTop: "0.5rem", marginRight: "0.5rem", backgroundColor: OLD_WHITE_DARK }}
                        variant="outlined"
                        onChange={(event) => setNewNickName(event.target.value)}
                        label="Nick Name"
                        value={newNickName}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        style={{ height: "2rem" }}
                        onClick={() =>
                            newNickName
                                ? setNickNames((existingNickNames: string[]) => [
                                    ...existingNickNames,
                                    newNickName,
                                ])
                                : null
                        }
                    >
                        Add
            </Button>
                </div>
                <div
                    style={{
                        display: "flex",
                        width: "50%",
                        flexDirection: "row",
                        height: "5rem",
                        justifyContent: "flex-start",
                        alignItems: "center",
                    }}
                >
                    <h3 style={{ margin: "0" }}>Publish:</h3>
                    <Switch
                        checked={isPublished}
                        onChange={(event) => {
                            setIsPublished(event.target.checked);
                        }}
                        color="primary"
                        name="checkedB"
                        inputProps={{ "aria-label": "primary checkbox" }}
                    />
                </div>
                <NestedNestedContainer>
                    <div style={{ marginLeft: "0.5rem" }}>
                        <TextField
                            variant="outlined"
                            label="Race"
                            style={{ backgroundColor: OLD_WHITE_DARK }}
                            value={race}
                            onChange={(event) => {
                                setRace(event.target.value);
                            }}
                        />
                    </div>

                    <div style={{ marginLeft: "0.5rem" }}>
                        <TextField
                            variant="outlined"
                            label="Class"
                            style={{ backgroundColor: OLD_WHITE_DARK }}
                            value={characterClass ? characterClass : ""}
                            onChange={(event) => setCharacterClass(event.target.value)}
                        />
                    </div>
                    <div style={{ marginLeft: "0.5rem" }}>
                        <TextField
                            variant="outlined"
                            label="Alignment"
                            value={alignment}
                            style={{ backgroundColor: OLD_WHITE_DARK }}
                            onChange={(event) => setAlignment(event.target.value)}
                        />
                    </div>
                    <div style={{ marginLeft: "0.5rem" }}>
                        {isPlayer ? (
                            <TextField
                                label="Level"
                                type="number"
                                style={{ backgroundColor: OLD_WHITE_DARK }}
                                variant="outlined"
                                InputLabelProps={{ shrink: true }}
                                value={level}
                                onChange={(event) =>
                                    onChangeNumberField(event.target.value, setLevel, true, false)
                                }
                            />
                        ) : (
                            <TextField
                                variant="outlined"
                                label="Challenge Rating"
                                value={challengeRating}
                                style={{ backgroundColor: OLD_WHITE_DARK }}
                                onChange={(event) => setChallengeRating(event.target.value)}
                            />
                        )}
                    </div>
                </NestedNestedContainer>
            </NestedContainer>
            <NestedContainer
                style={{ width: "100%", marginTop: "1rem", marginBottom: "1rem" }}
            >
                <TextField
                    label="Apperence"
                    multiline
                    rows={4}
                    style={{ backgroundColor: OLD_WHITE_DARK }}
                    value={summary}
                    error={summaryError}
                    onChange={(event) => {
                        if (event.target.value.length > 400) {
                            setSummaryError(true);
                        } else {
                            setSummaryError(false);
                            setSummary(event.target.value);
                        }
                    }}
                    defaultValue="Default Value"
                    variant="filled"
                />
            </NestedContainer>
            <div>
                <NestedNestedContainer>
                    <div >
                        <TextField
                            label="Armor Class"
                            type="number"
                            variant="outlined"
                            style={{ backgroundColor: OLD_WHITE_DARK }}
                            InputLabelProps={{ shrink: true }}
                            value={armorClass}
                            onChange={(event) =>
                                onChangeNumberField(
                                    event.target.value,
                                    setArmorClass,
                                    true,
                                    false
                                )
                            }
                        />
                    </div>
                </NestedNestedContainer>
                <NestedNestedContainer>
                    <div >
                        <TextField
                            label="Proficiency bonus"
                            type="number"
                            variant="outlined"
                            style={{ backgroundColor: OLD_WHITE_DARK }}
                            InputLabelProps={{ shrink: true }}
                            value={proficiency}
                            onChange={(event) =>
                                onChangeNumberField(
                                    event.target.value,
                                    setProficiency,
                                    true,
                                    false
                                )
                            }
                        />
                    </div>
                </NestedNestedContainer>
                <NestedNestedContainer>
                    <div>
                        <TextField
                            label="Hitpoints"
                            type="number"
                            variant="outlined"
                            style={{ backgroundColor: OLD_WHITE_DARK }}
                            InputLabelProps={{ shrink: true }}
                            value={hitPoints}
                            onChange={(event) =>
                                onChangeNumberField(
                                    event.target.value,
                                    setHitPoints,
                                    true,
                                    false
                                )
                            }
                        />
                    </div>
                </NestedNestedContainer>
            </div>

            <div>
                <NestedNestedContainer>
                    <div>
                        <b>Passive Perception: </b>{" "}
                    </div>
                    <div style={{ paddingLeft: "0.3rem" }}>{passivePerception}</div>
                </NestedNestedContainer>
                <i>Calculated from Wisdom</i>
                <NestedNestedContainer style={{ marginTop: "1rem" }}>
                    <div>
                        <b>Inspiration: </b>
                    </div>
                    <Switch
                        checked={inspiration}
                        onChange={(event) => {
                            setInspiration(event.target.checked);
                        }}
                        color="primary"
                        name="checkedB"
                        inputProps={{ "aria-label": "primary checkbox" }}
                    />
                </NestedNestedContainer>
                <NestedNestedContainer style={{ marginTop: "1rem" }}>
                    <div>
                        <b>Unique: </b>
                    </div>
                    <Switch
                        checked={isUnique}
                        onChange={(event) => {
                            setIsUnique(event.target.checked);
                        }}
                        color="primary"
                        name="checkedB"
                        inputProps={{ "aria-label": "primary checkbox" }}
                    />
                </NestedNestedContainer>
            </div>
            <div>
                <NestedNestedContainer
                    style={{
                        flexDirection: "column",
                        width: "15rem",
                        alignItems: "flex-start",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            flexWrap: "wrap",
                            margin: "0.3rem",
                        }}
                    >
                        <b>Senses: </b>
                        {senses
                            ? senses.map((sens: string) => (
                                <Chip
                                    style={{ marginLeft: "0.2rem", backgroundColor: OLD_WHITE_DARK }}
                                    label={sens}
                                    onDelete={() =>
                                        setSenses((existingSenses: string[]) =>
                                            existingSenses.filter(
                                                (existingSens: string) => existingSens !== sens
                                            )
                                        )
                                    }
                                    variant="outlined"
                                />
                            ))
                            : null}
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            marginLeft: "1rem",
                            alignItems: "center",
                            margin: "0.3rem",
                        }}
                    >
                        <TextField
                            onKeyDown={(event) =>
                                newSens && event.key === "Enter"
                                    ? setSenses((existingSenses: string[]) => [
                                        ...existingSenses,
                                        newSens,
                                    ])
                                    : null
                            }
                            style={{ marginTop: "0.5rem", marginRight: "0.5rem", backgroundColor: OLD_WHITE_DARK }}
                            variant="outlined"
                            onChange={(event) => setNewSens(event.target.value)}
                            label="Senses"
                            value={newSens}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            style={{ height: "2rem" }}
                            onClick={() =>
                                newSens
                                    ? setSenses((existingSenses: string[]) => [
                                        ...existingSenses,
                                        newSens,
                                    ])
                                    : null
                            }
                        >
                            Add
            </Button>
                    </div>
                </NestedNestedContainer>
                <NestedNestedContainer
                    style={{
                        flexDirection: "column",
                        width: "15rem",
                        alignItems: "flex-start",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            flexWrap: "wrap",
                            margin: "0.3rem",
                        }}
                    >
                        <b>Immunities: </b>
                        {immunities
                            ? immunities.map((immunity: string) => (
                                <Chip
                                    style={{ marginLeft: "0.2rem", backgroundColor: OLD_WHITE_DARK }}
                                    label={immunity}
                                    onDelete={() =>
                                        setImmunities((existingimmunities: string[]) =>
                                            existingimmunities.filter(
                                                (existingImmunity: string) =>
                                                    existingImmunity !== immunity
                                            )
                                        )
                                    }
                                    variant="outlined"
                                />
                            ))
                            : null}
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            marginLeft: "1rem",
                            alignItems: "center",
                            margin: "0.3rem",
                        }}
                    >
                        <TextField
                            onKeyDown={(event) =>
                                newSens && event.key === "Enter"
                                    ? setImmunities((existingImmunities: string[]) => [
                                        ...existingImmunities,
                                        newImmunity,
                                    ])
                                    : null
                            }
                            style={{ marginTop: "0.5rem", marginRight: "0.5rem", backgroundColor: OLD_WHITE_DARK }}
                            variant="outlined"
                            onChange={(event) => setNewImmunity(event.target.value)}
                            label="Immunity"
                            value={newImmunity}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            style={{ height: "2rem" }}
                            onClick={() =>
                                newImmunity
                                    ? setImmunities((existingImmunities: string[]) => [
                                        ...existingImmunities,
                                        newImmunity,
                                    ])
                                    : null
                            }
                        >
                            Add
            </Button>
                    </div>
                </NestedNestedContainer>
            </div>
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
                    <TextField
                        style={{ margin: "0.3rem", backgroundColor: OLD_WHITE_DARK }}
                        label="Value"
                        type="number"
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        value={strength}
                        onChange={(event) =>
                            onChangeNumberField(event.target.value, setStrength, true, false)
                        }
                    />
                    <p>Proficient?</p>
                    <Switch
                        checked={isStrengthProficient}
                        onChange={(event) => {
                            setIsStrengthProficient(event.target.checked);
                        }}
                        color="primary"
                        inputProps={{ "aria-label": "primary checkbox" }}
                    />
                    <p>
                        Saving:{" "}
                        {getAbilityModifier(strength, isStrengthProficient, proficiency)}
                    </p>
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
                    <TextField
                        style={{ margin: "0.3rem", backgroundColor: OLD_WHITE_DARK }}
                        label="Value"
                        type="number"
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        value={dexterity}
                        onChange={(event) =>
                            onChangeNumberField(event.target.value, setDexterity, true, false)
                        }
                    />
                    <p>Proficient?</p>

                    <Switch
                        checked={isDexterityProficient}
                        onChange={(event) => {
                            setIsDexterityProficient(event.target.checked);
                        }}
                        color="primary"
                        inputProps={{ "aria-label": "primary checkbox" }}
                    />
                    <p>
                        Saving:{" "}
                        {getAbilityModifier(dexterity, isDexterityProficient, proficiency)}
                    </p>
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
                    <TextField
                        style={{ margin: "0.3rem", backgroundColor: OLD_WHITE_DARK }}
                        label="Value"
                        type="number"
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        value={constitution}
                        onChange={(event) =>
                            onChangeNumberField(
                                event.target.value,
                                setConstitution,
                                true,
                                false
                            )
                        }
                    />
                    <p>Proficient?</p>
                    <Switch
                        checked={isConstitutionProficient}
                        onChange={(event) => {
                            setIsConstitutionProficient(event.target.checked);
                        }}
                        color="primary"
                        inputProps={{ "aria-label": "primary checkbox" }}
                    />
                    <p>
                        Saving:{" "}
                        {getAbilityModifier(
                            constitution,
                            isConstitutionProficient,
                            proficiency
                        )}
                    </p>
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
                    <TextField
                        style={{ margin: "0.3rem", backgroundColor: OLD_WHITE_DARK }}
                        label="Value"
                        type="number"
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        value={intelligence}
                        onChange={(event) =>
                            onChangeNumberField(
                                event.target.value,
                                setIntelligence,
                                true,
                                false
                            )
                        }
                    />
                    <p>Proficient?</p>

                    <Switch
                        checked={isIntelligenceProficient}
                        onChange={(event) => {
                            setIsIntelligenceProficient(event.target.checked);
                        }}
                        color="primary"
                        inputProps={{ "aria-label": "primary checkbox" }}
                    />
                    <p>
                        Saving:{" "}
                        {getAbilityModifier(
                            intelligence,
                            isIntelligenceProficient,
                            proficiency
                        )}
                    </p>
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
                    <TextField
                        style={{ margin: "0.3rem", backgroundColor: OLD_WHITE_DARK }}
                        label="Value"
                        type="number"
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        value={wisdom}
                        onChange={(event) =>
                            onChangeNumberField(event.target.value, setWisdom, true, false)
                        }
                    />
                    <p>Proficient?</p>
                    <Switch
                        checked={isWisdomProficient}
                        onChange={(event) => {
                            setIsWisdomProficient(event.target.checked);
                        }}
                        color="primary"
                        inputProps={{ "aria-label": "primary checkbox" }}
                    />
                    <p>
                        Saving:{" "}
                        {getAbilityModifier(wisdom, isWisdomProficient, proficiency)}
                    </p>
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
                    <TextField
                        style={{ margin: "0.3rem", backgroundColor: OLD_WHITE_DARK }}
                        label="Value"
                        type="number"
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        value={charisma}
                        onChange={(event) =>
                            onChangeNumberField(event.target.value, setCharisma, true, false)
                        }
                    />
                    <p>Proficient?</p>

                    <Switch
                        checked={isCharismaProficient}
                        onChange={(event) => {
                            setIsCharismaProficient(event.target.checked);
                        }}
                        color="primary"
                        inputProps={{ "aria-label": "primary checkbox" }}
                    />
                    <p>
                        Saving:{" "}
                        {getAbilityModifier(dexterity, isCharismaProficient, proficiency)}
                    </p>
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
                                    {" "}
                                    <Switch
                                        checked={isAcrobaticsProficient}
                                        onChange={(event) => {
                                            setIsAcrobaticsProficient(event.target.checked);
                                        }}
                                        color="primary"
                                        name="checkedB"
                                        inputProps={{ "aria-label": "primary checkbox" }}
                                    />
                                </TableElement>
                                <TableElement>
                                    {getAbilityModifier(
                                        dexterity,
                                        isAcrobaticsProficient,
                                        proficiency
                                    )}
                                </TableElement>
                                <TableElement>Acrobatics (Dex)</TableElement>
                            </tr>
                            <tr>
                                <TableElement>
                                    {" "}
                                    <Switch
                                        checked={isAnimalHandlingProficient}
                                        onChange={(event) => {
                                            setIsAnimalHandlingProficient(event.target.checked);
                                        }}
                                        color="primary"
                                        inputProps={{ "aria-label": "primary checkbox" }}
                                    />
                                </TableElement>
                                <TableElement>
                                    {getAbilityModifier(
                                        dexterity,
                                        isAnimalHandlingProficient,
                                        proficiency
                                    )}
                                </TableElement>
                                <TableElement>Animal Handling (Dex)</TableElement>
                            </tr>
                            <tr>
                                <TableElement>
                                    {" "}
                                    <Switch
                                        checked={isArcanaProficient}
                                        onChange={(event) => {
                                            setIsArcanaProficient(event.target.checked);
                                        }}
                                        color="primary"
                                        inputProps={{ "aria-label": "primary checkbox" }}
                                    />
                                </TableElement>
                                <TableElement>
                                    {getAbilityModifier(
                                        intelligence,
                                        isArcanaProficient,
                                        proficiency
                                    )}
                                </TableElement>
                                <TableElement>Arcana (Int)</TableElement>
                            </tr>
                            <tr>
                                <TableElement>
                                    {" "}
                                    <Switch
                                        checked={isAthleticsProficient}
                                        onChange={(event) => {
                                            setIsAthleticsProficient(event.target.checked);
                                        }}
                                        color="primary"
                                        inputProps={{ "aria-label": "primary checkbox" }}
                                    />
                                </TableElement>
                                <TableElement>
                                    {getAbilityModifier(
                                        strength,
                                        isAthleticsProficient,
                                        proficiency
                                    )}
                                </TableElement>
                                <TableElement>Athletics (Str)</TableElement>
                            </tr>
                            <tr>
                                <TableElement>
                                    {" "}
                                    <Switch
                                        checked={isDeceptionProficient}
                                        onChange={(event) => {
                                            setIsDeceptionProficient(event.target.checked);
                                        }}
                                        color="primary"
                                        inputProps={{ "aria-label": "primary checkbox" }}
                                    />
                                </TableElement>
                                <TableElement>
                                    {getAbilityModifier(
                                        charisma,
                                        isDeceptionProficient,
                                        proficiency
                                    )}
                                </TableElement>
                                <TableElement>Deception (Cha)</TableElement>
                            </tr>
                            <tr>
                                <TableElement>
                                    {" "}
                                    <Switch
                                        checked={isHistoryProficient}
                                        onChange={(event) => {
                                            setIsHistoryProficient(event.target.checked);
                                        }}
                                        color="primary"
                                        inputProps={{ "aria-label": "primary checkbox" }}
                                    />
                                </TableElement>
                                <TableElement>
                                    {getAbilityModifier(
                                        intelligence,
                                        isHistoryProficient,
                                        proficiency
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
                                    {" "}
                                    <Switch
                                        checked={isInsightProficient}
                                        onChange={(event) => {
                                            setIsInsightProficient(event.target.checked);
                                        }}
                                        color="primary"
                                        inputProps={{ "aria-label": "primary checkbox" }}
                                    />
                                </TableElement>
                                <TableElement>
                                    {getAbilityModifier(wisdom, isInsightProficient, proficiency)}
                                </TableElement>
                                <TableElement>Insight (Wis)</TableElement>
                            </tr>
                            <tr>
                                <TableElement>
                                    {" "}
                                    <Switch
                                        checked={isIntimidationProficient}
                                        onChange={(event) => {
                                            setIsIntimidationProficient(event.target.checked);
                                        }}
                                        color="primary"
                                        inputProps={{ "aria-label": "primary checkbox" }}
                                    />
                                </TableElement>
                                <TableElement>
                                    {getAbilityModifier(
                                        charisma,
                                        isIntimidationProficient,
                                        proficiency
                                    )}
                                </TableElement>
                                <TableElement>Intimidation (Cha)</TableElement>
                            </tr>
                            <tr>
                                <TableElement>
                                    {" "}
                                    <Switch
                                        checked={isInvestigationProficient}
                                        onChange={(event) => {
                                            setIsInvestigationProficient(event.target.checked);
                                        }}
                                        color="primary"
                                        inputProps={{ "aria-label": "primary checkbox" }}
                                    />
                                </TableElement>
                                <TableElement>
                                    {getAbilityModifier(
                                        intelligence,
                                        isInvestigationProficient,
                                        proficiency
                                    )}
                                </TableElement>
                                <TableElement>Investigation (Int)</TableElement>
                            </tr>
                            <tr>
                                <TableElement>
                                    {" "}
                                    <Switch
                                        checked={isMedicineProficient}
                                        onChange={(event) => {
                                            setIsMedicineProficient(event.target.checked);
                                        }}
                                        color="primary"
                                        inputProps={{ "aria-label": "primary checkbox" }}
                                    />
                                </TableElement>
                                <TableElement>
                                    {getAbilityModifier(
                                        wisdom,
                                        isMedicineProficient,
                                        proficiency
                                    )}
                                </TableElement>
                                <TableElement>Medicine (Wis)</TableElement>
                            </tr>
                            <tr>
                                <TableElement>
                                    {" "}
                                    <Switch
                                        checked={isNatureProficient}
                                        onChange={(event) => {
                                            setIsNatureProficient(event.target.checked);
                                        }}
                                        color="primary"
                                        inputProps={{ "aria-label": "primary checkbox" }}
                                    />
                                </TableElement>
                                <TableElement>
                                    {getAbilityModifier(
                                        intelligence,
                                        isNatureProficient,
                                        proficiency
                                    )}
                                </TableElement>
                                <TableElement>Nature (Int)</TableElement>
                            </tr>
                            <tr>
                                <TableElement>
                                    {" "}
                                    <Switch
                                        checked={isPerceptionProficient}
                                        onChange={(event) => {
                                            setIsPerceptionProficient(event.target.checked);
                                        }}
                                        color="primary"
                                        inputProps={{ "aria-label": "primary checkbox" }}
                                    />
                                </TableElement>
                                <TableElement>
                                    {getAbilityModifier(
                                        wisdom,
                                        isPerceptionProficient,
                                        proficiency
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
                                    {" "}
                                    <Switch
                                        checked={isPerformanceProficient}
                                        onChange={(event) => {
                                            setIsPerformanceProficient(event.target.checked);
                                        }}
                                        color="primary"
                                        inputProps={{ "aria-label": "primary checkbox" }}
                                    />
                                </TableElement>
                                <TableElement>
                                    {getAbilityModifier(
                                        charisma,
                                        isPerformanceProficient,
                                        proficiency
                                    )}
                                </TableElement>
                                <TableElement>Performance (Cha)</TableElement>
                            </tr>
                            <tr>
                                <TableElement>
                                    {" "}
                                    <Switch
                                        checked={isPersuasionProficient}
                                        onChange={(event) => {
                                            setIsPersuasionProficient(event.target.checked);
                                        }}
                                        color="primary"
                                        inputProps={{ "aria-label": "primary checkbox" }}
                                    />
                                </TableElement>
                                <TableElement>
                                    {getAbilityModifier(
                                        charisma,
                                        isPersuasionProficient,
                                        proficiency
                                    )}
                                </TableElement>
                                <TableElement>Persuasion (Cha)</TableElement>
                            </tr>
                            <tr>
                                <TableElement>
                                    {" "}
                                    <Switch
                                        checked={isReligionProficient}
                                        onChange={(event) => {
                                            setIsReligionProficient(event.target.checked);
                                        }}
                                        color="primary"
                                        inputProps={{ "aria-label": "primary checkbox" }}
                                    />
                                </TableElement>
                                <TableElement>
                                    {getAbilityModifier(
                                        intelligence,
                                        isReligionProficient,
                                        proficiency
                                    )}
                                </TableElement>
                                <TableElement>Religion (Int)</TableElement>
                            </tr>
                            <tr>
                                <TableElement>
                                    {" "}
                                    <Switch
                                        checked={isSleightOfHandProficient}
                                        onChange={(event) => {
                                            setIsSleightOfHandProficient(event.target.checked);
                                        }}
                                        color="primary"
                                        inputProps={{ "aria-label": "primary checkbox" }}
                                    />
                                </TableElement>
                                <TableElement>
                                    {getAbilityModifier(
                                        dexterity,
                                        isSleightOfHandProficient,
                                        proficiency
                                    )}
                                </TableElement>
                                <TableElement>Sleight of Hand (Dex)</TableElement>
                            </tr>
                            <tr>
                                <TableElement>
                                    {" "}
                                    <Switch
                                        checked={isStealthProficient}
                                        onChange={(event) => {
                                            setIsStealthProficient(event.target.checked);
                                        }}
                                        color="primary"
                                        inputProps={{ "aria-label": "primary checkbox" }}
                                    />
                                </TableElement>
                                <TableElement>
                                    {getAbilityModifier(
                                        dexterity,
                                        isStealthProficient,
                                        proficiency
                                    )}
                                </TableElement>
                                <TableElement>Stealth (Dex)</TableElement>
                            </tr>
                            <tr>
                                <TableElement>
                                    {" "}
                                    <Switch
                                        checked={isSurvivalProficient}
                                        onChange={(event) => {
                                            setIsSurvivalProficient(event.target.checked);
                                        }}
                                        color="primary"
                                        inputProps={{ "aria-label": "primary checkbox" }}
                                    />
                                </TableElement>
                                <TableElement>
                                    {getAbilityModifier(
                                        wisdom,
                                        isSurvivalProficient,
                                        proficiency
                                    )}
                                </TableElement>
                                <TableElement>Survival (Wis)</TableElement>
                            </tr>
                        </Table>
                    </div>
                </div>

                {actions ? (
                    <NestedContainer style={{ gridColumn: 1 / 3, width: "100%" }}>
                        <h3>Actions and Specials:</h3>
                        {renderAccordian(actions)}
                    </NestedContainer>
                ) : null}

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        justifyContent: "start",
                        margin: "1rem",
                    }}
                >
                    <TextField
                        variant="outlined"
                        label="New action"
                        value={newActionName}
                        onChange={(event) => {
                            setNewActionName(event.target.value);
                        }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        style={{ height: "2rem", margin: "1rem" }}
                        onClick={() => {
                            if (newActionName) {
                                if (actions) {
                                    setActions((existingActions: ICharacterAction[]) => [
                                        ...existingActions,
                                        { name: newActionName, description: "" },
                                    ]);
                                    setNewActionName("");
                                } else {
                                    setActions([{ name: newActionName, description: "" }]);
                                }
                            }
                        }}
                    >
                        Add new action
          </Button>
                </div>
                <div style={{ width: "100%" }}>
                    <h3>Description and history:</h3>
                    <DraftJSEditor
                        characterMentionList={characerMentionList}
                        readOnly={false}
                        JSONRef={storageRef?.child("CharacterDescription.json")}
                    />
                </div>
            </div>
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
  grid-template-rows: 1fr;
  justify-self: start;
  min-width: 15rem;
`;

const NestedNestedContainer = styled.div`
  display: flex;
  margin: 0.5rem;
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
export default CampaignCharacterEdit;
