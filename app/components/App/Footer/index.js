/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container, Row, Col, Nav, NavItem, NavLink } from "reactstrap";

class Footer extends React.Component {
  render() {
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
              <div className="copyright text-right text-muted">
                {/* Created with <i className="ni ni-favourite-28" /> in Milan */}
                Created with 💙 in Milan
              </div>
            </Col>
          </Row>
        </footer>
      </Container>
    );
  }
}

export default Footer;