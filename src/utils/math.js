
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

function getPermutationByRank(n, rank) {
    // Sageguard for inaccurate calculations: rank <= 9007199254740991
    if (rank > Number.MAX_SAFE_INTEGER) throw "Too large rank for JavaScript";
    var perm = (function loop(i, fact) {
        // Calculate factorials and subtract from rank from highest to lowest
        return i > n ? [] :
            [loop(i+1, fact * i).concat(Math.floor(rank / fact) % n),
                rank = rank % fact][0];
    })(1, 1);
    // Readjust values to obtain the permutation
    // start from the end and check if preceding values are lower
    for (let k = n - 1; k > 0; --k)
        for (let j = k - 1; j >= 0; --j)
            if (perm[j] <= perm[k])
                perm[k]++;
    return perm;
}

module.exports = {
    include,
    cartesian,
    getPermutationByRank
};