const path = require("path");

const interfaceConstructorMethod = (app) => {
    app.get("/", (req, res) => {
        let page = path.resolve(`static/index.html`);
        res.sendFile(page);
    });

    app.use("*", (req, res) => {
        let page = path.resolve(`static/notfound.html`);
        res.status(404).sendFile(page);
    })
}

module.exports = interfaceConstructorMethod;