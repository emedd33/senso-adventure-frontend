const sortSessionsByDateValue = (array: any) => {
  if (array) {
    array = array.filter((e: any) => e !== undefined);
    if (array.length > 1) {
      array = array.sort(function (a: any, b: any) {
        let last: any = new Date(b.session.date);
        let first: any = new Date(a.session.date);
        return last - first;
      });
    }
  }
  return array;
};
export default sortSessionsByDateValue;
