import React, { useEffect, useState } from 'react';
import Persons from './components/Persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Notification from './components/Notification';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');
  const [notification, setNotification] = useState();

  const showNotification = (message, isError) => {
    setNotification({ message, isError });
    setTimeout(() => setNotification(), 3000);
  };

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
        .put(persons[index].id, { name: newName, number: newNumber })
        .then(() => {
          showNotification(`Updated ${newName}`);
          clearTheForm();
        })
        .catch((error) => {
          if (error.response.status === 404) {
            showNotification(`Information of ${newName} has already been removed from server`, true);
            setPersons(x => x.filter((p, i) => i !== index));
          }
          else {
            showNotification(error.response.data.error, true);
          }
        });
    }
  };

  const create = () => {

    personService
      .create({ name: newName, number: newNumber })
      .then((res) => {
        showNotification(`Added ${newName}`);
        clearTheForm();
        setPersons(x => ([...x, { name: newName, number: newNumber, id: res.data.id }]));
      })
      .catch(error => showNotification(error.response.data.error, true));
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
      <Notification message={notification?.message} isError={notification?.isError} />
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