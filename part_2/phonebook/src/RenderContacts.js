import React from "react";

const RenderContacts = ({ name, number, deleteContact }) => {
  return (
    <div>
      <li>
        {name} {number}
        <button onClick={deleteContact}>Delete Contact</button>
      </li>
    </div>
  );
};

export default RenderContacts;
