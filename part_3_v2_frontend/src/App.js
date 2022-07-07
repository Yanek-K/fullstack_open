import { useState } from "react";
import AddNewContact from "./components/AddNewContact";
import FindContact from "./components/FindContact";
import RenderContacts from "./components/RenderContacts";

const App = () => {
  const [filteredNames, setFilteredNames] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");
  const [persons, setPersons] = useState([
    {
      name: "Peanut",
      number: "1234",
      id: 1,
    },
    {
      name: "Butter",
      number: "1234",
      id: 2,
    },

    {
      name: "Cup",
      number: "1234",
      id: 3,
    },
    {
      name: "Cake",
      number: "1234",
      id: 4,
    },
  ]);

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    const duplicateMsg = `${newName} is already in the phonebook`;

    const duplicatePerson = persons.find((person) => person.name === newName);

    if (duplicatePerson) {
      alert(duplicateMsg);
    } else {
      setPersons(persons.concat(personObject));
      setNewName("");
      setNewNumber("");
    }
  };

  const handleNewName = (e) => setNewName(e.target.value);
  const handleNewNumber = (e) => setNewNumber(e.target.value);
  const handleSearchName = (e) => {
    setSearchName(e.target.value);
    setFilteredNames(
      persons.filter((person) =>
        person.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };
  const personsToShow = filteredNames.length === 0 ? persons : filteredNames;

  return (
    <div>
      <h2>Phonebook</h2>
      <FindContact
        searchName={searchName}
        handleSearchName={handleSearchName}
      />
      <AddNewContact
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNewName={handleNewName}
        handleNewNumber={handleNewNumber}
      />

      <h3>Contact List</h3>
      <RenderContacts persons={personsToShow} />
    </div>
  );
};

export default App;
