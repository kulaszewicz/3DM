const Combinatorics = require('js-combinatorics');
const { getPermutationByRank, cartesian } = require("./math");

const binaryToSolution = (binaryArr, arr) => {
    // console.log(binaryArr);
    const solution = [];
    binaryArr.map((e, index) => {
        if (e === 1){
            solution.push(arr[index])
        } else {
            return 0;
        }
    });
    return solution;
};

const randomBinary = () => {
    return Math.round(Math.random());
};

const getRandomNeighbour = (neighbours) => {
    // console.log(neighbours, 'sasiad');
    // console.log(neighbours[Math.round(Math.random() * neighbours.length)], 'test');
    return neighbours[Math.round(Math.random() * neighbours.length )]
};
const binarySwap = (el) => {
    return el === 0 ? 1 : 0;
};

const checkSolution = (solution, isFitness) => {
    const cachedUsedIndices = {
        X: [],
        Y: [],
        Z: [],
    };
    let isSolutionValid = true;
    let howBad =  isFitness ? 1 : 0;
    solution.map((packa) => {
        if (cachedUsedIndices.X.includes(packa[0]) || cachedUsedIndices.Y.includes(packa[1]) || cachedUsedIndices.Z.includes(packa[2])) {
            isSolutionValid = false;
            howBad -= 0.05
        } else {
            cachedUsedIndices.X.push(packa[0]);
            cachedUsedIndices.Y.push(packa[1]);
            cachedUsedIndices.Z.push(packa[2]);
        }
    });
    if (isSolutionValid){
        return {
            solution,
            score: solution.length
        }
    } else return {
        solution,
        score: parseFloat(howBad.toFixed(2))
    }

};

const findBestSolution = (solutions) => {
    const scores = () => solutions.map((solution) => solution.score);
    return Math.max(...scores());
};

const handleNextSolution = (solution) => {
    // TODO Modify solution (optimize)
    const isSolutionGoodEnough = false;
    while (!isSolutionGoodEnough){
        handleNextSolution(solution)
    }
};

const findNeighbourSolution = (byteSolution) => {
    const neighbours = [];
    byteSolution.map((binary, index) => {
        let currNeighbourSolution = [...byteSolution];
        currNeighbourSolution[index] = binarySwap(binary);
        neighbours.push(currNeighbourSolution);
    });
    return neighbours;
};

const getRandomSolution = TSubsetLength => {
    const randomSolution = [];
    for (let i = 0; i < TSubsetLength; i++) {
        randomSolution.push(randomBinary());
    }
    return randomSolution;
};

const getValidRandom = (T) => {
    let isRandomValid = false;
    let validRandom = [];
    while (!isRandomValid) {
        const currRandomBinary = getRandomSolution(T.length);
        const currRandomScore = checkSolution(binaryToSolution(currRandomBinary, T)).score;
        if (currRandomScore > -1) {
            isRandomValid = true;
            validRandom = currRandomBinary;
        }
    }
    return validRandom;
};

module.exports = {
    handleNextSolution,
    checkSolution,
    binaryToSolution,
    findBestSolution,
    getRandomSolution,
    findNeighbourSolution,
    getValidRandom,
    getRandomNeighbour,
    binarySwap
};