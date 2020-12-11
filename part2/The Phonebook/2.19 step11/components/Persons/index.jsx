import React from "react";
import Person from "../Person";

const Persons = ({ search, persons, onDelete }) => {
  let filteredPerson = persons;
  if (search) {
    filteredPerson = persons.filter((x) =>
      x.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  return filteredPerson.map((v) => (
    <Person key={v.id} person={v} onDelete={onDelete} />
  ));
};

export default Persons;
