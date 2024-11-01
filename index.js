const hello = process.argv[0];

if (hello === undefined) {
    console.error("You havent provided a message as the first argument");
    return;
}

console.log("Hello, " + hello);
