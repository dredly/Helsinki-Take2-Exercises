import { useState } from 'react'

const People = ({ personsArray }) => {
  return (
    <>
      {personsArray.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '123-456-789' }
  ])
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const handleNameChange = evt => {
    setNewName(evt.target.value);
  }

  const handleNumberChange = evt => {
    setNewNumber(evt.target.value);
  }

  const addPerson = evt => {
    evt.preventDefault();
    const matches = persons.filter(person => person.name === newName);
    if (matches.length) {
      return alert(`${newName} is already added to phonebook`);
    }
    setPersons(persons.concat({ name: newName, number: newNumber }));
    setNewName('');
    setNewNumber('');
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <People personsArray={persons} />
    </div>
  )
}

export default App;
