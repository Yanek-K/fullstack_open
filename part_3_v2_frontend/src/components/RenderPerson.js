import React from "react";

const RenderContact = ({ person }) => {
  return (
    <div>
      <li>
        {person.name} - {person.number}
      </li>
    </div>
  );
};

export default RenderContact;
