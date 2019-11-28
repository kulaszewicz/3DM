const { handleGoal, handleGetNeighbourSolutions } = require("../utils/solution");

const HillClimbR = ({X,Y,Z,T}) => {
    const {chosenSolution, allSolutionsInRange} = handleGetNeighbourSolutions(T, 30, 100);
    console.log(chosenSolution);
    console.log(allSolutionsInRange);
};

module.exports = HillClimbR;