const math = require("mathjs");

const f = (a, b) => [].concat(...a.map(d => b.map(e => [].concat(d, e))));
const cartesian = (a, b, ...c) => (b ? cartesian(f(a, b), ...c) : a);

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

const handleFindM = () => {
    const T = threeDM.T;
    const testSolution  = [];
    const usedSetIndices = {
        X: [],
        Y: [],
        Z: [],
    };
    for (let i = 0; i < T.length; i++) {
        if (usedSetIndices.X.includes(T[i][0]) || usedSetIndices.Y.includes(T[i][1]) || usedSetIndices.Z.includes(T[i][2])) {
            //console.log(T[i]);
        } else {
            testSolution.push(T[i]);
            usedSetIndices.X.push(T[i][0]);
            usedSetIndices.Y.push(T[i][1]);
            usedSetIndices.Z.push(T[i][2]);
        }
    }
    return {
        solutionM: testSolution,
        solutionMLength: testSolution.length,
    };
};

const handleGoal = (solution) => {
    // TODO Rate solution
};

threeDM.X = [1,2,3,5,8];
threeDM.Y = [1,2,3,9,4];
threeDM.Z = [1,2,3,4];


threeDM.generateT();

console.log(threeDM.T);
console.log('-------');
console.log(handleFindM());

