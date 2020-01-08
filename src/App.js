const {getFileData, postFileData } = require("./utils/data");
const handleBruteForce = require("./solutionFinders/Brute");
const HillClimbR = require("./solutionFinders/HillClimbR");
const HillClimb = require("./solutionFinders/HillClimb");
const Tabu = require("./solutionFinders/Tabu");
const SimulatedAnnealing = require("./solutionFinders/SimulatedAnnealing");
const { findBestSolution } = require("./utils/solution");

const threeDM  = require("./models/ThreeDM");

const fileName = process.argv[2]; // command input

const data = getFileData(fileName); // file data

threeDM.X = [1,2,3,4,5,6];
threeDM.Y = [1,2,3,4,5,6];
threeDM.Z = [1,2,3,4,5,6];
threeDM.generateT(); // Generating T subset with my own function

console.log(HillClimb(data));
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





