const CountryInfo = ({ country }) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <p>
        capital: <strong>{country.capital}</strong>
      </p>
      <p>
        population: <strong>{country.population}</strong>
      </p>
      <h2>languages</h2>
      <ul>
        {country.languages.map((v) => (
          <li key={v.name}>{v.name}</li>
        ))}
      </ul>
      <br />
      <img height={"100px"} src={country.flag} alt={country.name + "flag"} />
    </div>
  );
};

export default CountryInfo;
