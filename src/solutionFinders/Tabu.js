const {getValidRandom , findNeighbourSolution, checkSolution, binaryToSolution, getRandomNeighbour } = require("../utils/solution");
const lodash = require('lodash');


const Tabu = ({X,Y,Z,T}, iterations = 1000, maxTabuSize = 500) => {
    const tabuList = [];
    let sBest = getValidRandom(T);
    let sBestProper = checkSolution(binaryToSolution(sBest, T));
    let bestCandidate = sBest;
    let bestCandidateProper = checkSolution(binaryToSolution(bestCandidate, T));
    tabuList.push(sBest);
    let properSolution = [];
    let newContender = [];
    for (let i = 0; i < iterations; i++){
        let neighbours = findNeighbourSolution(tabuList[tabuList.length-1]);
        if (i !== 0) {
                for (let j = 0; j < tabuList.length-1; j++){
                    for (let i = 0; i < neighbours.length-1; i++){
                    if (lodash.isEqual(tabuList[j], neighbours[i])){
                        neighbours.splice(neighbours[i], 1);
                        break;
                    }
                }
            }
            bestCandidate = neighbours[neighbours.length-1];
            bestCandidateProper = checkSolution(binaryToSolution(bestCandidate, T));
        }


        neighbours.forEach((binarySolution) => {
            properSolution = binaryToSolution(binarySolution, T);
            newContender = checkSolution(properSolution);
            if ((newContender.score > bestCandidateProper.score)){
                bestCandidate = binarySolution;
                bestCandidateProper = checkSolution(binaryToSolution(bestCandidate, T));
            }
        });

        if (bestCandidateProper.score > sBestProper.score){
            sBest = bestCandidate;
        }
        tabuList.push(bestCandidate);
        if (tabuList.length > maxTabuSize){
            tabuList.shift();
        }
    }
    console.log('global');
    console.log(checkSolution(binaryToSolution(sBest, T)));
};

module.exports = Tabu;