const path = require("path");
const fs = require("fs");

function listAllEntries() {
    const pathToIndex = path.join(__dirname, "freelancers", "f-index.json");

    if (!fs.existsSync(pathToIndex)) {
        console.error("Error: index file doesn't exist");
        return;
    }

    const freelArray = JSON.parse(fs.readFileSync(pathToIndex));

    if (freelArray.length === 0) {
        console.log("No freelancers in the DB");
    }

    freelArray.forEach((element) => {
        console.log(
            "----------------------------------\n" +
                "Id            : " +
                element.id +
                "\n" +
                "Fullname      : " +
                element.name +
                " " +
                element.surname +
                "\n" +
                "Specialization: " +
                element.spec +
                "\n" +
                "Rating        : " +
                element.rating +
                "\n" +
                "----------------------------------\n"
        );
    });
}

listAllEntries();
