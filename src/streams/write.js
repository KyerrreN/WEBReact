const fs = require("fs");
const path = require("path");

function writeNewFreelancers(data) {
    let dataArray;
    try {
        dataArray = JSON.parse(data);
    } catch (e) {
        console.error("Your data is not in JSON format");
        return;
    }

    if (Array.isArray(dataArray)) {
        const isValidJson = validateArray(dataArray);

        if (!isValidJson) {
            return;
        }
    } else if (typeof dataArray === "object" && dataArray !== null) {
        const isValidJson = validateObject(dataArray);

        if (!isValidJson) {
            return;
        }
    } else {
        console.error("Parsed data is neither an array nor an object");
        return;
    }

    if (!fs.existsSync(path.join(__dirname, "Freelancers", "f-index.json"))) {
        console.error("Error: f-index.json doesnt exist");
        return;
    }

    const indexDataText = fs.readFileSync(
        path.join(__dirname, "Freelancers", "f-index.json"),
        "utf-8"
    );

    let indexArray;
    try {
        indexArray = JSON.parse(indexDataText);
    } catch (e) {
        console.error("Error parsing f-index.json");
        return;
    }

    if (Array.isArray(dataArray)) {
        indexArray = indexArray.filter((el) => {
            return !dataArray.some((anotherEl) => el.id === anotherEl.id);
        });

        indexArray.push(...dataArray);

        dataArray.forEach((d) => {
            const writeStream = fs.createWriteStream(
                path.join(__dirname, "freelancers", "f-" + d.id + ".json"),
                { flags: "w", encoding: "utf-8" }
            );

            writeStream.write(JSON.stringify(d, null, 2));

            writeStream.end(() => {
                console.log("Finished writing data to f-" + d.id + ".json");
            });
        });

        const writeStream = fs.createWriteStream(
            path.join(__dirname, "freelancers", "f-index.json"),
            { flags: "w", encoding: "utf-8" }
        );

        writeStream.write(JSON.stringify(indexArray, null, 2));
    } else {
        indexArray = indexArray.filter((el) => {
            return el.id !== dataArray.id;
        });

        indexArray.push(dataArray);

        const writeStreamIndex = fs.createWriteStream(
            path.join(__dirname, "freelancers", "f-index.json"),
            { flags: "w", encoding: "utf-8" }
        );

        const writeStreamData = fs.createWriteStream(
            path.join(__dirname, "freelancers", "f-" + dataArray.id + ".json"),
            { flags: "w", encoding: "utf-8" }
        );

        writeStreamIndex.write(JSON.stringify(indexArray, null, 2));
        writeStreamData.write(JSON.stringify(dataArray, null, 2));
    }
}

const data = [
    {
        id: 1,
        name: "1",
        surname: "1",
        spec: "1",
        rating: 1,
    },
    {
        id: 2,
        name: "1",
        surname: "1",
        spec: "1",
        rating: 1,
    },
    {
        id: 3,
        name: "1",
        surname: "1",
        spec: "1",
        rating: 1,
    },
    {
        id: 8,
        name: "1",
        surname: "1",
        spec: "1",
        rating: 1,
    },
    {
        id: 9,
        name: "1",
        surname: "1",
        spec: "1",
        rating: 1,
    },
];

writeNewFreelancers(JSON.stringify(data, null, 2));

function validateArray(array) {
    for (let i = 0; i < array.length; i++) {
        const isValid = validateObject(array[i]);

        if (!isValid) {
            return false;
        }
    }

    return true;
}

function validateObject(obj) {
    let validateArray = [];

    validateArray.push(obj.id);
    validateArray.push(obj.name);
    validateArray.push(obj.surname);
    validateArray.push(obj.spec);
    validateArray.push(obj.rating);

    validateArray.forEach((element) => {
        if (element === undefined) {
            console.error(
                "Error: your JSON data is invalid. Correct props: id, name, surname, spec, rating"
            );
            return false;
        }
    });

    return true;
}
