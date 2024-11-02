const fs = require("fs");
const path = require("path");

function rename(oldPath, newPath) {
    if (!fs.existsSync(oldPath)) {
        console.error("Provided source doesn't exist");
        return;
    }

    if (!fs.statSync(oldPath).isFile()) {
        console.error("Provided source is correct, but it is not a file");
        return;
    }

    const dir1 = path.dirname(oldPath);
    const dir2 = path.dirname(newPath);

    if (path.normalize(dir1) !== path.normalize(dir2)) {
        console.error("Provided old file name doesnt equal new file name");
        return;
    }

    fs.renameSync(oldPath, newPath);
    console.log(
        'Succesfully changed name from "' +
            path.basename(oldPath) +
            '" to "' +
            path.basename(newPath) +
            '"'
    );
}

const [oldPathName, newPathName] = process.argv.slice(2);

if (oldPathName && newPathName) {
    rename(oldPathName, newPathName);
} else {
    console.error(
        'The arguments for rename function are as follows\n"old_path" "new_path"'
    );
}
