const math = require("mathjs");
const lodash = require("lodash");

const f = (a, b) => [].concat(...a.map(d => b.map(e => [].concat(d, e))));
const cartesian = (a, b, ...c) => (b ? cartesian(f(a, b), ...c) : a);

function include(arr, value) {
    const stringifiedValue = JSON.stringify(value);
    for (const val of arr) {
        if (JSON.stringify(val) === stringifiedValue) {
            return true;
        }
    }
    return false;
}

function perm(xs) {
    let ret = [];

    for (let i = 0; i < xs.length; i = i + 1) {
        let rest = perm(xs.slice(0, i).concat(xs.slice(i + 1)));

        if(!rest.length) {
            ret.push([xs[i]])
        } else {
            for(let j = 0; j < rest.length; j = j + 1) {
                ret.push([xs[i]].concat(rest[j]))
            }
        }
    }
    return ret;
}


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

const handleFindMBrute = () => {
    const T = threeDM.T;
    let testSolution = [];
    const usedSolutions = [];
    const allSolutions = [];
    let usedSetIndices = {
        X: [],
        Y: [],
        Z: [],
    };
    const permArray = [];
    for (let k = 0; k < T.length; k++){
        permArray.push(k);
    }
    const allPerms = perm(permArray);
    for (let j = 0; j < allPerms.length; j++){
        for (let i = 0; i < T.length; i++) {
            if (usedSetIndices.X.includes(T[allPerms[j][i]][0]) || usedSetIndices.Y.includes(T[allPerms[j][i]][1]) || usedSetIndices.Z.includes(T[allPerms[j][i]][2])) {
                continue;
            } else {
                testSolution.push(T[allPerms[j][i]]);
                usedSetIndices.X.push(T[allPerms[j][i]][0]);
                usedSetIndices.Y.push(T[allPerms[j][i]][1]);
                usedSetIndices.Z.push(T[allPerms[j][i]][2]);
            }
        }
        if (!include(usedSolutions, testSolution)){ // get an array of *unique solutions ; * - some triplets combinations are the same but chosen in different order
            usedSolutions.push(testSolution);
        }
        allSolutions.push(testSolution);
        usedSetIndices = {
            X: [],
            Y: [],
            Z: [],
        };
        testSolution = [];
    }
    return {
        subsetT: threeDM.T,
        uniqueSolutions: usedSolutions,
        allSolutions
    };
};

const handleGoal = (solution) => {
    // TODO Rate solution
};

threeDM.X = [1,2,3,4];
threeDM.Y = [1,2,3,4];
threeDM.Z = [1,2,3,4];
//threeDM.generateT();

const mockedTSubset = [
    [ 1, 2, 2 ],
    [ 2, 1, 1 ],
    [ 3, 2, 3 ],
    [ 1, 3, 3 ],
    [ 3, 3, 4 ],
];

threeDM.T = mockedTSubset;


console.log('-------');
console.log(handleFindMBrute());
console.log('-------');

const test = handleFindMBrute();

console.log(test.uniqueSolutions);

    // [ 1, 2, 2 ],
    // [ 2, 1, 1 ],
    // [ 3, 2, 3 ],
    // [ 1, 3, 3 ],
    // [ 3, 3, 4 ],