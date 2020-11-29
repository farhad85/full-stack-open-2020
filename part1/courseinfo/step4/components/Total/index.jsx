import React from "react";

function Total({ parts }) {
  return (
    <p>Number of exercises {parts.reduce((v, x) => (v += x.exercises), 0)}</p>
  );
}

export default Total;
