const math = require("mathjs");
const fs = require('fs');
const Combinatorics = require('js-combinatorics');

const f = (a, b) => [].concat(...a.map(d => b.map(e => [].concat(d, e))));
const cartesian = (a, b, ...c) => (b ? cartesian(f(a, b), ...c) : a);

function include(arr, value) {
    const stringifiedValue = JSON.stringify(value);
    for (const val of arr) {
        if (JSON.stringify(val) === stringifiedValue) {
            return true;
        }
    }
    return false;
}

const threeDM = {
    X: [],  //X, Y, Z are finite disjoint sets
    Y: [],
    Z: [],
    T: [], // T is a subset of X x Y x Z, it consists triples(paćki) such that x ∈ X, y ∈ Y and z ∈ Z
    generateT(){
        const {X, Y, Z, T} = this;
        const lssl = math.max(X.length, Y.length, Z.length);  //largestStartingSetLength
        const sssl = math.min(X.length, Y.length, Z.length);  //smallestStartingSetLength
        const D = cartesian(X, Y, Z); // All possible subsets / domain
        const subsetsCount = math.randomInt(math.floor(lssl / 2), lssl*sssl); // how many subsets we want
        for (let i = 0; i <= subsetsCount; i++) {
            T.push(D[math.randomInt(0, D.length)])
        }
    }
};

const handleFindMBrute = (X,Y,Z,T) => {
   // const T = threeDM.T;
    let testSolution = [];
    const usedSolutions = [];
    const allSolutions = [];
    let usedSetIndices = {
        X: [],
        Y: [],
        Z: [],
    };
    const permArray = [];
    for (let k = 0; k < T.length; k++){
        permArray.push(k);
    }
    const allPerms = Combinatorics.permutation(permArray).toArray();
    for (let j = 0; j < allPerms.length; j++){
        for (let i = 0; i < T.length; i++) {
            if (usedSetIndices.X.includes(T[allPerms[j][i]][0]) || usedSetIndices.Y.includes(T[allPerms[j][i]][1]) || usedSetIndices.Z.includes(T[allPerms[j][i]][2])) {
                continue;
            } else {
                testSolution.push(T[allPerms[j][i]]);
                usedSetIndices.X.push(T[allPerms[j][i]][0]);
                usedSetIndices.Y.push(T[allPerms[j][i]][1]);
                usedSetIndices.Z.push(T[allPerms[j][i]][2]);
            }
        }
        if (!include(usedSolutions, testSolution)){ // get an array of *unique solutions ; * - some triplets combinations are the same but chosen in different order
            usedSolutions.push(testSolution);
        }
       // allSolutions.push(testSolution);
        usedSetIndices = {
            X: [],
            Y: [],
            Z: [],
        };
        testSolution = [];
    }
    return {
        X,
        Y,
        Z,
        subsetT: threeDM.T,
        uniqueSolutions: usedSolutions,
        //allSolutions
    };
};

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

threeDM.X = [1,2,3];
threeDM.Y = [1,2,3];
threeDM.Z = [1,2,3,4];
threeDM.generateT(); // Generating T subset with my own function

// const mockedTSubset = [
//     [ 1, 2, 2 ],
//     [ 2, 1, 1 ],
//     [ 3, 2, 3 ],
//     [ 1, 3, 3 ],
//     [ 3, 3, 4 ],
// ];

// threeDM.T = mockedTSubset;

const data = handleFindMBrute(threeDM.X, threeDM.Y, threeDM.Z, threeDM.T);


const solutionRatings = data.uniqueSolutions.map((solution) => handleGoal(solution));
 console.log(data);
 console.log(data.uniqueSolutions);
console.log(solutionRatings);

const fileDataRaw = fs.readFileSync("./src/data/3dm.json"); // Raw data buffer from file

const fileData = JSON.parse(fileDataRaw); // Data parsed to object

const {X, Y, Z, subsetT} = fileData; //Destructuring parameters

const bruteDataFromFile = handleFindMBrute(X,Y,Z,subsetT); //Brute

const jsonData = JSON.stringify(bruteDataFromFile); // Stringify Json to save file

// console.log(bruteDataFromFile.uniqueSolutions); // log of *unique solutions

const solutionsRatings = bruteDataFromFile.uniqueSolutions.map((solution) => handleGoal(solution)); // Array of all solutions ratings

// console.log(solutionsRatings);

fs.writeFile("./src/data/3dm.json", jsonData, function(err) {

    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
});


    // [ 1, 2, 2 ], // Testing subset from Wikipedia
    // [ 2, 1, 1 ],
    // [ 3, 2, 3 ],
    // [ 1, 3, 3 ],
    // [ 3, 3, 4 ],