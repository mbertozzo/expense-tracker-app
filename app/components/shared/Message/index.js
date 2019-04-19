import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';

import messages from './messages';

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Col,
  Row,
} from "reactstrap";

const Wrapper = (props) => {

  const { xl, type, suggestion, _changeRoute } = props;

  const titleKey = `${type}Title`;
  const messageKey = `${type}Message`;

  return (
    <Col {...{xl}}>
      <Card className="bg-secondary shadow">
        <CardHeader className="bg-white border-0">
          <Row className="align-items-center">
            <Col> 
              <h3 className="mb-0">
                <FormattedMessage {...messages[titleKey] } />
              </h3>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>

          <Row>
            <Col>
              <p>
                <FormattedMessage {...messages[messageKey] } />
              </p>

              {suggestion && <p><FormattedMessage {...messages.genericSuggestion } /></p>}
            </Col>
          </Row>

          <Row>
            <Col className="text-right mt-5">
              <Button
                color="primary"
                onClick={() => _changeRoute('/')}
              >
                Back to home
              </Button>
            </Col>
          </Row>

        </CardBody>
      </Card>
    </Col>
        
  );

}

export default Wrapper;