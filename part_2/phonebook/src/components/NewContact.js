import React from "react";

const NewContact = ({
  addName,
  handleNameChange,
  handleNumberChange,
  newName,
  newNumber,
}) => {
  return (
    <div>
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
    </div>
  );
};

export default NewContact;
