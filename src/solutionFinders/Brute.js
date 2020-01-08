const Combinatorics = require('js-combinatorics');
const convertHrtime = require('convert-hrtime');
const { binaryToSolution, checkSolution } = require('../utils/solution');
// Brute force search
const handleFindMBrute = ({X,Y,Z,T}) => {
    const hrstart = process.hrtime();
    const uniqueSolutions = [];
    Combinatorics.baseN([0,1], T.length).forEach((binaryArr) => {
        const currSolution = binaryToSolution(binaryArr, T);
        if(checkSolution(currSolution) !== -1){
            uniqueSolutions.push(checkSolution(currSolution));
        }
    });
    hrend = process.hrtime(hrstart);
    return {
        time: convertHrtime(hrend),
        X,
        Y,
        Z,
        subsetT: T,
        uniqueSolutions: uniqueSolutions,
    };
};

module.exports = handleFindMBrute;