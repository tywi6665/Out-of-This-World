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

    //Planetary Data 
    const planets = [
      {
        R: 23, r: 1, speed: -1.60, phi0: 35, moons: []
      },
      {
        R: 45, r: 2, speed: -1.17, phi0: 185, moons: []
      }
    ];

    //Appending svg element to body
    const svg = d3.select("body")
      .append("svg")
      .attr("width", width + "vw")
      .attr("height", height + "vh");

    //Appending Sun to svg
    svg.append("circle")
      .attr("r", 10)
      .attr("cx", sunX)
      .attr("cy", sunY)
      .attr("fill", "yellow")
      .attr("class", "sun");

    //Creating planetary system variable
    const planetarySystem = svg.append("g")
      .attr("class", "planetary-system")
      .attr("transform", `translate(${sunX}, ${sunY})`)

    //Appending planets and moons to planetary system container
    planetarySystem.selectAll("g.planet")
      .data(planets)
      .enter()
      .append("g")
      .attr("class", "planet-system")
      .each(function (d) {
        console.log(d3.select(this))
        d3.select(this)
          .append("circle")
          .attr("class", "orbital")
          .attr("r", d.R);
        d3.select(this)
          .append("circle")
          .attr("r", d.r)
          .attr("cx", d.R)
          .attr("cy", 0)
          .attr("class", "planet");
      })
      .attr("transform", function (d) {
        return `rotate(${(d.phi0 + (delta * (d.speed / 100)))})`;
      });
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
