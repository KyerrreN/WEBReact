const fs = require("fs");
const path = require("path");

function copyFiles(src, dest) {
    if (!fs.existsSync(src)) {
        console.error("Error: source doesnt exist");
        return;
    }
    if (!fs.existsSync(dest)) {
        console.error("Error: destination doesnt exist");
        return;
    }

    function copyRecursively(srcR, destR) {
        fs.mkdirSync(destR, { recursive: true });

        const entries = fs.readdirSync(srcR);

        for (const entry of entries) {
            const srcPath = path.join(srcR, entry);
            const destPath = path.join(destR, entry);

            if (fs.statSync(srcPath).isDirectory()) {
                copyRecursively(srcPath, destPath);
            } else {
                fs.copyFileSync(srcPath, destPath);
            }
        }
    }

    if (fs.statSync(src).isDirectory()) {
        copyRecursively(src, dest);
    } else {
        const destinationFilePath = path.join(dest, path.basename(src));
        fs.copyFileSync(src, destinationFilePath);
    }
}

const [providedSrc, providedDest] = process.argv.slice(2);

if (providedSrc && providedDest) {
    copyFiles(providedSrc, providedDest);
} else {
    console.error(
        'Error: command line arguments are as follows\n"source_directory" "destination_directory" '
    );
}
