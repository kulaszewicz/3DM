const { findNeighbourSolution, checkSolution, binaryToSolution, getValidRandom } = require("../utils/solution");
const convertHrtime = require('convert-hrtime');

const HillClimbR = ({X,Y,Z,T}, iterationsCount) => {
    const hrstart = process.hrtime();

    const getRandomNeighbour = (solution) => {
        return  solution[Math.floor(Math.random()*solution.length)];
    };

    const randomSolution = getValidRandom(T);
    let currBestSolution = checkSolution(binaryToSolution(randomSolution, T));
    const findBest = (binarySolution, iteration) => {
        const neighbours = findNeighbourSolution(binarySolution);
        const randomNeighbour = getRandomNeighbour(neighbours);
        const properSolution = binaryToSolution(randomNeighbour, T);
        const newContender = checkSolution(properSolution);
        if (newContender.score  > currBestSolution.score){
            currBestSolution = newContender;
            ++iteration;
            if (iteration < iterationsCount){
                findBest(randomNeighbour, iteration);
            }
        } else if (iteration < iterationsCount) {
            ++iteration;
            findBest(binarySolution, iteration);
        }
    };
    findBest(randomSolution, 0);
    console.log(currBestSolution,'best');
    hrend = process.hrtime(hrstart);
    return {
        time: convertHrtime(hrend),
        currBestSolution,
    }
};

module.exports = HillClimbR;