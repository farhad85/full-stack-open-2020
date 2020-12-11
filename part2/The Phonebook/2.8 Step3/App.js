import React, { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

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
      {persons.map(v => <p key={v.name}>{v.name}  {v.number}</p>)}
    </div>
  );
};

export default App;