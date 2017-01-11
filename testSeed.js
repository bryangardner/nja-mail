const dbConnection = require('./config').mongoConnection
const people = require("./data").people;

dbConnection()
    .then((db) => {
        return db.dropDatabase().then(() => {
                return dbConnection;
            })
            .then((db) => {
                console.log("adding user");
                return people.addPerson("Test1", "Testing1", "test1@none");
            })
            .then(() => {
                console.log("adding user");
                return people.addPerson("Test2", "Testing2", "test2@none");
            })
            .then(() => {
                console.log("done seeding");
                db.close();
            })
    }, (error) => {
        console.error(error);
    })
