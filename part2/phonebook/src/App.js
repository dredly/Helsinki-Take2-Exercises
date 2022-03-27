import { useState, useEffect } from 'react';
import axios from 'axios';
import personService from './services/persons';

const Filter = ({ searchText, handleSearch }) => (
  <p>Filter shown with <input value={searchText} onChange={handleSearch} /></p>
);

const PersonForm = (props) => (
  <form onSubmit={props.addPerson}>
    <div>
      name: <input value={props.newName} onChange={props.handleNameChange} />
      number: <input value={props.newNumber} onChange={props.handleNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

const People = ({ personsArray, searchText }) => {
  return (
    <>
      {
        personsArray
          .filter(person => person.name.toLowerCase().includes(searchText.toLowerCase()))
          .map(person => <p key={person.id}>{person.name} {person.number}</p>)
      }
    </>
  )
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      })
  }, []);

  const handleNameChange = evt => {
    setNewName(evt.target.value);
  }

  const handleNumberChange = evt => {
    setNewNumber(evt.target.value);
  }

  const handleSearch = evt => {
    setSearchText(evt.target.value);
    console.log(evt.target.value);
  }

  const addPerson = evt => {
    evt.preventDefault();
    const matches = persons.filter(person => person.name === newName);
    if (matches.length) {
      return alert(`${newName} is already added to phonebook`);
    }
    const personObj = {
      name: newName,
      number: newNumber
    }
    personService
      .create(personObj)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        setNewName('');
        setNewNumber('');
      })
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter searchText={searchText} handleSearch={handleSearch} />
      <h2>Add new entry</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <People personsArray={persons} searchText={searchText} />
    </div>
  )
}

export default App;
