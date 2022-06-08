import React from "react";
import RenderContact from "./RenderContact";

const RenderContacts = ({ persons, deleteContact }) => {
  return (
    <div>
      <ul>
        {persons.map((person) => (
          <RenderContact
            key={person.id}
            person={person}
            deleteContact={() => deleteContact(person)}
          />
        ))}
      </ul>
    </div>
  );
};

export default RenderContacts;
