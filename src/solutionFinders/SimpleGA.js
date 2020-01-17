const {getValidRandom , findNeighbourSolution, checkSolution, binaryToSolution, getRandomNeighbour, getRandomSolution, binarySwap } = require("../utils/solution");
const random = require('random');
const mathjs = require('mathjs');
const convertHrtime = require('convert-hrtime');

const SimpleGA = (T, initPopulationSize, termCondition = termConditionIteration, crossPrb = 0.9, mutPrb = 0.1, crossover_f = crossover_f, selection_f = selection_f) => {
    const hrstart = process.hrtime();
    const iPopulation = initPopulation(initPopulationSize, T);
    let population = [...iPopulation];
    let iterator = 0;
    while (termCondition({population, iterator})) {
        const fit = getPopulationFitnesses(population, T);
        const parents = [];
        const children = [];
        for (let i = 0; i < initPopulationSize; i++ ){
            parents.push(population[selection_f(fit)])
        }
        // cross
        for (let i = 0; i < initPopulationSize-1; i+=2){
            const u = random.float(0, 1);
            if (crossPrb > u) {
               const { a, b } = crossover_f(parents[i], parents[i + 1]);
               children.push(a);
               children.push(b);
            } else {
                children.push(parents[i]);
                children.push(parents[i + 1]);
            }
        }

        // mutation
        for (let i = 0; i < initPopulationSize-1; i+=1){
            const u = random.float(0, 1);
            if (mutPrb > u) {
                children[i] = mutation_f(children[i])
            }
        }
        population = children;
        iterator++;
    }
    let bestSol = {score: -2};
    population.forEach((solution) => {
        if (checkSolution(binaryToSolution(solution, T), true).score > bestSol.score){
            bestSol = solution;
        }
    });
    hrend = process.hrtime(hrstart);
    console.log(checkSolution(binaryToSolution(bestSol, T), true));
    return {
        time: convertHrtime(hrend),
        solution: checkSolution(binaryToSolution(bestSol, T), true),
    }
};


const initPopulation = (count, T) => {
    const population = [];
    for (let i = 0; i < count; i++) {
        population.push(getRandomSolution(T.length))
    }
    return population;
};

const getPopulationFitnesses = (population, T) => {
    const fitnesses = [];
    population.forEach((chromosome) => {
        fitnesses.push(checkSolution(binaryToSolution(chromosome, T), true).score)
    });
    return fitnesses;
};

// tournament
const selection_f = fitnesses => {
    const one = Math.round(Math.random() * (fitnesses.length - 1) );
    const two = Math.round(Math.random() * (fitnesses.length - 1) );
    return fitnesses[one] > fitnesses[two] ? one : two;
};

const roulette_selection = fitnesses => {
    let sum_fit = fitnesses.reduce((prevVal, nextVal) => prevVal + nextVal);
    const u = random.float(0, sum_fit);
    for (let i = fitnesses.length - 1; i >= 0; i--){
        sum_fit -= fitnesses[i];
        if (sum_fit <= u) return i;
    }
    return 0;
};

const crossover_f = (a, b) => {
    const crossPoint = Math.round(Math.random() * (a.length - 1) );
    let newA = [...a];
    let newB = [...b];

    for (let i = crossPoint; i < a.length; i++) {
        newA[i] = b[i];
        newB[i] = a[i];
    }
    return {a :newA, b: newB};
};

const crossover_f_two_point = (a, b) => {
    let crossPointA = Math.round(Math.random() * (a.length - 1) );
    let crossPointB = Math.round(Math.random() * (a.length - 1) );

    if (crossPointA > crossPointB) {
        let temp = crossPointA;
        crossPointA = crossPointB;
        crossPointB = temp;
    }

    let newA = [...a];
    let newB = [...b];

    for (let i = crossPointA; i < crossPointB; i++) {
        newA[i] = b[i];
        newB[i] = a[i];
    }
    return {a :newA, b: newB};
};

const mutation_f = (a) => {
    const mutPoint = random.int(0, a.length - 2);
    const newA = [...a];
    newA[mutPoint] = binarySwap(newA[mutPoint]);
    return newA;
};

const termConditionIteration = (arg, count = 1000) => {
    const { iterator : i} = arg;
    return i < count;
};

const termConditionStd = (arg) => {
    const { population } = arg;
    return mathjs.std(population) > 0.47;
};

module.exports = {
    SimpleGA,
    termConditionIteration,
    termConditionStd,
    crossover_f,
    crossover_f_two_point,
    selection_f,
    roulette_selection
};