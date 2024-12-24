const mongoose = require("mongoose");

const url = "mongodb://localhost:27017/example";
console.log("connecting to", url);
mongoose
  .connect(url, {})
  .then(() => console.log("connected to mongodb"))
  .catch(error => console.log("error connecting to mongodb: " + error));

const personSchema = new mongoose.Schema({
  number: String,
  name: String
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length < 3) {
  console.log("Phonebook:");
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person.toJSON());
    });
    mongoose.connection.close();
  });
  return;
}

const name = process.argv[2];
const number = process.argv[3];
const person = new Person({
  name: name,
  number: number
});

person.save().then(result => {
  console.log(`Saved ${result}`);
  mongoose.connection.close();
});
