
const onChangeNumberField = (newValue: any, updateFunction: (newValue: number) => void, isPositive: boolean, isNegative: boolean) => {
    let parseValue = parseInt(newValue)

    if (isPositive) {
        if (parseValue > 0) {
            updateFunction(parseValue)
        }
    }
    if (isNegative) {
        if (parseValue < 0) {
            updateFunction(newValue)
        }
    }

}

export default onChangeNumberField