import React from "react";

const AddNewContact = ({
  addPerson,
  newName,
  newNumber,
  handleNewName,
  handleNewNumber,
}) => {
  return (
    <div>
      <form onSubmit={addPerson}>
        <h4>Add a New Contact</h4>
        <div>
          name: <input value={newName} onChange={handleNewName} />
        </div>
        <div>
          numbers: <input value={newNumber} onChange={handleNewNumber} />
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default AddNewContact;
