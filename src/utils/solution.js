const handleGoal = (solution) => {
    return solution && solution.length ? solution.length : -1;
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
    handleNextSolution
};