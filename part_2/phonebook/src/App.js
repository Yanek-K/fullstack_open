import { useState } from "react";
import "./App.css";
import FilterNames from "./FilterNames";
import NewContact from "./NewContact";
import RenderContacts from "./RenderContacts";

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: "Arto Hellas",
      id: "Arto Hellas",
      number: "647 - 233 - 1542",
    },
    {
      name: "Mik Jenkins",
      id: "Mik Jenkins",
      number: "747 - 412 - 5241",
    },
    {
      name: "Ana Conseulas",
      id: "Ana Conseulas",
      number: "595 - 343 - 7427",
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

  const handleFilterBy = (event) => {
    setFilterBy(event.target.value);
    let filteredNames = persons.map((person) => person.name);
    filteredNames.forEach((name) => {
      name.toLowerCase().includes(filterBy.trim().toLowerCase());
    });
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
      <NewContact
        addName={addName}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />
      {filterBy === "" ? (
        <ul>
          {persons.map((person) => (
            <RenderContacts
              key={person.id}
              name={person.name}
              number={person.number}
            />
          ))}
        </ul>
      ) : (
        <FilterNames />
      )}
    </div>
  );
};

export default App;
