
const sortByDateValue = (array) => {
    array.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
    });
}
export default sortByDateValue