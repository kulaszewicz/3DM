const {getFileData, postFileData } = require("./utils/data");
const handleBruteForce = require("./solutionFinders/Brute");
const HillClimbR = require("./solutionFinders/HillClimbR");
const { handleGoal, handleGetNeighbourSolutions } = require("./utils/solution");

const threeDM  = require("./models/ThreeDM");

const fileName = process.argv[2]; // command input

const data = getFileData(fileName); // file data

threeDM.X = [1,2,3];
threeDM.Y = [1,2,3,4];
threeDM.Z = [1,2,3,4];
threeDM.generateT(); // Generating T subset with my own function

HillClimbR(data);
//console.log(handleGetNeighbourSolutions(data.T, 300, 3000));

const results = handleBruteForce(data ? data : threeDM); // brute results

const solutionRatings = results.uniqueSolutions.map((solution) => handleGoal(solution)); // solutions rating

console.log(results.uniqueSolutions);
console.log(solutionRatings);

const dataToSave = JSON.stringify({results, solutionRatings});

postFileData(dataToSave, fileName ? fileName : "rGenerated");





