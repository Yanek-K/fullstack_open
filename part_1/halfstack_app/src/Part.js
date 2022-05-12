import React from "react";

const Part = (props) => {
  return (
    <div>
      {props.part} : {props.exercises}
    </div>
  );
};

export default Part;
