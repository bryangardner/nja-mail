const brothersRoutes = require("./brothers");
const mailRoutes = require("./mail");

const apiConstructor = (app) => {
    app.use("/api/brothers", brothersRoutes);
    app.use("/api/mail", mailRoutes);

    app.use("*", (req, res) => {
        res.status(404).json({error: "Not found"});
    })
}

module.exports = apiConstructor;