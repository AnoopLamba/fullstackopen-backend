const express = require("express");
const morgan = require("morgan");
const app = express();

// middleware
app.use(express.json());

// morgan middleware
app.use(morgan("dev"));

// phonebook data
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

const baseUrl = "/api/persons";

app.get("/", (req, res) => {
  res.send("<h1>Hello 👋</h1>");
});

app.get(baseUrl, (req, res) => {
  res.json(persons);
});

app.get("/info", (req, res) => {
  let personsLength = persons.length;
  let currentTime = new Date();
  res.send(
    `<p>Phonebook has info for ${personsLength} people</p><p>${currentTime}</p>`
  );
});

app.get(`${baseUrl}/:id`, (req, res) => {
  const queryId = req.params.id;
  const matchingPerson = persons.find((person) => person.id == queryId);
  if (matchingPerson) {
    res
      .status(200)
      .json({ matchingPerson, message: "Person data", success: true });
  } else {
    res.status(404).json({ message: "No person found!", success: false });
  }
});

// delete sec
app.delete(`${baseUrl}/:id`, (req, res) => {
  const id = req.params.id;
  persons = persons.map((person) => person.id == id);
  res.status(204).end();
});

// to generate random id
const generateId = () => {
  const maxId = Math.max(...persons.map((person) => person.id));
  return maxId * Math.random().toFixed(3);
};

// add new person
app.post(baseUrl, (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res
      .status(404)
      .json({ message: "body or number is missing!", success: false });
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(person);
  res.status(200).json({ person, message: "Person data", success: true });
});

// another middleware to handle requests made to non-existing routes
const unknownEndpoint = (req, res, next) => {
  res.status(404).send({ error: "unknown endpoint" });
};

// using the above middleware
app.use(unknownEndpoint);

const PORT = 3001;
app.listen(PORT, () => {
  console.log("Server running at:", PORT);
});
