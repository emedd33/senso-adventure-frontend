import { Button, CircularProgress, TextField, TextFieldProps, Tooltip } from "@material-ui/core";
import { FunctionComponent, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { MONSTER_DATABASE_API, NEW_MONSTER, OLD_WHITE, OLD_WHITE_DARK } from "../../../assets/constants/Constants";
import {
    getSelectedCampaign,
    getSelectedCampaignDatabaseRef,
} from "../../../store/selected/selectedSelectors";
import { setSelectedMonster } from "../../../store/selected/selectedCreators";
import { useHistory } from "react-router-dom";
import Autocomplete from "@material-ui/lab/Autocomplete";
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
type CampaignMonsterNewProps = {};
type ApiType = { index: string, name: string, url: string }
const CampaignMonsterNew: FunctionComponent<CampaignMonsterNewProps> = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false)
    const [monsterName, setMonsterName] = useState("");
    const selectedCampaign = useSelector(getSelectedCampaign);
    const [monsterNameError, setMonsterNameError] = useState(false);
    const campaignRef = useSelector(getSelectedCampaignDatabaseRef);
    const [isFetchingMonsterList, setIsFetchingMonsterList] = useState(true)
    const [monsterTemplate, setMonsterTemplate] = useState<ApiType>()
    const [newInputValue, setNewInputValue] = useState<string>("")
    const [monsterChoices, setMonsterChoices] = useState<{ title: string, content: ApiType }[]>([])
    useEffect(() => {
        dispatch(setSelectedMonster({ id: "", monster: NEW_MONSTER }))
    }, [dispatch])

    useMemo(() => {
        fetch(`${MONSTER_DATABASE_API}/api/monsters`)
            .then(res => res.json())
            .then(json => json.results
                .map((apiMonster: ApiType) => setMonsterChoices((existing: { title: string, content: ApiType }[]) => [...existing, { title: apiMonster.name, content: apiMonster }])))
            .finally(() => setIsFetchingMonsterList(false))
    }, [])
    const submitMonster = (monster: IMonster) => {
        if (campaignRef) {
            console.log("monster", monster)
            campaignRef
                .child("monsters")
                .push(monster)
                .then((snapshot) => {
                    let characterId = snapshot.key;
                    if (characterId) {
                        dispatch(
                            setSelectedMonster({ id: characterId, monster: monster })
                        );
                        history.push(
                            `/${selectedCampaign!.campaign.slug}/monsters/${monster.slug
                            }`
                        );
                    }
                });
        }
    }
    const createMonster = () => {
        if (!monsterName) {
            setMonsterNameError(true);
            return;
        }
        setIsLoading(true)

        setMonsterNameError(false);
        let newMonster: IMonster = {
            ...NEW_MONSTER,
            name: monsterName,
            slug: monsterName.replace(/\s/g, ""),
        }
        newMonster.challengeRating = "1";
        if (monsterTemplate) {
            console.log(`${MONSTER_DATABASE_API}${monsterTemplate.url}`)
            fetch(`${MONSTER_DATABASE_API}${monsterTemplate.url}`).then(res => res.json())
                .then(monsterJson => {
                    if (monsterJson.forms) {
                        newMonster.forms = monsterJson.forms
                    }
                    return {
                        ...newMonster,
                        alignment: monsterJson.alignment ? monsterJson.alignment : NEW_MONSTER.alignment,
                        actions: monsterJson.actions ? monsterJson.actions : [],
                        challengeRating: monsterJson.challenge_rating ? monsterJson.challenge_rating : "",
                        conditionImmunities: monsterJson.condition_immunities ? monsterJson.condition_immunities : [],
                        damageImmunities: monsterJson.damage_immunities ? monsterJson.damage_immunities : [],
                        damageResistances: monsterJson.damage_resistance ? monsterJson.damage_resistance : [],
                        damageVulnerabilities: monsterJson.damage_vulnerabilities ? monsterJson.damage_vulnerabilities : [],
                        languages: monsterJson.languages ? monsterJson.languages.split(",") : [],
                        legendaryActions: monsterJson.legendary_actions ? monsterJson.legendary_actions : [],
                        index: monsterJson.index ? monsterJson.index : newMonster.slug,
                        senses: monsterJson.senses ? monsterJson.senses : NEW_MONSTER.senses,
                        size: monsterJson.size ? monsterJson.size : "",
                        type: monsterJson.type ? monsterJson.type : "",
                        subtype: monsterJson.subtype ? monsterJson.subtype : "",
                        specialAbilities: monsterJson.special_abilities ? monsterJson.special_abilities : [],
                        xp: monsterJson.xp ? monsterJson.xp : 0,
                        stats: {
                            armorClass: monsterJson.armor_class ? monsterJson.armor_class : NEW_MONSTER.stats.armorClass,
                            hitPoints: monsterJson.hit_points ? monsterJson.hit_points : NEW_MONSTER.stats.hitPoints,
                            hitDice: monsterJson.hit_dice ? monsterJson.hit_dice : "",
                            proficiencies: monsterJson.proficiencies ? monsterJson.proficiencies : [],
                            speed: monsterJson.speed ? monsterJson.speed : NEW_MONSTER.stats.speed,
                            strength: monsterJson.strength ? monsterJson.strength : NEW_MONSTER.stats.strength,
                            dexterity: monsterJson.dexterity ? monsterJson.dexterity : NEW_MONSTER.stats.dexterity,
                            constitution: monsterJson.constitution ? monsterJson.constitution : NEW_MONSTER.stats.constitution,
                            intelligence: monsterJson.intelligence ? monsterJson.intelligence : NEW_MONSTER.stats.intelligence,
                            wisdom: monsterJson.wisdom ? monsterJson.wisdom : NEW_MONSTER.stats.wisdom,
                            charisma: monsterJson.charisma ? monsterJson.charisma : NEW_MONSTER.stats.charisma,
                        }

                    }
                }).then((res => submitMonster(res)))
        }
        console.log("newMonster", newMonster)
        setIsLoading(false)
    };


    return (
        <TitleContainer>
            {!isLoading ?
                <>
                    <h1 style={{ textAlign: "center", width: "100%" }}>Create new monster or Npc</h1>
                    <TextField
                        id="outlined-multiline-static"
                        placeholder="Write a fitting name for the monster"
                        variant="filled"
                        error={monsterNameError}
                        value={monsterName}
                        disabled={false}
                        style={{ width: "100%" }}
                        label="Monster Name"
                        onChange={(event) => setMonsterName(event.target.value)}
                    />
                    <h3>Use existing dnd monsters as template </h3>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "1rem", alignItems: "center" }}>


                        {monsterChoices ?
                            <Autocomplete
                                id="combo-box-demo"
                                options={monsterChoices}
                                getOptionLabel={(option: { title: any; }) => option.title}
                                style={{ width: "15rem" }}
                                disabled={isFetchingMonsterList}
                                onChange={(event: any, monsterTemplate: { title: string, content: ApiType } | null) => {
                                    if (monsterTemplate) {
                                        setMonsterTemplate(monsterTemplate.content);
                                        if (!monsterName) {
                                            setMonsterName(monsterTemplate.title)
                                        }
                                    } else {
                                        setMonsterTemplate(undefined)
                                    }
                                }}
                                inputValue={newInputValue}
                                onInputChange={(event, newInputValue) => {
                                    setNewInputValue(newInputValue);
                                }}
                                renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) => <TextField {...params} style={{ backgroundColor: OLD_WHITE_DARK }} label="" variant="outlined" />}
                            />
                            : null}
                        <Tooltip title="Using template monsters from https://www.dnd5eapi.co/">
                            <HelpOutlineIcon />

                        </Tooltip>
                    </div>


                    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>

                        <Button
                            style={{ margin: "2rem" }}
                            variant="contained"
                            color="primary"
                            onClick={() => createMonster()}
                        >
                            Submit
      </Button>
                    </div>
                </>
                : <CircularProgress />}
        </TitleContainer>
    );
};

const TitleContainer = styled.div`
  background-color: ${OLD_WHITE};
  width: 50%;
  min-width: 15rem;
  justify-content: center;
  align-items: flex-start;
  display: flex;
  padding:1rem;
  flex-direction: column;
  margin-bottom: 2rem;
  webkit-box-shadow: 7px 7px 5px 0px rgba(50, 50, 50, 0.75);
  moz-box-shadow: 7px 7px 5px 0px rgba(50, 50, 50, 0.75);
  box-shadow: 7px 7px 5px 0px rgba(50, 50, 50, 0.75);
`;
export default CampaignMonsterNew;
