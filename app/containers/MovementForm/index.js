import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import { _getMovement } from 'api/queries';
import { Query } from 'react-apollo';

import FormCard from 'components/Add/FormCard';
import SideCard from 'components/Add/SideCard';

import {
  Container,
  Row,
  Spinner,
} from "reactstrap";

import messages from './messages';

const MovementForm = (props) => {

  const { location: { pathname } } = props;

  const chunks = pathname.split('/');

  let content = null
  if (chunks[1] === 'add') {

    content = <FormCard xl="9" action="add" {...props} />;

  } else if (chunks[1] === 'edit' && chunks[2] ) {

    content = (
      <Query query={_getMovement} variables={{ id: chunks[2] }}>
        {({ loading, error, data }) => {
          if (loading) { return <Spinner color="primary" /> }

          return <FormCard xl="9" action="edit" formInit={data.movement} {...props} />;

        }}
      </Query>
    );

  } else {
    content = <p>Error: missing ID.</p>
  }

  return (
    <div>
      <Helmet>
        <title>Add New Entry</title>
        <meta name="description" content="Description of Add" />
      </Helmet>
      
      <Container className="mt--7" fluid>
        <Row className="d-flex align-items-stretch">

          {content}

          <SideCard xl="3" />
        </Row>
      </Container>

    </div>
  );
}

export default MovementForm;
