import React from "react";

const Total = ({ course }) => {
  const { parts } = course;
  const totalExercises = parts
    .map((part) => part.exercises)
    .reduce((curr, val) => curr + val, 0);

  return (
    <div>
      <p>
        <strong>Total of {totalExercises} exercises</strong>
      </p>
    </div>
  );
};

export default Total;
