import React from "react";
import Header from "../Header";
import Content from "../Content";

function Course({ course }) {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
    </div>
  );
}

export default Course;
