import { useState } from "react";
import "./App.css";

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: "Arto Hellas",
      id: "Arto Hellas",
      number: "647 - 233 - 1542",
    },
    {
      name: "Pablo Conseulas",
      id: "Pablo Conseulas",
      number: "647 - 223 - 1242",
    },
  ]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterBy, setFilterBy] = useState("");

  const addName = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newName,
      id: newName,
      number: newNumber,
    };
    const person = persons.find(
      (person) => person.name.toLowerCase() === nameObject.name.toLowerCase()
    );

    if (person) {
      alert(`${newName}'s name is already in the list`);
    } else {
      setPersons(persons.concat(nameObject));
    }
    setNewName("");
    setNewNumber("");
  };

  const filterName = () => {};

  const handleFilterBy = (event) => {
    setFilterBy(event.target.value);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <div>
        Filter shown with: <input value={filterBy} onChange={handleFilterBy} />
      </div>
      <form onSubmit={addName}>
        <h2>Add a New Contact</h2>
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
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <li key={person.id}>
            {person.name} {person.number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
