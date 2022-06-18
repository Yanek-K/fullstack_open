const mongoose = require("mongoose");

const password = process.argv[2];
const url = `mongodb+srv://fullstack:${password}@cluster0.butwf.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

// Check if password exists
if (process.argv.length < 3) {
  console.log("Please provide the password");
  process.exit(1);
}

// Create Schema
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

// Log all users to console
if (process.argv.length === 3) {
  console.log("Getting all info from database...");
  mongoose.connect(url);
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person);
    });
    mongoose.connection.close();
  });
}

// Create a new person
if (process.argv.length > 4) {
  mongoose
    .connect(url)
    .then((result) => {
      console.log("Connection Established with Database");

      const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
      });
      return person.save();
    })
    .then(() => {
      console.log("Person added Successfully");
      return mongoose.connection.close();
    })
    .catch((error) => console.log(error));
}
