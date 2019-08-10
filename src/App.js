import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.scss';
import ScrollToTop from 'react-router-scroll-top'
import Navbar from "./Components/Navbar";
import Home from './Pages/Home';
import InnerPlanets from './Pages/InnerPlanets';
import OuterPlanets from './Pages/OuterPlanets';
import Footer from "./Components/Footer/Footer";
import Sun from './Pages/Sun';
import Dwarf from './Pages/Dwarf';

function App() {

  return (
    <Router>
      <ScrollToTop>
        <div className="app">
          <Navbar />
          <Route exact path="/" component={Home} />
          <Route path="/home" component={Home} />
          <Route path="/innerplanets" component={InnerPlanets} />
          <Route path="/outerplanets" component={OuterPlanets} />
          <Route path="/sun" component={Sun} />
          <Route path="/dwarf" component={Dwarf} />
          <div className="disclaimer">
            <p>*Not to Scale</p>
          </div>
        </div>
        <Footer />
      </ScrollToTop>
    </Router>
  );
}

export default App;
