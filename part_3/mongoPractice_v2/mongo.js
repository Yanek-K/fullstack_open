const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provice the password as an argument: node mongo.js <password>"
  );
}

const password = process.argv[2];

const url = `mongodb+srv://fullstackopen:${password}@cluster0.butwf.mongodb.net/personApp?retryWrites=true&w=majority`;

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  id: String,
});

const Person = mongoose.model("Person", personSchema);

// Add to the Database
if (process.argv.length === 5) {
  mongoose
    .connect(url)
    .then((result) => {
      console.log("connected");

      const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
      });

      return person.save();
    })
    .then(() => {
      console.log("Person saved!");
      return mongoose.connection.close();
    })
    .catch((err) => console.log(err));
}
// Fetch from the Database

if (process.argv.length === 3) {
  mongoose.connect(url).then((result) => {
    console.log("connected!");

    Person.find({}).then((result) => {
      console.log("Phonbook:");
      result.forEach((person) => {
        console.log(`${person.name} : ${person.number}`);
      });
      mongoose.connection.close();
    });
  });
}
