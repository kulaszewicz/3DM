const Combinatorics = require('js-combinatorics');
const { include } = require("../utils/math");
const convertHrtime = require('convert-hrtime');
// Brute force search
const handleFindMBrute = ({X,Y,Z,T}) => {
    const hrstart = process.hrtime();
    let testSolution = [];
    const usedSolutions = [];
    //const allSolutions = [];
    let usedSetIndices = {
        X: [],
        Y: [],
        Z: [],
    };
    const permArray = [];
    for (let k = 0; k < T.length; k++){
        permArray.push(k);
    }
    Combinatorics.permutation(permArray).forEach(e => {
        for (let i = 0; i < T.length; i++) {
            //console.log(`${(e[0] / T.length)* 100}%`);
            if (usedSetIndices.X.includes(T[e[i]][0]) || usedSetIndices.Y.includes(T[e[i]][1]) || usedSetIndices.Z.includes(T[e[i]][2])) {
                continue;
            } else {
                testSolution.push(T[e[i]]);
                usedSetIndices.X.push(T[e[i]][0]);
                usedSetIndices.Y.push(T[e[i]][1]);
                usedSetIndices.Z.push(T[e[i]][2]);
            }
        }
        if (!include(usedSolutions, testSolution)){ // get an array of *unique solutions ; * - some triplets combinations are the same but chosen in different order
            usedSolutions.push(testSolution);
        }
        // allSolutions.push(testSolution);
        usedSetIndices = {
            X: [],
            Y: [],
            Z: [],
        };
        testSolution = [];
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