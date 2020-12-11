import React, { useState } from 'react';

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

  let filteredPerson = persons;
  if (search) {
    filteredPerson = persons.filter(x => x.name.toLowerCase().includes(search.toLowerCase()));
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with: <input onChange={(e) => setSearch(e.target.value)} value={search} />
      </div>
      <h3>add a new</h3>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input onChange={(e) => setNewName(e.target.value)} value={newName} />
        </div>
        <div>number: <input onChange={(e) => setNewNumber(e.target.value)} value={newNumber} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filteredPerson.map(v => <p key={v.name}>{v.name}  {v.number}</p>)}
    </div>
  );
};

export default App;