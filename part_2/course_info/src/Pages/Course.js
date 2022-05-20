import React from "react";
import Content from "../Components/Content";
import Header from "../Components/Header";
import Total from "../Components/Total";

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};

export default Course;
