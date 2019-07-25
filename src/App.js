import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.scss';
import Navbar from "./Components/Navbar";
import Home from './Pages/Home';
import InnerPlanets from './Pages/InnerPlanets/InnerPlanets';
import OuterPlanets from './Pages/OuterPlanets/OuterPlanets';
import Footer from "./Components/Footer/Footer";
import Sun from './Pages/Sun/Sun';

function App() {

  return (
    <Router>
      <div className="app">
        <Navbar />
        <Route exact path="/" component={Home} />
        <Route path="/home" component={Home} />
        <Route path="/innerplanets" component={InnerPlanets} />
        <Route path="/outerplanets" component={OuterPlanets} />
        <Route path="/sun" component={Sun} />
        <div className="disclaimer">
          <p>*Not to Scale</p>
        </div>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
