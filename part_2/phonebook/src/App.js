import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

// Components
import NewContact from "./NewContact";
import RenderContacts from "./RenderContacts";
import backend from "./services/backend";
import Notification from "./Notification";

const App = () => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterBy, setFilterBy] = useState("");
  const [filteredNames, setFilteredNames] = useState("");
  const [persons, setPersons] = useState([]);
  const [notificationMessage, setNotificationMessage] = useState(null);

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

    const msg = `${newName}'s name is already in the list, replace
    the old number with a new one?`;

    const duplicatePerson = persons.find(
      (p) => p.name.toLowerCase() === nameObject.name.toLowerCase()
    );

    if (duplicatePerson) {
      if (window.confirm(msg) === true) {
        updateContact(nameObject);
        setNotificationMessage({
          text: `${nameObject.name} was successfully updated`,
          type: "notification",
        });
        setTimeout(() => {
          setNotificationMessage(null);
        }, 5000);
      }
    } else {
      backend
        .createContact(nameObject)
        .then((newPerson) => setPersons(persons.concat(newPerson)))
        .then(() => {
          setNotificationMessage({
            text: `${nameObject.name} was successfully added`,
            type: "notification",
          });
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);
        });
    }
    setNewName("");
    setNewNumber("");
  };

  const deleteContact = (person) => {
    window.confirm(`Delete ${person.name}?`);
    const newPersons = persons.filter((p) => p.id !== person.id);
    backend
      .deleteContact(person)
      .then(() =>
        setNotificationMessage({
          text: `${person.name} was successfully deleted`,
          type: "notification",
        })
      )
      .catch((error) => {
        setNotificationMessage({
          text: `${person.name} was already deleted from the database`,
          type: "error",
        });
        setTimeout(() => {
          setNotificationMessage(null);
        }, 5000);
      });
    setPersons(newPersons);
  };

  const updateContact = (nameObject) => {
    const person = persons.find((person) => person.name === nameObject.name);
    const updatedContact = { ...person, number: nameObject.number };
    backend
      .updateContact(nameObject, updatedContact)
      .then(() =>
        setPersons(
          persons.map((person) =>
            person.id !== nameObject.id ? person : updatedContact
          )
        )
      );
  };

  const handleFilterBy = (event) => {
    setFilterBy(event.target.value);
    const filterNames = persons.map((person) => person);
    setFilteredNames(
      filterNames.filter((person) => person.name.includes(event.target.value))
    );
  };

  const handleNameChange = (e) => setNewName(e.target.value);
  const handleNumberChange = (e) => setNewNumber(e.target.value);

  return (
    <div>
      <h1>Phonebook</h1>
      {notificationMessage !== null ? (
        <Notification
          text={notificationMessage.text}
          type={notificationMessage.type}
        />
      ) : null}
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
