const fs = require("fs");
const path = require("path");

function readFileStream(fileToRead) {
    const folderPath = path.join(__dirname, "freelancers", fileToRead);

    if (!fs.existsSync(folderPath)) {
        console.error("Your specified file doesn't exist");
        return;
    }

    if (!fs.statSync(folderPath).isFile()) {
        console.error("Path is correct, but it's not a file");
        return;
    }

    const readStream = fs.createReadStream(folderPath, {
        encoding: "utf-8",
        highWaterMark: 1 * 1024,
    });

    console.warn("File found. Starting to read...");

    readStream.on("data", (chunk) => {
        console.warn("Chunk of data:");
        console.log(chunk);
    });

    readStream.on("end", () => {
        console.log("Succesfully read the file");
    });

    readStream.on("error", (e) => {
        console.error("Error while reading the file");
        console.error(e.message);
    });
}

const [fileName] = process.argv.slice(2);

if (fileName) {
    readFileStream(fileName);
} else {
    console.error("Please, specify name of the file as an argument");
}
