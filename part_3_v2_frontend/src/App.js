import { useEffect, useState } from "react";

// Components
import AddNewContact from "./components/AddNewContact";
import FindContact from "./components/FindContact";
import Notification from "./components/Notification";
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
    };

    const duplicateMsg = `${newName} is already in the phonebook, replace the old number with a new one?`;
    const duplicatePerson = persons.find((person) => person.name === newName);

    if (!personObject.name || !personObject.number) {
      setNotificationMessage({
        text: `Missing required fields`,
        type: "error",
      });
    }

    if (duplicatePerson) {
      if (window.confirm(duplicateMsg) === true) {
        updateContact(personObject);
        setNotificationMessage({
          text: `${personObject.name} was successfully updated in the phonebook`,
          type: "notification",
        });
      }
    } else {
      personService
        .create(personObject)
        .then((newPerson) => setPersons(persons.concat(newPerson)))
        .then(() =>
          setNotificationMessage({
            text: `${personObject.name} was successfully added to the phonebook`,
            type: "notification",
          })
        )
        .catch((error) => {
          setNotificationMessage({
            text: `${error.response.data.error}`,
            type: "error",
          });
        });
    }
    setTimeout(() => {
      setNotificationMessage(null);
    }, 5000);
    setNewName("");
    setNewNumber("");
  };

  const updateContact = (nameObject) => {
    const person = persons.find((person) => person.name === nameObject.name);
    const updatedContact = { ...person, number: nameObject.number };
    personService
      .update(person, updatedContact)
      .then((returnedPerson) => {
        setPersons(
          persons.map((person) =>
            person.name !== nameObject.name ? person : returnedPerson
          )
        );
      })
      .then(() =>
        setNotificationMessage({
          text: `${nameObject.name} was successfully updated in the phonebook`,
          type: "notification",
        })
      )
      .catch((error) => {
        setNotificationMessage({
          text: `${error.response.data.error}`,
          type: "error",
        });
      });
    setTimeout(() => {
      setNotificationMessage(null);
    }, 5000);
  };

  const deleteContact = (person) => {
    window.confirm(`Delete ${person.name}?`);
    personService
      .deletePerson(person)
      .then(() =>
        setNotificationMessage({
          text: `${person.name} was successfully deleted from the phonebook`,
          type: "notification",
        })
      )
      .catch((error) => {
        setNotificationMessage({
          text: `${person.name} was already deleted from the database`,
          type: "error",
        });
      });
    setTimeout(() => {
      setNotificationMessage(null);
    }, 5000);

    setPersons(persons.filter((p) => p.id !== person.id));
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
      {notificationMessage !== null ? (
        <Notification message={notificationMessage} />
      ) : null}

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
