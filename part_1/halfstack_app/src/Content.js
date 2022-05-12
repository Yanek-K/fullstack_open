import React from "react";

const Content = (props) => {
  return (
    <div>
      {props.part} : {props.exercises}
    </div>
  );
};

export default Content;
