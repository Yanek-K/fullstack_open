import React from "react";

const Part = ({ part }) => {
  const { name, exercises } = part;
  return (
    <div>
      <li>
        {name} {exercises}
      </li>
    </div>
  );
};

export default Part;
