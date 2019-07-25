import React from 'react';
import Container from "../../Components/Container";
import * as d3 from "d3";


const Sun = () => {

    d3.select(".svg-body").remove();

    return (
        <Container
            page={"sun"}
        >
            <div className="sun-info-left">
                Deets
            </div>
            <div className="svg-sun">
                The sun goes here!!
            </div>
            <div className="sun-info-right">
                Deets
            </div>
        </Container>

    );
}

export default Sun;