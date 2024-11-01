const fs = require("fs");
const path = require("path");
const index = require("regexp.prototype.flags");

// A function to create a
// freelancer entry
function createFreelancersEntry(id, name, surname, spec, rating) {
    // Create freelancers path and
    // make a directory in the folder
    // where the script is located
    const freelancersDirPath = path.join(__dirname, "freelancers");
    fs.mkdirSync(freelancersDirPath, { recursive: true });

    // path to f-index
    const freelancersIndexPath = path.join(freelancersDirPath, "f-index.json");

    // create if !exist
    if (!fs.existsSync(freelancersIndexPath)) {
        const emptyArray = [];
        fs.writeFileSync(
            freelancersIndexPath,
            JSON.stringify(emptyArray, null, 2)
        );
    }

    // check for existing id
    const freelancerObjectPath = path.join(
        freelancersDirPath,
        "f-" + id + ".json"
    );
    if (fs.existsSync(freelancerObjectPath)) {
        console.error("File with id: " + id + " already exists.");
        return;
    }

    // create freelancer object
    const freelancerObject = { id, name, surname, spec, rating };

    // read f-index.json and parse it
    const indexJson = fs.readFileSync(freelancersIndexPath);
    let indexArray = JSON.parse(indexJson);

    // push new object into index and overwrite index
    indexArray.push(freelancerObject);
    fs.writeFileSync(freelancersIndexPath, JSON.stringify(indexArray, null, 2));

    // create new file object
    fs.writeFileSync(
        freelancerObjectPath,
        JSON.stringify(freelancerObject, null, 2)
    );

    console.info('Succesfully created new object.\nFile: "f-' + id + '.json."');
}

const [id, name, surname, spec, rating] = process.argv.slice(2);

if (id && name && surname && spec && rating) {
    createFreelancersEntry(id, name, surname, spec, rating);
} else {
    console.error(
        'Error: arguments have to be in this format\n"id" "name" "surname" "spec" "rating"'
    );
}

module.exports = { createFreelancersEntry };
