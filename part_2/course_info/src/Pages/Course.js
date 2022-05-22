import React from "react";
import Content from "../Components/Content";
import Header from "../Components/Header";
import Total from "../Components/Total";

const Course = ({ course }) => {
  return (
    <div>
      <li>
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
      </li>
    </div>
  );
};

export default Course;
