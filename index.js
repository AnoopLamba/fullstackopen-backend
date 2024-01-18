const express = require("express");
const app = express();

// middleware
app.use(express.json());

// phonebook data
const persons = [
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
    return res
      .status(200)
      .json({ matchingPerson, message: "Person data", success: true });
  } else {
    return res
      .status(404)
      .json({ message: "No person found!", success: false });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log("Server running at:", PORT);
});
