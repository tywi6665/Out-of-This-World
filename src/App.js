import React from 'react';
import './App.scss';
import * as d3 from "d3";
import Container from './Components/Container/Container';

function App() {

  function solarSystem() {
    const width = 960,
      height = 500,
      sunX = (width / 2) - 250,
      sunY = (height / 2) - 150,
      t0 = new Date().setHours(0, 0, 0, 0),
      delta = (Date.now() - t0);
  }
  return (
    <div className="app">
      <Container>
        <p>
          This is a react app!!!
        </p>
      </Container>
    </div>
  );
}

export default App;
