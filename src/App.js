import Navbar from './components/Navbar';
import Planets from './components/Planets';
import Peoples from './components/Peoples';
import React, { useState } from 'react';

function App() {
  const [page, setPage] = useState('planets');
  return (
    <div className="App">
      <h1>Star Wars Info</h1>
      <Navbar setPage={setPage} />
      <div className="content">
        {page === 'planets' ? <Planets /> : <Peoples />}
      </div>
    </div>
  );
}

export default App;
