const { access } = require("fs");
let readline = require("readline");
const { createInflate } = require("zlib");


//Functions

let interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let askQuestion = (query) => {
    return new Promise((answer) => { interface.question(query, answer) })
}

let Add = (firstName, lastName) => {
    console.log(firstName, lastName);
};

let Delete = (id) => {
    console.log(`delete ${id}`);
};


//Main Function

const initiateApp = async () => {
    let first_name;
    let last_name;
    let id = 0;

    if (await askQuestion("Enter the letter (a, d): ") == "a") {
        first_name = await askQuestion("Enter the first_name: ");
        last_name = await askQuestion("Enter the last_name: ");
        Add(first_name, last_name);
    } else if (await askQuestion("Enter the letter (a, d): ") == "d") {
        id = await askQuestion("Enter the id: ");
        Delete(id);
    }
    interface.close();
}

initiateApp();
