db.createUser({
  user: "the_username",
  pwd: "the_password",
  roles: [
    {
      role: "dbOwner",
      db: "the_database",
    },
  ],
});

db.createCollection("persons");

db.persons.insert({ name: "Arto Hellas", number: "040-123456" });
db.persons.insert({ name: "Ada Lovelace", number: "39-44-5323523" });
db.persons.insert({ name: "Dan Abramov", number: "12-43-234345" });
db.persons.insert({ name: "Mary Poppendieck", number: "39-23-6423122" });
