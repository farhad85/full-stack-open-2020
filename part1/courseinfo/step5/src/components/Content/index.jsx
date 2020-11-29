import React from "react";
import Part from "../Part";

function Content({ parts }) {
  return (
    <div>
      {parts.map((p) => (
        <Part key={p.name} part={p.name} exercises={p.exercises} />
      ))}
    </div>
  );
}

export default Content;
