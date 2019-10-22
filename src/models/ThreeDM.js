const { cartesian } = require("../utils/math");
const math = require("mathjs");

const threeDM = {
    X: [],  //X, Y, Z are finite disjoint sets
    Y: [],
    Z: [],
    T: [], // T is a subset of X x Y x Z, it consists triples(paćki) such that x ∈ X, y ∈ Y and z ∈ Z
    generateT(){
        const {X, Y, Z, T} = this;
        const lssl = math.max(X.length, Y.length, Z.length);  //largestStartingSetLength
        const sssl = math.min(X.length, Y.length, Z.length);  //smallestStartingSetLength
        const D = cartesian(X, Y, Z); // All possible subsets / domain
        const subsetsCount = math.randomInt(math.floor(lssl / 2), lssl*sssl); // how many subsets we want
        for (let i = 0; i <= subsetsCount; i++) {
            T.push(D[math.randomInt(0, D.length)])
        }
    }
};

module.exports = threeDM;