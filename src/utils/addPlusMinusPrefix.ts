const addPlusMinusPrefix = (number: number) => {
  if (number < 0) {
    return `-${number}`;
  }
  return `+${number}`;
};
export default addPlusMinusPrefix;
