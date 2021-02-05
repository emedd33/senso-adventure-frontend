const sortSessionsByDateValue = (array?: any) => {
  console.log("array", array)
  if (array) {
    array = array.filter((e: any) => e !== undefined)
    console.log("array", array)
    if (array.length > 1) {
      array.sort(function (a: { session: { date: string | number | Date; }; }, b: { session: { date: string | number | Date; }; }) {
        let last: any = new Date(b.session.date)
        let first: any = new Date(a.session.date);
        return last - first
      });
    }
  }
  return array;

};
export default sortSessionsByDateValue;
