import React, { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

import cx from 'classnames';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import ReportTable from 'components/Dashboard/ReportTable';
import ReportTableCopy from 'components/Dashboard/ReportTable/index-copy.js';

import styles from './styles.module.scss';

const _getMovements = gql `
  query {
    movements {
      description
      amount
      category {
        name
      }
    }
  }
`;

/* eslint-disable react/prefer-stateless-function */
const HomePage = (props) => (

    <Query query={_getMovements} fetchPolicy='cache-and-network'>
      {({ loading, error, data, refetch }) => {

        return <ReportTable {...{data, loading, error}} {...props} />;

      }}
    </Query>

);

export default HomePage;