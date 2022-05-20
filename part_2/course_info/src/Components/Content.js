import React from "react";
import Part from "./Part";

const Content = ({ course }) => {
  const { parts } = course;

  return (
    <div>
      <ul>
        {parts.map((part) => (
          <Part key={part.id} part={part} />
        ))}
      </ul>
    </div>
  );
};

export default Content;
