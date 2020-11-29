import React from "react";

function Content({ contents }) {
  return (
    <div>
      {contents.map((v) => (
        <p key={v.part}>
          {v.part} {v.exercises}
        </p>
      ))}
    </div>
  );
}

export default Content;
