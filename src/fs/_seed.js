const { createFreelancersEntry } = require("./create.js");
const fs = require("fs");

const path = require("path");

try {
    fs.rmdirSync(path.join(__dirname, "freelancers"), {
        recursive: true,
        force: true,
    });
} catch (e) {}

createFreelancersEntry("1", "Vadim", "Podlipny", "Web Developer", 4.2);
createFreelancersEntry("2", "Vadim", "Podlipny", "Web Developer", 4.3);
createFreelancersEntry("3", "Vadim", "Podlipny", "Web Developer", 4.4);
createFreelancersEntry("4", "Vadim", "Podlipny", "Web Developer", 4.5);
createFreelancersEntry("5", "Vadim", "Podlipny", "Web Developer", 4.6);
