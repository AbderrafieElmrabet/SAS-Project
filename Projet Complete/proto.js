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

let Add = (fullName, descreption, debutDate, endDate) => {
    fs.readFile("prototype.json", "utf8", (err, data) => {
        if (err) {
            console.log(err);
        } else {
            let myTable = JSON.parse(data);
            let myObject = {
                full_name: fullName,
                user_descreption: descreption,
                debut_date: debutDate,
                end_date: endDate,
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
                console.log(
                    `id: ${jsondata[i].id},
                     name: ${jsondata[i].full_name},
                      descreption: ${jsondata[i].user_descreption},
                       debut date: ${jsondata[i].debut_date},
                        end date: ${jsondata[i].end_date}`
                )
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
    let full_name;
    let user_descreption;
    let debut_date;
    let end_date;
    let id = 0;

    let choice = await askQuestion("Enter 'a' to add or 'd' to delete or 's' to show users: ");

    if (choice == "a") {
        full_name = await askQuestion("Enter Fullname: ");
        user_descreption = await askQuestion("Enter descreption: ");
        debut_date = await askQuestion("Enter debut date: ");
        end_date = await askQuestion("enter end date: ");
        Add(full_name, user_descreption, debut_date, end_date);
    } else if (choice == "d") {
        id = await askQuestion("Enter an id: ");
        Delete(id);
    } else if (choice == "s") {
        show();
    }
    interface.close();
}

initiateApp();