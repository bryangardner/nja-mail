const collections = require("./mongoCollections");
const connection = require("./mongoConnection");

module.exports = {
    mongoCollections: collections,
    mongoConnection: connection
}
