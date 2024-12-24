import { useState, useEffect } from "react";
import personsSvc from "./services/persons";

const Filter = ({ value, onChange }) => (
  <div>
    filter: <input value={value} onChange={onChange} />
  </div>
);

const PersonForm = ({ onSubmit, newName, handleNameChange, newNumber, handleNumberChange }) => (
  <form onSubmit={onSubmit}>
    <div>
      name: <input value={newName} onChange={handleNameChange} />
    </div>
    <div>
      number: <input value={newNumber} onChange={handleNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

const Content = ({ persons, allPersons, deletePerson }) => {
  const personsToShow = persons.length == 0 ? allPersons : persons;
  return (
    <ul>
      {personsToShow.map(p => (
        <li key={p.id}>
          {p.name} {p.number} <button onClick={() => deletePerson(p.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

const Notification = ({ message }) => {
  return message ? (
    <div id="notification" className={message.includes("ERROR") ? "error" : "success"}>
      {message}
    </div>
  ) : null;
};

const Phonebook = () => {
  const [allPersons, setAllPersons] = useState([]);
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    personsSvc.getAll().then(data => setAllPersons(data));
  }, []);

  const handleFilterChange = event => {
    const newFilter = event.target.value;
    setFilter(newFilter);
    const filteredPersons = () => allPersons.filter(p => p.name.includes(newFilter));
    setPersons(filteredPersons);
  };

  const addName = event => {
    event.preventDefault();
    const existingPerson = allPersons.find(p => p.name === newName);
    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, change telephone number?`)) {
        const updatedPerson = { ...existingPerson, number: newNumber };
        personsSvc.update(existingPerson.id, updatedPerson).then(up => {
          setAllPersons(allPersons.map(p => (p.id != up.id ? p : up)));
          setNewName("");
          setNewNumber("");
          setMessage(`Number changed for ${newName}`);
          setTimeout(() => setMessage(null), 5000);
        });
      }
      return;
    }

    const newPerson = { name: newName, number: newNumber };
    personsSvc
      .create(newPerson)
      .then(p => {
        setAllPersons([...allPersons, p]);
        setNewName("");
        setNewNumber("");
        setMessage(`Added ${newName}`);
        setTimeout(() => setMessage(null), 5000);
      })
      .catch(err => {
        setMessage(`[ERROR] ${err.response.data.error}`);
        setTimeout(() => setMessage(null), 5000);
      });
  };

  const deletePerson = id => {
    const selectedPerson = allPersons.find(p => p.id === id);
    if (window.confirm(`Delete ${selectedPerson.name} ?`)) {
      personsSvc
        .remove(id)
        .then(_res => {
          setAllPersons(allPersons.filter(p => p.id != id));
          setMessage(`Removed ${selectedPerson.name}`);
          setTimeout(() => setMessage(null), 5000);
        })
        .catch(err => {
          setMessage(`[ERROR] ${err.response.data.error}`);
          setTimeout(() => setMessage(null), 5000);
        });
    }
  };

  const handleNameChange = event => {
    setNewName(event.target.value);
  };

  const handleNumberChange = event => {
    setNewNumber(event.target.value);
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} />
      <Filter value={filter} onChange={handleFilterChange} />
      <h2>Add new</h2>
      <PersonForm
        onSubmit={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Content persons={persons} allPersons={allPersons} deletePerson={deletePerson} />
    </div>
  );
};

export default Phonebook;
