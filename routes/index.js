const people = require('../data').people;

const constructorMethod = (app, configProperties) => {
    app.get("/", (req, res) => {
        people.getAllPeople()
            .then((allPeople) => {
                res.render("layouts/home", {
                    people: allPeople
                })
            })
            .catch((error) => {
                res.render("layouts/notify", {
                    message: error
                })
            })
    });

    app.post("/", (req, res) => {
        ids = Object.keys(req.body);
        people.getPeopleByList(ids)
            .then((resolvedPeople) => {
                let emailList = resolvedPeople.map((person) => {
                    return person.email
                })
                if (emailList.length == 0) {
                    return res.render("layouts/notify", {
                        message: "No users selected"
                    });
                } else {
                    app.mailer.send('email/email', {
                            to: configProperties.to,
                            subject: configProperties.subject,
                            bcc: emailList,
                            body: configProperties.body
                        },
                        (error, message) => {
                            if (error) {
                                return res.render("layouts/notify", {
                                    message: error
                                });
                            } else {
                                return res.render("layouts/notify", {
                                    message: "Notification successfully sent"
                                });
                            }
                        })
                }
            })
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
