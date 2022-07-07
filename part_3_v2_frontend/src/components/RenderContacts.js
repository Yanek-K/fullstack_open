import React from "react";
import RenderContact from "./RenderPerson";

const RenderContacts = ({ persons }) => {
  return (
    <div>
      <ul>
        {persons.map((person) => (
          <RenderContact key={person.id} person={person} />
        ))}
      </ul>
    </div>
  );
};

export default RenderContacts;
