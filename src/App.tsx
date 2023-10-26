import React from 'react';
import SearchBar from './components/SearchBar';
import Layout from './layouts/Layout';

function App() {
  return (
    <div className="App">
      <Layout>
        <SearchBar />
      </Layout>
    </div>
  );
}

export default App;
