import React from 'react';
import Container from '../Components/Container';
import Background from '../Components/Background';
import Modal from "../Components/Modal";

const Home = () => {
    return (
        <>
            <Background />
            <Container>
                <Modal>
                    <p>This is modal text</p>
                    <p>This is modal text</p>
                    <p>This is modal text</p>
                </Modal>
            </Container>
        </>
    );
}

export default Home;