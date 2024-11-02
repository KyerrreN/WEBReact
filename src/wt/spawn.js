const { spawn } = require("child_process");
const path = require("path");

function findByKeyword(keyword) {
    const pathToFile = path.join(__dirname, "freelancers", "f-index.json");
    let isFound = false;

    const findFreelancer = spawn("findstr", [keyword, pathToFile]);

    findFreelancer.stderr.on("data", (err) => {
        console.error("Error while reading a file: " + err);
    });

    findFreelancer.stdout.on("data", (result) => {
        isFound = true;
        console.log("Results\n" + result);
    });

    findFreelancer.on("exit", (code) => {
        if (!isFound) {
            console.warn("There were no matches");
        }
    });
}

const [keyword] = process.argv.slice(2);

if (keyword) {
    findByKeyword(keyword);
} else {
    console.error("Error: keyword is not passed as an argument");
}
