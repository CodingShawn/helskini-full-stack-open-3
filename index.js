/* eslint-disable no-console */
/* eslint-disable func-names */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable prefer-arrow-callback */
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const Person = require('./models/person');

const errorHandler = (error, request, response, next) => {
  console.log(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformmatted id' });
  } if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

const app = express();
app.use(express.json());
app.use(express.static('build'));
morgan.token('content', function (req, res) {
  return JSON.stringify(req.body);
});

app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :content',
  ),
);
app.use(cors());

app.get('/api/persons', (request, response) => {
  Person.find({}).then((people) => {
    response.json(people);
  });
});

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else response.status(404).end();
    })
    .catch((error) => {
      console.log(error);
      return next(error);
    });
});

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndRemove(request.params.id).then(() => {
    response.status(204).end();
  });
});

app.post('/api/persons', (request, response, next) => {
  const person = request.body;
  if (person.name && person.number) {
    const newPerson = new Person({
      name: person.name,
      number: person.number,
    });
    newPerson
      .save()
      .then((savedPerson) => {
        console.log(`Added ${person.name} with number ${person.number}`);
        response.json(savedPerson);
      })
      .catch((error) => next(error));
  } else {
    return response.status(400).json({
      error: 'fields missing',
    });
  }
});

app.use(errorHandler);

app.put('/api/persons/:id', (request, response, next) => {
  const { body } = request;

  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => next(error));
});

app.get('/info', (request, response) => {
  const d = new Date();
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  Person.find({}).then((persons) => {
    response.send(`
    <div>
      <div>Phonebook has info for ${persons.length} people</div>
      <div>${`${days[d.getDay()]} ${
    months[d.getMonth()]
  } ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`}</div>
    </div>`);
  });
});

const { PORT } = process.env;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${PORT}`);
});
