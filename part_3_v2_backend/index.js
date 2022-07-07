const express = require("express");
const app = express();
const morgan = require("morgan");

app.use(express.json());

morgan.token("person", (req, res) => {
  return JSON.stringify(req.body);
});

app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :person"
  )
);

let persons = [
  {
    name: "Pete",
    number: "1234",
    id: 1,
  },
  {
    name: "Ana",
    number: "12345",
    id: 2,
  },
  {
    name: "Michael",
    number: "123456",
    id: 3,
  },
];

app.get("/", (req, res) => {
  res.send("<h1>HELLoo WORLD</h1>");
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
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

const generateId = () => {
  return Math.floor(Math.random() * 100000);
};

const duplicatePerson = (person) => {
  return persons.find(
    (p) => p.name.toLowerCase() === person.name.toLowerCase()
  );
};

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "Name or Number is missing",
    });
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  if (duplicatePerson(person)) {
    return res.status(400).json({
      error: "Name must be unique",
    });
  }

  persons = persons.concat(person);
  console.log(`${person.name} added successfully`);
  res.json(persons);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  try {
    persons = persons.filter((persons) => persons.id !== id);
    console.log(`Person with id ${id} deleted`);
  } catch (error) {
    console.log(error);
  }
  {
  }
  response.status(204).end();
});

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
