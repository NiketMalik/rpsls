import React from "react";

import { Container, Row, Col } from "react-bootstrap";

export const Hero = () => {
  return (
    <Container data-testid="hero">
      <Row className="flex-column">
        <Col>
          <h1 className="text-center display-3 font-cursive">
            Rock, Paper, Scissors, Lizard, Spock
          </h1>
        </Col>
        <Col>
          <h2 className="text-center h4 font-cursive">
            Online dispute resolution the traditional way, from the relative
            safety of your computer.
          </h2>
        </Col>
      </Row>
    </Container>
  );
};
