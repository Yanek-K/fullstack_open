import React from "react";

const RenderContact = ({ person, deleteContact }) => {
  return (
    <div>
      <li>
        {person.name} - {person.number}
        <button onClick={deleteContact}>Delete</button>
      </li>
    </div>
  );
};

export default RenderContact;
