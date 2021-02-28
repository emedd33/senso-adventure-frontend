const getAbilityModifier = (ability: number | string, isProficient?: boolean | string, proficiency?: number) => {
    if (typeof ability === "string") {
        ability = parseInt(ability)
    }
    let parsedAbility = -5;

    if (ability >= 20) {
        parsedAbility = 5
    } else if (ability >= 18) {
        parsedAbility = 4
    } else if (ability >= 16) {
        parsedAbility = 3
    } else if (ability >= 14) {
        parsedAbility = 2
    } else if (ability >= 12) {
        parsedAbility = 1
    } else if (ability >= 10) {
        parsedAbility = 0
    } else if (ability >= 8) {
        parsedAbility = -1
    } else if (ability >= 6) {
        parsedAbility = -2
    } else if (ability >= 4) {
        parsedAbility = -3
    } else if (ability >= 2) {
        parsedAbility = -4
    }
    if (typeof isProficient === "boolean") {
        if (isProficient) {
            if (proficiency) {
                parsedAbility += proficiency
            }
        }
    }
    else if (typeof isProficient === "string") {
        if (isProficient === "TRUE") {
            if (proficiency) {
                parsedAbility += proficiency
            }
        }
    }

    if (parsedAbility >= 0) {
        return `+${parsedAbility}`
    }
    return parsedAbility.toString()
}
export default getAbilityModifier