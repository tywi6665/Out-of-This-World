import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.scss';
// import Container from './Components/Container/Container';
// import Background from './Components/Background/Background';
// import Modal from "./Components/Modal";
import Navbar from "./Components/Navbar";
import Home from './Pages/Home';
import InnerPlanets from './Pages/InnerPlanets';

function App() {

  return (
    <Router>
      <div className="app">
        <Navbar />
        <Route exact path="/" component={Home} />
        <Route path="/home" component={Home} />
        <Route path="/innerplanets" component={InnerPlanets} />
      </div>
    </Router>
  );
}

export default App;
