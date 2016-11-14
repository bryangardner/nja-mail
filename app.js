const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const static = express.static(__dirname + '/public');

const interfaceRoutesConfig = require("./routes");
const apiRoutesConfig = require("./routes/apis")

app.use("/public", static);
app.use(bodyParser.json());

apiRoutesConfig(app);
interfaceRoutesConfig(app);

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
});