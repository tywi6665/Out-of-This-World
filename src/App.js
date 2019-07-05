import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.scss';
import Navbar from "./Components/Navbar";
import Home from './Pages/Home';
import InnerPlanets from './Pages/InnerPlanets/InnerPlanets';
import OuterPlanets from './Pages/OuterPlanets';

function App() {

  return (
    <Router>
      <div className="app">
        <Navbar />
        <Route exact path="/" component={Home} />
        <Route path="/home" component={Home} />
        <Route path="/innerplanets" component={InnerPlanets} />
        <Route path="/outerplanets" component={OuterPlanets} />
      </div>
    </Router>
  );
}

export default App;
