const moment = require("moment");
const morgan = require("morgan");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(morgan("tiny"));
app.use(express.json());
app.use(cors());

morgan.token("person", (request, response) => {
  return JSON.stringify(request.body);
});

app.use(
  morgan(
    ":method :url :status :res[content-lenght] - :response-time ms :person"
  )
);

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const generateId = () => {
  return Math.floor(Math.random() * 10000);
};

const duplicatePerson = (person) => {
  return persons.find(
    (p) => p.name.toLowerCase() === person.name.toLowerCase()
  );
};

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/info", (request, response) => {
  const personsLength = persons.length;
  const personsMsg = `Phonebook has info for ${personsLength} people`;
  const date = new Date();
  const formattedDate = moment(date).format("LLLL");
  const dateMsg = `${formattedDate} UTC/GMT -0400 hours (Eastern Daylight Time)`;
  const finalMsg = `<p>${personsMsg}</p> <p>${dateMsg}</p>`;
  response.send(finalMsg);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.statusMessage = "Sorry, no person found with that ID";
    response.status(404).end();
  }
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "Name or Number is missing",
    });
  }
  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };
  if (duplicatePerson(person)) {
    return response.status(400).json({
      error: "Name must be unique",
    });
  }
  persons = persons.concat(person);
  response.json(person);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
