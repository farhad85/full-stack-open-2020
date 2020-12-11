import axios from "axios";
import { useEffect, useState } from "react";
import CountryInfo from "../CountryInfo";

const SearchStatus = {
  TooMany: 1,
  NoResult: 2,
  Valid: 3,
};

const QueryHandler = ({ search }) => {
  const [result, setResult] = useState();
  const [status, setStatus] = useState(SearchStatus.TooMany);

  useEffect(() => {
    if (search.length === 0) {
      setStatus(SearchStatus.TooMany);
    } else {
      axios
        .get(`https://restcountries.eu/rest/v2/name/${search}`)
        .then((response) => {
          if (response.data.length > 10) {
            setStatus(SearchStatus.TooMany);
          } else {
            setResult(response.data);
            setStatus(SearchStatus.Valid);
          }
        })
        .catch(() => {
          setStatus(SearchStatus.NoResult);
        });
    }
  }, [status, search]);

  if (status !== SearchStatus.Valid) {
    return (
      <p>
        {status === SearchStatus.NoResult ? "No " : "Too many "} matches,
        specify another filter
      </p>
    );
  }

  return (
    <div>
      {result.length > 1 ? (
        result.map((v) => <p key={v.name}>{v.name}</p>)
      ) : (
        <CountryInfo country={result[0]} />
      )}
    </div>
  );
};

export default QueryHandler;
