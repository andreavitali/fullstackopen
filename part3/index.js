require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const Person = require("./models/person");

// let persons = [
//   {
//     id: "1",
//     name: "Arto Hellas",
//     number: "040-123456"
//   },
//   {
//     id: "2",
//     name: "Ada Lovelace",
//     number: "39-44-5323523"
//   },
//   {
//     id: "3",
//     name: "Dan Abramov",
//     number: "12-43-234345"
//   },
//   {
//     id: "4",
//     name: "Mary Poppendieck",
//     number: "39-23-6423122"
//   }
// ];

app.use(
  morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      JSON.stringify(req.body)
    ].join(" ");
  })
);

app.use(express.static("dist"));
app.use(express.json());
app.use(cors());

// Endpoints

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/info", (request, response) => {
  Person.countDocuments().then(n => {
    response.send(`
    <p>Phonebook has info on ${n} people</p>
    <p>${new Date().toLocaleString()}</p>
  `);
  });
});

app.get("/api/persons", (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons.map(p => p.toJSON()));
  });
});

app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch(error => next(error));
});

app.post("/api/persons", (request, response, next) => {
  const name = request.body.name;
  const number = request.body.number;
  if (!name || !number) {
    return response.status(400).json({ error: "field missing" });
  }

  const person = new Person({
    name,
    number
  });

  person
    .save()
    .then(result => {
      response.json(result);
    })
    .catch(error => next(error));

  // if (persons.find(p => p.name.toLowerCase() === name.toLowerCase())) {
  //   response.json({ error: "name must be unique" });
  // } else {
  //   const newId = Math.max(...persons.map(p => parseInt(p.id))) + 1;
  //   const person = { ...request.body, id: newId.toString() };
  //   persons = [...persons, person];
  //   response.json(person);
  // }
});

app.put("/api/persons/:id", (request, response, next) => {
  const { name, number } = request.body;

  Person.findByIdAndUpdate(request.params.id, { name, number }, { new: true, runValidators: true, context: "query" })
    .then(updatedPerson => {
      response.json(updatedPerson);
    })
    .catch(error => next(error));
  // const existingPerson = persons.find(person => person.id === request.params.id);
  // if (!existingPerson) {
  //   response.status(404).end();
  // } else {
  //   const person = {
  //     name: request.body.name,
  //     number: request.body.number
  //   };
  //   const updatedPerson = { ...person, id: existingPerson.id };
  //   persons = persons.map(p => (p.id === existingPerson.id ? updatedPerson : p));
  //   response.json(updatedPerson);
  // }
});

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      console.log(result);
      response.status(204).end();
    })
    .catch(error => next(error));
});

// Error handlers

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

// Start app

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
