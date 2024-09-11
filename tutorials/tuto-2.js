const fs = require('fs');
const monTableau = [
    "samir",
    "Oulad Omar",
    "Tnager",
    21
];

//Save the data

const data = JSON.stringify(monTableau);

fs.writeFile('tuto-2.json', data, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log('table was saved successfully');
    }
});

//Retrive the data

const fs = require('fs');

fs.readFile('tuto-2.json', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
    } else {
        const myTable = JSON.parse(data);
        console.log(myTable[0]);
    }
});