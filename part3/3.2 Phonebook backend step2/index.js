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


app.get('/api/persons', (request, response) => {
    response.json(peoples);
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