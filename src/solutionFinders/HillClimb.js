const {getValidRandom , findNeighbourSolution, checkSolution, binaryToSolution } = require("../utils/solution");
const convertHrtime = require('convert-hrtime');

const HillClimb = ({X,Y,Z,T}, iterations = 1000) => {
    const hrstart = process.hrtime();

    const randomSolution = getValidRandom(T);
    let currBestSolution = checkSolution(binaryToSolution(randomSolution, T));
    let currSolution = randomSolution;

    for (let i = 0; i < iterations; i++) {
        const neighbours = findNeighbourSolution(currSolution);
        neighbours.forEach((binarySolution) => {
            const properSolution = binaryToSolution(binarySolution, T);
            const newContender = checkSolution(properSolution);
            if (newContender.score  > currBestSolution.score){
                currBestSolution = newContender;
                currSolution = binarySolution;
            }
        })
    }
    console.log(currBestSolution,' < --- best');
    hrend = process.hrtime(hrstart);
    return {
        time: convertHrtime(hrend),
        currBestSolution,
    }
};

module.exports = HillClimb;