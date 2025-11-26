const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("we need a password");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://nickmeinhold_db_user:${password}@fullstackopen.iltu0oz.mongodb.net/personApp?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);

const personSchema = new mongoose.Schema({
  id: Number,
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length == 3) {
  mongoose.connect(url);
  Person.find({}).then((result) => {
    result.forEach((note) => {
      console.log(note);
    });
    mongoose.connection.close();
  });
  return;
}

// Connect to MongoDB
mongoose.connect(url);

const person = new Person({
  id: Math.ceil(Math.random() * 1000),
  name: process.argv[3],
  number: process.argv[4],
});

person.save().then((result) => {
  console.log("person saved!");
  mongoose.connection.close();
});

// const person = new Person({
//   id: "1",
//   name: "Arto Hellas",
//   number: "040-123456",
// });

// const connectAndSave = async () => {
//   try {
//     await mongoose.connect(url);
//     console.log("Connected to MongoDB");

//     // Save all persons
//     await Promise.all([
//       person1.save(),
//       person2.save(),
//       person3.save(),
//       person4.save(),
//     ]);

//     console.log("All persons saved!");
//   } catch (error) {
//     console.log("Error:", error.message);
//   } finally {
//     await mongoose.connection.close();
//     console.log("Connection closed");
//   }
// };

// connectAndSave();
