import { useEffect, useState } from "react";
import "./index.css";

// Components
import NewContact from "./components/NewContact";
import Notification from "./components/Notification";
import RenderContacts from "./components/RenderContacts";

// Backend
import backend from "./services/backend";

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
        })

        .catch((error) => {
          setNotificationMessage({
            text: `There was an error, please try again, maybe this can help ${error}`,
            type: "error",
          });
        });
    }
    setNewName("");
    setNewNumber("");
  };

  const deleteContact = (person) => {
    window.confirm(`Delete ${person.name}?`);
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

    setPersons(persons.filter((p) => p.id !== person.id));
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
    setFilteredNames(
      persons.filter((person) => person.name.includes(event.target.value))
    );
  };

  const handleNameChange = (e) => setNewName(e.target.value);
  const handleNumberChange = (e) => setNewNumber(e.target.value);
  const personsToShow = filterBy.length === 0 ? persons : filteredNames;

  return (
    <div>
      <h1>Phonebook</h1>
      {notificationMessage !== null ? (
        <Notification notificationMessage={notificationMessage} />
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
      <RenderContacts
        persons={personsToShow}
        deleteContact={(person) => deleteContact(person)}
      />
    </div>
  );
};

export default App;
