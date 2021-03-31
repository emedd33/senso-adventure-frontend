import renderArrayOfString from "./renderArrayOfString"

export const renderDate = (date: string | undefined, translate: any, splitCharacter: string) => {
    if (date) {
        const dateArray = date.split(splitCharacter)
        const translatedArray = dateArray.map(elem => translate.t(elem))
        return renderArrayOfString(" ", translatedArray)
    }
    return date
}