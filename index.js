const { request, response } = require("express");
const express = require("express");
const app = express();
app.use(express.json());

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
];

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  let id = Number(request.params.id);
  let person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else response.status(404).end();
});

app.delete("/api/persons/:id", (request, response) => {
  let id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  let person = request.body;
  if (persons.find((savedPerson) => savedPerson.name === person.name)) {
    return response.status(400).json({
      error: "name must be unique",
    });
  } else if (person.name && person.number) {
    person.id = Math.floor(Math.random() * 100000000);
    persons = persons.concat(person);
    return response.json(person);
  } else {
    return response.status(400).json({
      error: "content missing",
    });
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

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
