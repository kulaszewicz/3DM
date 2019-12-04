const Combinatorics = require('js-combinatorics');
const { getPermutationByRank, cartesian } = require("./math");

const transformToBinary = (arr) => {
   return Array(arr.length).fill(0);
};

const binarySwap = (el) => {
    return el === 0 ? 1 : 0;
};


const base = (arr) => {
    Combinatorics.baseN([0,1], arr.length).forEach((binaryArr) => {
        const currSolution = binaryToSolution(binaryArr, arr);
        if(checkSolution(currSolution) !== -1){
            console.log(checkSolution(currSolution));
        }
    });
};

const binaryToSolution = (binaryArr, arr) => {
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

const checkSolution = (solution) => {
    const cachedUsedIndices = {
        X: [],
        Y: [],
        Z: [],
    };
    let isSolutionValid = true;
    solution.map((packa) => {
        if (cachedUsedIndices.X.includes(packa[0]) || cachedUsedIndices.Y.includes(packa[1]) || cachedUsedIndices.Z.includes(packa[2])) {
            isSolutionValid = false;
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
    } else return -1;

};

const handleGoal = (solution) => {
    return solution && solution.length ? solution.length : -1;
};

const handleTestGoal = (packa, cachedUsedIndices) => {
    if (cachedUsedIndices.X.includes(packa[0]) || cachedUsedIndices.Y.includes(packa[1]) || cachedUsedIndices.Z.includes(packa[2])) {
        // Not valid solution
        return {
            validPacka: null,
            cachedUsedIndices
        }
    } else {
        cachedUsedIndices.X.push(packa[0]);
        cachedUsedIndices.Y.push(packa[1]);
        cachedUsedIndices.Z.push(packa[2]);
        return {
            validPacka: packa,
            cachedUsedIndices
        }
    }
};

const handleGetNeighbourSolutions = (T, range, solutionIndex) => {
    const permsInRange = [];
    const usedSolutions = [];
    let testSolution = [];
    let usedIndices = {};
    for (let i = -range; i < range; i++) {
        permsInRange.push(getPermutationByRank(T.length, solutionIndex + i))
    }
    const chosenSolutionPerm = getPermutationByRank(T.length, solutionIndex );
    const chosenSolution = () => {
        for (let i = 0; i < T.length; i++) {
            if (i === 0 ) {
                let { validPacka, cachedUsedIndices } = handleTestGoal(T[chosenSolutionPerm[i]], {
                    X: [],
                    Y: [],
                    Z: [],
                });
                usedIndices = cachedUsedIndices;
                if (validPacka) {
                    testSolution.push(validPacka);
                }
            } else {
                let { validPacka, cachedUsedIndices } = handleTestGoal(T[chosenSolutionPerm[i]], usedIndices);
                usedIndices = cachedUsedIndices;
                if (validPacka) {
                    testSolution.push(validPacka);
                }
            }
        }
        return testSolution;
    };
    permsInRange.forEach((e) => {
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
        }
        usedSolutions.push(testSolution);
        testSolution = [];
    });

    return {
        chosenSolution: chosenSolution(),
        allSolutionsInRange: usedSolutions,
    };
};

const handleNextSolution = (solution) => {
    // TODO Modify solution (optimize)
    const isSolutionGoodEnough = false;
    while (!isSolutionGoodEnough){
        handleNextSolution(solution)
    }
};

module.exports = {
    handleGoal,
    handleNextSolution,
    handleTestGoal,
    handleGetNeighbourSolutions,
    transformToBinary,
    base
};