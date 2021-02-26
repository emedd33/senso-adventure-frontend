const getAbilityModifier = (ability: number) => {
    if (ability >= 20) {
        return "+5"
    }
    if (ability >= 18) {
        return "+5"
    }
    if (ability >= 16) {
        return "+4"
    }
    if (ability >= 14) {
        return "+3"
    }
    if (ability >= 12) {
        return "+2"
    }
    if (ability >= 10) {
        return "+0"
    }
    if (ability >= 8) {
        return "-1"
    }
    if (ability >= 6) {
        return "-2"
    }
    if (ability >= 4) {
        return "-3"
    }
    if (ability >= 2) {
        return "-4"
    }
    return "-5"
}
export default getAbilityModifier