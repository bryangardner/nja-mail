const constructorMethod = (app) => {
    app.get("/", (req, res) => {
        res.render("layouts/home");
    });

    app.use("*", (req, res) => {
        res.redirect("/")
    })
}

module.exports = constructorMethod;