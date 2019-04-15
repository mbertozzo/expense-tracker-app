/**
 *
 * Add
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import FormCard from 'components/Add/FormCard';
import SideCard from 'components/Add/SideCard';

import {
  Container,
  Row,
} from "reactstrap";

import messages from './messages';

const Add = (props) => {
  return (
    <div>
      <Helmet>
        <title>Add New Entry</title>
        <meta name="description" content="Description of Add" />
      </Helmet>
      
      <Container className="mt--7" fluid>
        <Row className="d-flex align-items-stretch">
          <FormCard xl="9" {...props} />
          <SideCard xl="3" />
        </Row>
      </Container>

    </div>
  );
}

export default Add;
