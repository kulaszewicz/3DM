
// Cartesian
const f = (a, b) => [].concat(...a.map(d => b.map(e => [].concat(d, e))));
const cartesian = (a, b, ...c) => (b ? cartesian(f(a, b), ...c) : a);


// Deep search
function include(arr, value) {
    const stringifiedValue = JSON.stringify(value);
    for (const val of arr) {
        if (JSON.stringify(val) === stringifiedValue) {
            return true;
        }
    }
    return false;
}

module.exports = {
    include,
    cartesian
};