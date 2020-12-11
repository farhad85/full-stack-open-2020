import React, { useEffect, useState } from 'react';
import Persons from './components/Persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    personService
      .getAll()
      .then(response => setPersons(response.data));
  }, []);

  const clearTheForm = () => {
    setNewName('');
    setNewNumber('');
  };

  const update = (index) => {
    if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
      setPersons(x => {
        const newPersons = [...x];
        newPersons[index].number = newNumber;
        return newPersons;
      });
      personService
        .put(persons[index].id, { name: newName, number: newNumber });

      clearTheForm();
    }
  };

  const create = () => {
    const id = persons[persons.length - 1].id + 1;
    setPersons(x => ([...x, { name: newName, number: newNumber, id }]));
    personService
      .create({ name: newName, number: newNumber, id });
    clearTheForm();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const personsIndex = persons.findIndex(x => x.name === newName);
    if (personsIndex >= 0) {
      update(personsIndex);
    }
    else {
      create();
    }
  };

  const handleDelete = (id) => {
    setPersons(x => x.filter(p => p.id !== id));
    personService
      .delete(id);
  };


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} setSearch={setSearch} />
      <h3>add a new</h3>
      <PersonForm
        onSubmit={handleSubmit}
        newNumber={newNumber}
        newName={newName}
        setNewNumber={setNewNumber}
        setNewName={setNewName}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} search={search} onDelete={handleDelete} />
    </div>
  );
};

export default App;