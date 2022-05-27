import React from "react";

const RenderContacts = ({ name, number }) => {
  return (
    <div>
      <li>
        {name} {number}
      </li>
    </div>
  );
};

export default RenderContacts;
