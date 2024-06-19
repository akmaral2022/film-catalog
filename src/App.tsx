import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Catalog } from './components/catalog';
import { Header } from './components/header';
import { MovieInfo } from './components/movie';
import { SelecetedFilms } from './components/selected';
import { Welcome } from './components/welcome';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Welcome />
        <div className="wrapper">
          <Routes>
            <Route path='/' element={<Catalog />} />
            <Route path='/movie-info/:id' element={<MovieInfo />} />
            <Route path='/selected-films' element={<SelecetedFilms />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
