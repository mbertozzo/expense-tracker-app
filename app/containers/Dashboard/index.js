import React, { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

import cx from 'classnames';

import { _getMovements } from 'api/queries';
import { Query } from 'react-apollo';
import ReportTable from 'components/Dashboard/ReportTable';

import styles from './styles.module.scss';

const pageLimit = 10;

/* eslint-disable react/prefer-stateless-function */
const HomePage = (props) => (

    <Query query={_getMovements} variables={{ limit:pageLimit }} fetchPolicy='cache-and-network'>
      {({ loading, error, data, fetchMore }) => {

        return <ReportTable {...{data, loading, error, pageLimit, fetchMore}} {...props} />;

      }}
    </Query>

);

export default HomePage;