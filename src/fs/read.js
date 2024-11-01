const fs = require("fs");
const path = require("path");

function readEntry(id) {
    const indexPath = path.join(__dirname, "freelancers", "f-index.json");

    if (!fs.existsSync(indexPath)) {
        console.error(
            "Error: DB file doesn't exist. Suggest creating it with create.js"
        );
        return;
    }

    const indexArray = JSON.parse(fs.readFileSync(indexPath));

    if (indexArray.length === 0) {
        console.error("Error: no entries in DB");
        return;
    }

    const foundObject = indexArray.find((item) => item.id === id);

    if (foundObject) {
        console.log(
            "Id            : " +
                foundObject.id +
                "\n" +
                "Fullname      : " +
                foundObject.name +
                " " +
                foundObject.surname +
                "\n" +
                "Specialization: " +
                foundObject.spec +
                "\n" +
                "Rating        : " +
                foundObject.rating
        );
    } else {
        console.error("Freelancer with id: " + id + " doesn't exist in the DB");
    }
}

const [id] = process.argv.slice(2);

if (id) {
    const idToSearch = Number(id);

    if (isNaN(idToSearch)) {
        console.error("Provided argument is not a number");
        return;
    }

    readEntry(idToSearch);
} else {
    console.error("Error: id argument must be specified");
}
