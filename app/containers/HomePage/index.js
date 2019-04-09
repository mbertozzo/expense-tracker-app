/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React, { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

import cx from 'classnames';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';

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
const HomePage = () => (
  <Fragment>
    <Query query={_getMovements} fetchPolicy='cache-and-network'>
      {({ loading, error, data, refetch }) => {
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;

        return (
          <Fragment>
            <div className={cx(styles.wrapper, styles.header)}>
              <div>Description</div>
              <div>Amount</div>
              <div>Category</div>
            </div>

            
            {data.movements.map((movement, key) => (
              <div className={styles.wrapper} {...{key}}>
              <div>
                {movement.description}
              </div>
              <div>
                {movement.amount}
              </div>
              <div>
                {movement.category.name}
              </div>
              </div>
            ))}

          </Fragment>
        );
      }}
    </Query>

  </Fragment>
);

export default HomePage;