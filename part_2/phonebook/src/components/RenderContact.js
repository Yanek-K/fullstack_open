import React from "react";

const RenderContact = ({ person, deleteContact }) => {
  const { name, number } = person;

  return (
    <div>
      <li>
        {name} - {number}
        <button onClick={deleteContact}>Delete</button>
      </li>
    </div>
  );
};

export default RenderContact;
