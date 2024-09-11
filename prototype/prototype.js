const { access } = require("fs");
let readline = require("readline");
const { createInflate } = require("zlib");
const fs = require('fs');


//Functions

let interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let askQuestion = (query) => {
    return new Promise((answer) => { interface.question(query, answer) })
}

let Add = (firstName, lastName) => {
    let myArray = [firstName, lastName]
    const data = JSON.stringify(myArray);

    fs.writeFile('prototype.json', data, (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log('table was saved successfully');
        }
    });

    fs.readFile('prototype.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const myTable = JSON.parse(data);
            console.log(myTable);
        }
    });
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
