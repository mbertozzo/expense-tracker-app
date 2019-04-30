import React, { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

import { _getCategoryMovements } from 'api/queries';
import { Query } from 'react-apollo';
import ReportTable from 'components/Dashboard/ReportTable';

/* eslint-disable react/prefer-stateless-function */
const CategoryReport = (props) => {
  const { match: { params: { id } } } = props;

  return (
    <Query query={_getCategoryMovements} variables={{ id }} fetchPolicy='cache-and-network'>
      {({ loading, error, data, refetch }) => {

        return <ReportTable {...{data, loading, error}} {...props} isCategoryReport />;

      }}
    </Query>
  )
};

export default CategoryReport;