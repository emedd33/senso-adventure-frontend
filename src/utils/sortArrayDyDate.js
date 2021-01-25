
const sortByDateValue = (array) => {
    if (array.length > 1) {
        array.sort(function (a, b) {
            return new Date(b.date) - new Date(a.date);
        });
    }
    return array
}
export default sortByDateValue