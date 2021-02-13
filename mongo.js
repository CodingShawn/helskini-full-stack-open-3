const mongoose = require('mongoose');

if (process.argv.length < 3 ) {
  console.log('Please provide the password as an argument: node mongo.js <password>');
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://phonebook:${password}@cluster0.fify5.mongodb.net/phonebook-app?retryWrites=true&w=majority
`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: Number
})

const Person = mongoose.model('Person', personSchema);

if (process.argv.length == 5) {
  let inputName = process.argv[3];
  let inputNumber = process.argv[4];

  const person = new Person({
    name: inputName,
    number: inputNumber
  })

  person.save().then(result => {
    console.log(`Added ${inputName} with number ${inputNumber} to phonebook`);
    mongoose.connection.close();
  })
} else if (process.argv.length == 3) {
  console.log('Phonebook:');
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`);
    })
    mongoose.connection.close()
  })
}
