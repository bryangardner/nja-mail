const express = require("express");
const mailer = require('express-mailer');
const bodyParser = require("body-parser");
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars');
const properties = require('properties-parser');
const configRoutes = require("./routes");
const path = require('path');

const propertiesFile = "production.properties";

const app = express();
const static = express.static(__dirname + '/public');

const handlebarsInstance = exphbs.create({
    defaultLayout: 'main',
    // Specify helpers which are only registered on this instance.
    helpers: {
        asJSON: (obj, spacing) => {
            if (typeof spacing === "number")
                return new Handlebars.SafeString(JSON.stringify(obj, null, spacing));

            return new Handlebars.SafeString(JSON.stringify(obj));
        }
    },
    partialsDir: [
        'views/partials/'
    ]
});

const rewriteUnsupportedBrowserMethods = (req, res, next) => {
    // If the user posts to the server with a property called _method, rewrite the request's method
    // To be that method; so if they post _method=PUT you can now allow browsers to POST to a route that gets
    // rewritten in this middleware to a PUT route
    if (req.body && req.body._method) {
        req.method = req.body._method;
        delete req.body._method;
    }

    // let the next middleware run:
    next();
};

configProperties = properties.read(propertiesFile);

mailer.extend(app, {
    from: configProperties.from,
    host: configProperties.host,
    secureConnection: configProperties.secure,
    port: configProperties.port,
    transportMethod: configProperties.transportMethod,
    auth: {
        user: configProperties.user,
        pass: configProperties.pass
    }
})

app.use("/public", static);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(rewriteUnsupportedBrowserMethods);
app.engine('handlebars', handlebarsInstance.engine)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

configRoutes(app, configProperties);

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
});