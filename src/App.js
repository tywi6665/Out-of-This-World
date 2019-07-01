import React from 'react';
import './App.scss';
import * as d3 from "d3";
import Container from './Components/Container/Container';
import Background from './Components/Background/Background';

function App() {

  return (
    <div className="app">
      <Background />
      <Container>
      </Container>
    </div>
  );
}

export default App;
