const fs = require("fs");
const path = require("path");

function deleteFile(id) {
    const pathToFile = path.join(__dirname, "freelancers", "f-" + id + ".json");
    const pathToIndex = path.join(__dirname, "freelancers", "f-index.json");

    if (!fs.existsSync(pathToIndex)) {
        console.error(
            "Error: DB file doesn't exist. Suggest creating it with create.js"
        );
        return;
    }

    const indexArray = JSON.parse(fs.readFileSync(pathToIndex));

    if (indexArray.length === 0) {
        console.error("Error: no entries in DB");
        return;
    }

    if (!fs.existsSync(pathToFile)) {
        console.error("Error: freelancer with provided ID doesn't exist");
        return;
    }

    let updatedArray = indexArray.filter((freel) => freel.id !== id);

    fs.unlinkSync(pathToFile);
    fs.writeFileSync(pathToIndex, JSON.stringify(updatedArray, null, 2));

    console.log("Succefully deleted freelancer with id: " + id);
}

const [id] = process.argv.slice(2);

if (id) {
    const idToDelete = Number(id);

    if (isNaN(id)) {
        console.error("Specified argument is not a number");
        return;
    }
    deleteFile(idToDelete);
} else {
    console.error("You need to provide an argument: id");
}
