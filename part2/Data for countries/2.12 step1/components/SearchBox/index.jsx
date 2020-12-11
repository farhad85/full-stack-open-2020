const SearchBox = ({ search, setSearch }) => {
  return (
    <div>
      find countries:
      <input
        onChange={(event) => setSearch(event.target.value)}
        value={search}
      />
    </div>
  );
};

export default SearchBox;
