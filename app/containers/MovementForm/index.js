import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import { _getMovement } from 'api/queries';
import { Query } from 'react-apollo';

import FormCard from 'components/Add/FormCard';
import SideCard from 'components/Add/SideCard';
import Message from 'components/shared/Message/';
import Loading from 'components/shared/Loading/';

import {
  Container,
  Row,
} from "reactstrap";

import messages from './messages';

const MovementForm = (props) => {

  const { location: { pathname }, _changeRoute } = props;

  const chunks = pathname.split('/');

  let content = null
  if (chunks[1] === 'add') {
    content = <FormCard xl="9" action="add" {...props} />;
  } else if (chunks[1] === 'edit' && chunks[2] ) {

    content = (
      <Query query={_getMovement} variables={{ id: chunks[2] }}>
        {({ loading, error, data }) => {
          if (loading) { return <Loading title="Edit movement" /> }
          if (error ) { return <Message xl="9" type="networkError" {...{_changeRoute}} /> }
          if (data.movement === null) { return <Message xl="9" type="nonExistentId" {...{_changeRoute}} suggestion /> }

          return <FormCard xl="9" action="edit" formInit={data.movement} {...props} />;

        }}
      </Query>
    );

  } else {
    content = <Message xl="9" type="malformedUrl" {...{_changeRoute}} suggestion />;
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
