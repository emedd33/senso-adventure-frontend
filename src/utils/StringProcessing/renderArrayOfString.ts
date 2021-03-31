const renderArrayOfString = (seperator: string, array?: string[],) => {
  if (array) {
    let length = array.length;
    return array.map((elem: string, index: number) => {
      if (index + 1 === length) {
        return `${elem}`;
      }
      return `${elem}${seperator}`;
    });
  }
};
export default renderArrayOfString;
