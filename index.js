const { request, response } = require("express");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require('dotenv').config();

const Person = require('./models/person');
const person = require("./models/person");

const app = express();
app.use(express.json());
app.use(express.static('build'));
morgan.token("content", function (req, res) {
  return JSON.stringify(req.body);
});
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :content"
  )
);
app.use(cors());

app.get("/api/persons", (request, response) => {
  Person.find({}).then(people => {
    response.json(people)
  })
});

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id).then(person => {
    if (person) {
      response.json(person);
    } else response.status(404).end();
  })

});

app.delete("/api/persons/:id", (request, response) => {
  let id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  let person = request.body;
  if (person.name && person.number) {
    console.log('creating new peep');
    let newPerson = new Person({
      name: person.name,
      number: person.number
    })
    newPerson.save().then(savedPerson => {
      console.log(`Added ${person.name} with number ${person.number}`);
      response.json(savedPerson)
    })
  } else {
    return response.status(400).json({
      error: 'fields missing'
    })
  }
});

app.get("/info", (request, response) => {
  let d = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  response.send(`
    <div>
      <div>Phonebook has info for ${persons.length} people</div>
      <div>${`${days[d.getDay()]} ${
        months[d.getMonth()]
      } ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`}</div>
    </div>`);
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
