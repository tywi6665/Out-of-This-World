import React from 'react';
import './App.scss';
import * as d3 from "d3";
import Container from './Components/Container/Container';

function App() {

  function solarSystem() {

    //Defining global and constant variables
    const width = 100,
      height = 100,
      sunX = (width / 2), //Sun's horiontal position
      sunY = (height / 2), //Sun's vertical position
      t0 = new Date().setHours(0, 0, 0, 0), //Setting a time baseline
      delta = (Date.now() - t0); //Calculated change in time

    //Appending svg element to body
    const svg = d3.select("body")
      .append("svg")
      .attr("width", width + "%")
      .attr("height", height + "%");

    //Appending Sun to svg
    svg.append("circle")
      .attr("r", 10)
      .attr("cx", sunX)
      .attr("cy", sunY)
      .attr("fill", "yellow")
      .attr("id", "sun");
  };

  solarSystem();

  return (
    <div className="app">
      <Container>
      </Container>
    </div>
  );
}

export default App;
