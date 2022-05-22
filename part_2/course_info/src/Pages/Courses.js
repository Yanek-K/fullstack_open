import React from "react";
import Course from "./Course";

const Courses = ({ courses }) => {
  return (
    <div>
      <ul>
        {courses.map((course) => (
          <Course key={course.id} course={course} />
        ))}
      </ul>
    </div>
  );
};

export default Courses;
