const mongoose = require('mongoose');

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>');
    process.exit(1);
}

const password = process.argv[2];

const url =
    `mongodb+srv://app:${password}@cluster0.qiyjw.mongodb.net/test?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
});

const Person = mongoose.model('Person', personSchema);


if (process.argv.length === 5) {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
    });

    person.save().then(result => {
        console.log(`added ${person.name} number ${person.number} to phonebook`);
        mongoose.connection.close();
    });
}
else {
    Person
        .find()
        .then(persons => {
            console.log("phonebook:");
            persons.forEach(x => console.log(x.name + " " + x.number));
            mongoose.connection.close();
        });
}