import React from 'react';
import './App.css';
import { Catalog } from './components/catalog';
import { Header } from './components/header';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="wrapper">

        <Catalog />
      </div>
    </div>
  );
}

export default App;
