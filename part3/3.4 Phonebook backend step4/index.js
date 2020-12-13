const express = require('express');
const app = express();

let peoples = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
    }
];

const findPerson = (request, response) => {
    const person = peoples.find(x => x.id == request.params.id);
    if (!person) {
        response.status(404).send('NOT FOUND');
    }

    return person;
};

app.get('/api/persons', (request, response) => {
    response.json(peoples);
});

app.get('/api/person/:id', (request, response) => {
    const person = findPerson(request, response);
    if (person) {
        response.json(person);
    }
});

app.delete('/api/person/:id', (request, response) => {
    const person = findPerson(request, response);
    if (person) {
        peoples = peoples.filter(x => x !== person);
        response.send("OK");
    }
});

app.get('/info', (request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.write(`Phonebook has info for ${peoples.length} people`);
    response.write('\n');
    response.end(new Date().toString());
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});