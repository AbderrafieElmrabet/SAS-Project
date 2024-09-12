let readline = require("readline");
let fs = require("fs");
const { json } = require("stream/consumers");

let interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let askQuestion = (query) => {
    return new Promise((answer) => { interface.question(query, answer) });
}

let Add = (firstName, lastName) => {
    fs.readFile("prototype.json", "utf8", (err, data) => {
        if (err) {
            console.log(err);
        } else {
            let myTable = JSON.parse(data);
            let myObject = {
                first_name: firstName,
                last_name: lastName,
                id: myTable.length + 1
            };
            myTable.push(myObject);
            let myData = JSON.stringify(myTable);

            fs.writeFile("prototype.json", myData, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("saved successfully");
                }
            });
        }
    });
}

let show = () => {
    fs.readFile("prototype.json", "utf8", (err, data) => {
        if (err) {
            console.log(err)
        } else {
            let jsondata = JSON.parse(data);
            for (i = 0; i < jsondata.length; i++) {
                console.log(`id: ${jsondata[i].id}, name: ${jsondata[i].first_name}, last name: ${jsondata[i].last_name}`)
            }
        }
    })
}

let Delete = (id) => {
    fs.readFile("prototype.json", "utf8", (err, data) => {
        if (err) {
            console.log(err)
        } {
            let myTable = JSON.parse(data);
            let filteredTable = myTable.filter((obj) => obj.id !== parseInt(id));

            if (filteredTable.length === myTable.length) {
                console.log("user was not found");
            } else {
                let myData = JSON.stringify(filteredTable);

                fs.writeFile("prototype.json", myData, (err) => {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log(`user with id ${id} was deleted successfully!`)
                    }
                });

            }
        }
    });
}

let initiateApp = async () => {
    let first_name;
    let last_name;
    let id = 0;

    let choice = await askQuestion("Enter 'a' to add or 'd' to delete or 's' to show users: ");

    if (choice == "a") {
        first_name = await askQuestion("Enter first name: ");
        last_name = await askQuestion("Enter last name: ");
        Add(first_name, last_name);
    } else if (choice == "d") {
        id = await askQuestion("Enter an id: ");
        Delete(id);
    } else if (choice == "s") {
        show();
    }
    interface.close();
}

initiateApp();
