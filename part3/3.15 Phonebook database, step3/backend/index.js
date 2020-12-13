require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const Person = require('./models/person');

morgan.token('body', function (req, res) { return JSON.stringify(req.body); });

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

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

app.get('/api/persons', async (request, response) => {
    const persons = await Person.find();
    response.json(persons);
});

app.post('/api/persons', async (request, response) => {
    const body = request.body;

    if (!body.name) {
        response.status(400).json({ error: 'name is missing' });
        return;
    }
    if (!body.number) {
        response.status(400).json({ error: 'number is number' });
        return;
    }

    if (await Person.exists({ name: body.name })) {
        response.status(400).json({ error: 'name must be unique' });
        return;
    }

    const person = await Person.create({ name: body.name, number: body.number });
    response.json({ id: person.id });
});

app.get('/api/person/:id', async (request, response) => {
    try {
        const person = await Person.findById(request.params.id);
        response.json(person);
    }
    catch {
        response.status(404).send('NOT FOUND');
    }
});

app.delete('/api/person/:id', async (request, response) => {
    const deleteInfo = await Person.deleteOne({ _id: request.params.id });
    if (deleteInfo.deletedCount === 1) {
        response.send("OK");
    }
    else {
        response.status(404).send('NOT FOUND');
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