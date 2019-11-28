const Combinatorics = require('js-combinatorics');
const { include } = require("../utils/math");
const convertHrtime = require('convert-hrtime');
const { handleTestGoal } = require('../utils/solution');
// Brute force search
const handleFindMBrute = ({X,Y,Z,T}) => {
    const hrstart = process.hrtime();
    const usedSolutions = [];
    let testSolution = [];
    //const allSolutions = [];
    let initialIndices = {
        X: [],
        Y: [],
        Z: [],
    };
    const permArray = [];
    for (let k = 0; k < T.length; k++){
        permArray.push(k);
    }
    let usedIndices = {};
    Combinatorics.permutation(permArray).forEach((e) => {
        for (let i = 0; i < T.length; i++) {
            if (i === 0 ) {
                let { validPacka, cachedUsedIndices } = handleTestGoal(T[e[i]], {
                    X: [],
                    Y: [],
                    Z: [],
                });
                usedIndices = cachedUsedIndices;
                if (validPacka) {
                    testSolution.push(validPacka);
                }
            } else {
                let { validPacka, cachedUsedIndices } = handleTestGoal(T[e[i]], usedIndices);
                usedIndices = cachedUsedIndices;
                if (validPacka) {
                    testSolution.push(validPacka);
                }
            }

            // if (usedSetIndices.X.includes(T[e[i]][0]) || usedSetIndices.Y.includes(T[e[i]][1]) || usedSetIndices.Z.includes(T[e[i]][2])) {
            //     continue;
            // } else {
            //     testSolution.push(T[e[i]]);
            //     usedSetIndices.X.push(T[e[i]][0]);
            //     usedSetIndices.Y.push(T[e[i]][1]);
            //     usedSetIndices.Z.push(T[e[i]][2]);
            // }
        }
        if (!include(usedSolutions, testSolution)){ // get an array of *unique solutions ; * - some triplets combinations are the same but chosen in different order
            usedSolutions.push(testSolution);
        }
        // allSolutions.push(testSolution);
        testSolution = [];
        usedIndices = {
            X: [],
            Y: [],
            Z: [],
        };
    });
    hrend = process.hrtime(hrstart);
    return {
        time: convertHrtime(hrend),
        X,
        Y,
        Z,
        subsetT: T,
        uniqueSolutions: usedSolutions,
        //allSolutions
    };
};

module.exports = handleFindMBrute;