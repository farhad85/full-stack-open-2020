import React from "react";

const Person = ({ person, onDelete }) => {
  const handleDelete = () => {
    if (window.confirm(`Delete ${person.name}?`)) {
      onDelete(person.id);
    }
  };

  return (
    <p>
      {person.name} {person.number}{" "}
      <button onClick={handleDelete}>delete</button>
    </p>
  );
};

export default Person;
