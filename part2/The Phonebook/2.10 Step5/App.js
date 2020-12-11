import React, { useState } from 'react';
import Persons from './components/Persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (persons.find(x => x.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    setPersons(x => ([...x, { name: newName, number: newNumber }]));
    setNewName('');
    setNewNumber('');
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
      <Persons persons={persons} search={search} />
    </div>
  );
};

export default App;