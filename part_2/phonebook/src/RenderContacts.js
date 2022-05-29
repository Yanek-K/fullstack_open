import React from "react";

const RenderContacts = (props) => {
  const { name, number } = props;
  return (
    <div>
      <li>
        {name} {number}
      </li>
    </div>
  );
};

export default RenderContacts;
