import React from 'react';
import './App.scss';
import { Tween, Timeline } from "react-gsap";
import Container from './Components/Container/Container';
import Background from './Components/Background/Background';
import Modal from "./Components/Modal";

function App() {

  return (
    <div className="app">
      <Background />
      <Timeline
        wrapper={<div className="container" />}
        target={<Modal>
          <p>This is modal text</p>
          <p>This is modal text</p>
          <p>This is modal text</p>
        </Modal>}
      >
        <Tween from={{ opacity: 0 }} to={{ opacity: 1 }} duration={10} />
      </Timeline>
    </div>
  );
}

export default App;
