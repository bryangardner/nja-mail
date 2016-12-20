const people = require('../data').people;

const constructorMethod = (app) => {
    app.get("/", (req, res) => {
        people.getAllPeople()
            .then((allPeople) => {
                res.render("layouts/home", { people: allPeople })
            })
            .catch((error) => {
                res.render("layouts/error", { error: error })
            })
    });

    app.post("/send", (req, res) => {
        console.log(req.body);
    })

    app.get("/settings", (req, res) => {

    })

    app.post("/person", (req, res) => {

    })

    app.put("/person/:id", (req, res) => {

    })

    app.delete("/person/:id", (req, res) => {

    })

    app.use("*", (req, res) => {
        res.redirect("/")
    })
}

module.exports = constructorMethod;