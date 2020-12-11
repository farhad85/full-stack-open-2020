import React from "react";

const Filter = ({ setSearch, search }) => {
  return (
    <div>
      filter shown with:{" "}
      <input onChange={(e) => setSearch(e.target.value)} value={search} />
    </div>
  );
};

export default Filter;
