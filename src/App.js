import React from 'react';
import './App.scss';
import Container from './Components/Container/Container';
import Background from './Components/Background/Background';
import Modal from "./Components/Modal";

function App() {

  return (
    <div className="app">
      <Background />
      <Container>
        <Modal>
          <p>This is modal text</p>
          <p>This is modal text</p>
          <p>This is modal text</p>
        </Modal>
      </Container>
    </div>
  );
}

export default App;
