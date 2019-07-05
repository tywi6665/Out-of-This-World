import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.scss';
// import Container from './Components/Container/Container';
// import Background from './Components/Background/Background';
// import Modal from "./Components/Modal";
import Navbar from "./Components/Navbar";
import Home from './Pages/Home';

function App() {

  return (
    <Router>
      <div className="app">
        <Navbar />
        <Route path="/" exact component={Home} />
        <Route path="/home" exact component={Home} />
        {/* <Background />
      <Container>
        <Modal>
          <p>This is modal text</p>
          <p>This is modal text</p>
          <p>This is modal text</p>
        </Modal>
      </Container> */}
      </div>
    </Router>
  );
}

export default App;
