const mongoCollections = require('../config/').mongoCollections
const people = mongoCollections.people;
const uuid = require('node-uuid');

let exportedMethods = {
    getAllPeople() {
        return people().then((peopleCollection) => {
            return peopleCollection.find({}).toArray();
        })
    },

    getPersonById(id) {
        if (!id) return Promise.reject("No ID specified");
        return people().then((peopleCollection) => {
            return peopleCollection.findOne({ _id: id })
                .then((person) => {
                    if (!person) {
                        return Promise.reject(`Person with ${id} not found`);
                    }
                    else {
                        return person;
                    }
                })
        })
    },

    addPerson(firstName, lastName, email) {
        if (!firstName) return Promise.reject("No first name supplied");
        if (!lastName) return Promise.reject("No last name supplied");
        if (!email) return Promise.reject("No email address supplied");

        return people().then((peopleCollection) => {
            let newPerson = {
                _id: uuid.v4(),
                firstName: firstName,
                lastName: lastName,
                email: email
            };
            return peopleCollection.insertOne(newPerson)
                .then((newInsertInformation) => {
                    return newInsertInformation.insertedId;
                })
                .then((newId) => {
                    return this.getPersonById(newId);
                })
        })
    },

    editPerson(id, updatedInfo) {
        if (!id) return Promise.reject("No ID specified");
        if (!updatedInfo) return Promise.reject("No update info specified");
        return people().then((peopleCollection) => {
            return this.getPersonById(id)
                .then((person) => {
                    let updatedPersonData = {};

                    if (updatedInfo.lastName) {
                        updatedPersonData.lastName = updatedInfo.lastName;
                    }
                    if (updatedInfo.firstName) {
                        updatedPersonData.firstName = updatedInfo.firstName;
                    }
                    if (updatedInfo.email) {
                        updatedPersonData.email = updatedInfo.email;
                    }
                    if (updatedInfo.residence) {
                        updatedPersonData.residence = updatedInfo.residence;
                    }

                    let updateCommand = {
                        $set: updatedPersonData
                    }
                    return peopleCollection.updateOne({
                        _id: id
                    }, updateCommand)
                        .then((result) => {
                            return this.getPersonById(id);
                        })
                })
        })
    },

    deletePerson(id) {
        if (!id) return Promise.reject("No ID specified");
        return people().then((peopleCollection) => {
            return peopleCollection.removeOne({ _id: id })
                .then((deletionInfo) => {
                    if (deletionInfo.deletedCount === 0) {
                        return Promise.reject(`Could not delete user with ID of ${id}`);
                    }
                    else {
                        return Promise.resolve(`Deleted user with ID of ${id}`);
                    }
                })
        })
    }
}

module.exports = exportedMethods;