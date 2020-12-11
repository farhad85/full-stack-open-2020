import React from "react";
import Person from "../Person";

const Persons = ({ search, persons }) => {
  let filteredPerson = persons;
  if (search) {
    filteredPerson = persons.filter((x) =>
      x.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  return filteredPerson.map((v) => <Person key={v.name} person={v} />);
};

export default Persons;
