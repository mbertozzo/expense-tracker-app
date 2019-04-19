import React from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Col,
  Row,
  Spinner,
} from "reactstrap";

const Loading = (props) => {

  const { xl, title, _changeRoute } = props;

  return (
    <Col {...{xl}}>
      <Card className="bg-secondary shadow">
        <CardHeader className="bg-white border-0">
          <Row className="align-items-center">
            <Col> 
            <h3 className="mb-0">{title}</h3>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>

          <Row>
            <Col className="text-center">
              <Spinner color="primary" style={{width: '3rem', height: '3rem'}} />
            </Col>
          </Row>

        </CardBody>
      </Card>
    </Col>
        
  );

}

export default Loading;