import React from 'react';
import Container from '../Components/Container';
import Background from '../Components/Background';
import Modal from "../Components/Modal";

const Home = () => {
    return (
        <>
            <Background />
            <Container
                page={"home"}
            >
                <Modal>
                    <p>Far from the galactic core, in a quiet neightborhood of the galactic disk, lies our solar system.</p>
                    <p>Dominated by the gavitational pull of the sun, our solar system consists of 4 terrestrial planets, 4 gas giants, and countless asteroids, comets, and small orbiting bodies.</p>
                    <p>Now go forth and explore our little corner of the universe!</p>
                </Modal>
            </Container>
        </>
    );
}

export default Home;