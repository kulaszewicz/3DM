const fs = require('fs');

const getFileData = (file) => {
    try {
        const rawData = fs.readFileSync(`./src/data/inputs/${file}.json`);
        console.log(`Generating solutions for "${file}" input`);
        return JSON.parse(rawData);
    } catch (e) {
        console.log("There is no JSON input file with that name in the data folder");
        console.log("Fallback random generation ...");
    }
};

const postFileData = (data, file) => {
    fs.writeFile(`./src/data/output/${file}.json`, data, { flag: 'w' }, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
};
module.exports = {
    getFileData,
    postFileData
};

    // [ 1, 2, 2 ], // Testing subset from Wikipedia
    // [ 2, 1, 1 ],
    // [ 3, 2, 3 ],
    // [ 1, 3, 3 ],
    // [ 3, 3, 4 ],