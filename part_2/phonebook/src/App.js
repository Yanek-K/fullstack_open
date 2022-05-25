import { useState } from "react";
import "./App.css";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", id: "Arto Hellas" },
    { name: "Pablo Conseulas", id: "Pablo Conseulas" },
  ]);
  const [newName, setNewName] = useState("");

  const addName = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newName,
      id: newName,
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
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <li key={person.id}>{person.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
