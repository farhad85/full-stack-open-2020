import axios from "axios";
import { useEffect, useState } from "react";
import CountryInfo from "../CountryInfo";

const SearchStatus = {
  TooMany: 1,
  NoResult: 2,
  Valid: 3,
};

const QueryHandler = ({ search }) => {
  const [countryList, setCountryList] = useState();
  const [status, setStatus] = useState(SearchStatus.TooMany);
  const [showDetailOf, setShowDetailOf] = useState("");

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
            setCountryList(response.data);
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
      {countryList.length > 1 ? (
        countryList.map((v) => (
          <div key={v.name}>
            <p>
              {v.name}
              {"   "}
              <button onClick={() => setShowDetailOf(v.name)}>show</button>
            </p>
            {showDetailOf === v.name && (
              <div>
                <CountryInfo country={v} />
              </div>
            )}
          </div>
        ))
      ) : (
        <CountryInfo country={countryList[0]} />
      )}
    </div>
  );
};

export default QueryHandler;
