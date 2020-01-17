const {getFileData, postFileData } = require("./utils/data");
const handleBruteForce = require("./solutionFinders/Brute");
const HillClimbR = require("./solutionFinders/HillClimbR");
const HillClimb = require("./solutionFinders/HillClimb");
const Tabu = require("./solutionFinders/Tabu");
const SimulatedAnnealing = require("./solutionFinders/SimulatedAnnealing");
const { termConditionIteration, termConditionStd, crossover_f, crossover_f_two_point, selection_f, roulette_selection, SimpleGA} = require("./solutionFinders/SimpleGA");
const { findBestSolution } = require("./utils/solution");

const threeDM  = require("./models/ThreeDM");

const fileName = process.argv[2]; // command input
const termCondition = process.argv[3] === 'iterator' ? termConditionIteration : termConditionStd;
const crossover_func = process.argv[4] === 'one' ? crossover_f : crossover_f_two_point;
const selection_func = process.argv[5] === 'roulette' ? roulette_selection : selection_f;
const crossPrb = process.argv[6];
const mutPrb = process.argv[7];

const data = getFileData(fileName); // file data

threeDM.X = [1,2,3,4,5,6];
threeDM.Y = [1,2,3,4,5,6];
threeDM.Z = [1,2,3,4,5,6];
threeDM.generateT(); // Generating T subset with my own function

//console.log(initPopulation(7, data.T));
console.log(SimpleGA(data.T, 50, termCondition, crossPrb, mutPrb, crossover_func, selection_func));

//console.log(HillClimb(data));
// console.log(Tabu(data));
//console.log(HillClimbR(data, 10));
//console.log(handleGetNeighbourSolutions(data.T, 300, 3000));
//
// const results = handleBruteForce(data ? data : threeDM); // brute results
//
// console.log(results.uniqueSolutions);
//
// console.log(findBestSolution(results.uniqueSolutions));
//
// const dataToSave = JSON.stringify({results});
//
// postFileData(dataToSave, fileName ? fileName : "rGenerated");





