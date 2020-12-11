import React from "react";

function Total({ parts }) {
  return (
    <strong>
      total of {parts.reduce((v, x) => (v += x.exercises), 0)} exercises
    </strong>
  );
}

export default Total;
