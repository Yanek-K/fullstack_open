import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

// Components
import NewContact from "./NewContact";
import RenderContacts from "./RenderContacts";
import backend from "./services/backend";

const App = () => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterBy, setFilterBy] = useState("");
  const [filteredNames, setFilteredNames] = useState("");
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    backend.getAll().then((initalPeople) => {
      setPersons(initalPeople);
    });
  }, []);

  const addName = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newName,
      id: newName,
      number: newNumber,
    };

    if (alreadyExists(nameObject)) {
      alert(`${newName}'s name is already in the list`);
    } else {
      backend
        .createContact(nameObject)
        .then((newPerson) => setPersons(persons.concat(newPerson)));
    }
    setNewName("");
    setNewNumber("");
  };

  const alreadyExists = (nameObject) => {
    persons.find(
      (person) => person.name.toLowerCase() === nameObject.name.toLowerCase()
    );
  };

  const handleFilterBy = (event) => {
    setFilterBy(event.target.value);
    const filterNames = persons.map((person) => person);
    setFilteredNames(
      filterNames.filter((person) => person.name.includes(event.target.value))
    );
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const deleteContact = (person) => {
    window.confirm(`Delete ${person.name}?`);
    const url = `http://localhost:3001/persons/${person.id}`;

    const newPersons = persons.filter((p) => p.id !== person.id);
    axios.delete(url).then(() => alert(`${person.name} has been deleted`));
    setPersons(newPersons);
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
              deleteContact={() => deleteContact(person)}
            />
          ))}{" "}
        </ul>
      ) : (
        <ul>
          {filteredNames.map((person) => (
            <RenderContacts
              key={person.id}
              name={person.name}
              number={person.number}
              deleteContact={() => deleteContact(person.id)}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
