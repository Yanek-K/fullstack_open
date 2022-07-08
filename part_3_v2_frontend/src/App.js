import axios from "axios";
import { useEffect, useState } from "react";

// Components
import AddNewContact from "./components/AddNewContact";
import FindContact from "./components/FindContact";
import RenderContacts from "./components/RenderContacts";

// Services
import personService from "./services/persons";

const App = () => {
  const [filteredNames, setFilteredNames] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");
  const [persons, setPersons] = useState([]);
  const [notificationMessage, setNotificationMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

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
      if (window.confirm(duplicateMsg) === true) {
        updateContact(personObject);
      }
    } else {
      personService.create(personObject).then((newPerson) => {
        setPersons(persons.concat(newPerson));
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const deleteContact = (person) => {
    window.confirm(`Delete ${person.name}?`);
    personService
      .deletePerson(person)
      .then(() => {
        console.log(`${person.name} was deleted`);
      })
      .catch((error) => {
        console.log(error, `${person.name} not deleted`);
      });
    setPersons(persons.filter((p) => p.id !== person.id));
  };

  const updateContact = (nameObject) => {
    const person = persons.find((person) => person.name === nameObject.name);
    const updatedContact = { ...person, number: nameObject.number };
    personService.update(nameObject, updatedContact).then(() => {
      setPersons(
        persons.map((person) =>
          person.id !== nameObject.id ? person : updatedContact
        )
      );
    });
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
      <RenderContacts
        persons={personsToShow}
        deleteContact={(person) => deleteContact(person)}
      />
    </div>
  );
};

export default App;
