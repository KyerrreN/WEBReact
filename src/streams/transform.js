const { Transform } = require("stream");
const fs = require("fs");
const path = require("path");

function transformToUppercase(fileName) {
    const pathToFile = path.join(__dirname, "freelancers", fileName);

    if (!fs.existsSync(pathToFile)) {
        console.error("Error: your file doesn't exist");
        return;
    }

    if (!fs.statSync(pathToFile).isFile()) {
        console.error("Error: you specified a directory, not a file");
        return;
    }

    const transformToUpper = new Transform({
        transform(chunk, encoding, callback) {
            this.push(chunk.toString().toUpperCase());
            callback();
        },
    });

    let fileContent = "";

    const readStream = fs.createReadStream(pathToFile, { encoding: "utf8" });
    const pathToTransformer = path.join(
        __dirname,
        "Freelancers",
        "transformed-" + path.basename(pathToFile)
    );
    const writeStream = fs.createWriteStream(pathToTransformer, {
        encoding: "utf8",
        flags: "w",
    });

    readStream.pipe(transformToUpper).pipe(writeStream);

    transformToUpper.on("data", (chunk) => {
        fileContent += chunk;
    });

    transformToUpper.on("end", () => {});

    readStream.on("error", (err) => {
        console.error("Error while reading a file: " + err);
    });

    transformToUpper.on("error", (err) => {
        console.error("Error while transforming a file: " + err);
    });

    writeStream.on("error", (err) => {
        console.error("Error writing file:", err);
    });

    writeStream.on("finish", () => {
        console.log(`Successfully transformed and overwritten: ${fileName}`);
    });
}

const [fileName] = process.argv.slice(2);

if (fileName) {
    transformToUppercase(fileName);
} else {
    console.error("Please provide a file name");
}
