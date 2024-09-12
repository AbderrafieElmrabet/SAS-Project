let readline = require("readline");
let fs = require('fs');

let interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let askQuestion = (query) => {
    return new Promise((answer) => { interface.question(query, answer) })
}

let Add = (firstName, lastName) => {
    fs.readFile('prototype.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            let myTable = JSON.parse(data);

            let myObject = {
                id: myTable.length + 1,
                first_name: firstName,
                last_name: lastName
            };

            myTable.push(myObject);

            let myData = JSON.stringify(myTable);

            fs.writeFile('prototype.json', myData, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('table was saved successfully!')
                }
            })
        }
    })
}

let Delete = (id) => {
    console.log(`delete ${id}`)
};

let initiateApp = async () => {
    let first_name;
    let last_name;
    let id = 0;

    if (await askQuestion("Enter the letter 'a' or 'd' to either add or delete") == "a") {
        first_name = await askQuestion("Enter first name: ");
        last_name = await askQuestion("Enter last name: ");
        Add(first_name, last_name);
    } else if (await askQuestion("Enter the letter 'a' or 'd' to either add or delete") == "d") {
        id = await askQuestion("Enter id: ");
        Delete(id);
    }
    interface.close();
}

initiateApp();