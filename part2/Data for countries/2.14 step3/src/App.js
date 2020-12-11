import React, { useEffect, useState } from 'react';
import SearchBox from './components/SearchBox';
import QueryHandler from './components/QueryHandler';



const App = () => {
  const [search, setSearch] = useState("");
  return <div>
    <SearchBox search={search} setSearch={setSearch} />
    <QueryHandler search={search} />
  </div>;
};

export default App;