const {getValidRandom , findNeighbourSolution, checkSolution, binaryToSolution, getRandomNeighbour } = require("../utils/solution");
const lodash = require('lodash');

const SimulatedAnnealing = ({X,Y,Z,T}, iterations = 1000, Temprature = (k) => (40000000.0/k) ) => {
    const solutions = [];
    let sCurrentBest = getValidRandom(T);
    solutions.push(sCurrentBest);
    // let sCurrentBestProper = checkSolution(binaryToSolution(sCurrentBest, T));
    // let best_cost = sCurrentBestProper.score;

    for (let k = 1; k <= iterations; k++){
        let neighbours = findNeighbourSolution(solutions[solutions.length-1]);
        let newSolution = getRandomNeighbour(neighbours);
        // console.log(checkSolution(binaryToSolution(newSolution, T)));
        // console.log(checkSolution(binaryToSolution(solutions[solutions.length - 1], T)));
        // console.log(solutions);
        while (!newSolution) {
            newSolution = getRandomNeighbour(neighbours)
        }
        if (checkSolution(binaryToSolution(newSolution, T)).score > checkSolution(binaryToSolution(solutions[solutions.length-1], T)).score) {
            solutions.push(newSolution);
            //console.log(newSolution);
        } else {
            let u = Math.random();
            let f_t_k = checkSolution(binaryToSolution(newSolution, T)).score;
            let f_t_k_1 = checkSolution(binaryToSolution(solutions[solutions.length-1], T)).score;
            if (u < Math.exp(-Math.abs(f_t_k-f_t_k_1)/Temprature(k))){
                solutions.push(newSolution)
            } else {
                solutions.push(solutions[solutions.length-1])
            }
        }
    }
    let bestSol = {score: -2};
    solutions.forEach((solution) => {
        if (checkSolution(binaryToSolution(solution, T)).score > bestSol.score){
            bestSol = solution;
        }
    });
    console.log(checkSolution(binaryToSolution(bestSol, T)));
};

module.exports = SimulatedAnnealing;