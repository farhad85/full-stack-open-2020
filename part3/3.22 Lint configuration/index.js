require('dotenv-flow').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const Person = require('./models/person');
const errorHandler = require('./middlewares/errorHandler');
const unknownEndpoint = require('./middlewares/unknownEndpoint');

morgan.token('body', function (req) { return JSON.stringify(req.body); });

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('build'));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

app.get('/api/persons', async (request, response) => {
    const persons = await Person.find();
    response.json(persons);
});

app.post('/api/persons', async (request, response, next) => {
    try {
        const person = await Person.create({ name: request.body.name, number: request.body.number });
        response.json({ id: person.id });
    }
    catch (error) {
        next(error);
    }
});

app.get('/api/person/:id', async (request, response, next) => {
    try {
        const person = await Person.findById(request.params.id);

        if (person) {
            response.json(person);
        }
        else {
            response.status(404).send({ error: 'NOT FOUND' });
        }

    }
    catch (error) {
        next(error);
    }
});


app.put('/api/person/:id', async (request, response, next) => {
    try {
        const person = await Person.findById(request.params.id);

        if (person) {
            person.name = request.body.name;
            person.number = request.body.number;
            await person.save();

            response.end();
        }
        else {
            response.status(404).send({ error: 'NOT FOUND' });
        }

    }
    catch (error) {
        next(error);
    }
});

app.delete('/api/person/:id', async (request, response) => {
    const deleteInfo = await Person.deleteOne({ _id: request.params.id });
    if (deleteInfo.deletedCount === 1) {
        response.send('OK');
    }
    else {
        response.status(404).send({ error: 'NOT FOUND' });
    }
});

app.get('/info', async (request, response) => {
    const count = await Person.countDocuments();

    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.write(`Phonebook has info for ${count} people`);
    response.write('\n');
    response.end(new Date().toString());
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.use(unknownEndpoint);
app.use(errorHandler);