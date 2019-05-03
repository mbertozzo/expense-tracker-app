import React from "react";

import { Container, Row, Col } from "reactstrap";

const Footer = (props) => {
  return (
    <Container fluid>
      <footer className="footer">
        <Row className="align-items-center justify-content-xl-between">
          <Col xs="6">
            <div className="copyright text-xl-left text-muted">
              <strong>Avenal</strong> // Alpha Version 0.0.1
            </div>
          </Col>

          <Col xs="6">
            <div className="copyright text-right">
              <a href="https://matteobertozzo.com" className="text-muted">Created with 💙 in Milan</a>
            </div>
          </Col>
        </Row>
      </footer>
    </Container>
  );
}

export default Footer;