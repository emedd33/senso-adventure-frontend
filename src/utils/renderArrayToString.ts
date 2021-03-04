const renderArrayOfString = (array: string[] | undefined) => {
  if (array) {
    let length = array.length;
    return array.map((elem: string, index: number) => {
      if (index + 1 === length) {
        return `${elem}`;
      }
      return `${elem}, `;
    });
  }
};
export default renderArrayOfString;
