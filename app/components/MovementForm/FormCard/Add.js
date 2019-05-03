import React from 'react';

import { _getBalance, _getExpenses, _getRevenues, _getPerformance } from 'api/queries';
import { _addMovement } from 'api/mutations';
import { Mutation } from 'react-apollo';

import { Button, Spinner } from 'reactstrap';

const Add = (props) => {

  const { values, isValid, _changeRoute } = props;

  return (
    <Mutation 
      mutation={_addMovement}
      onCompleted={() => _changeRoute('/')}
      refetchQueries={() => [{ query: _getBalance }, { query: _getExpenses }, { query: _getRevenues }, { query: _getPerformance }]}
    >
      {(addMovement, { loading, error, data }) => {
        if (loading) { return <Spinner color="primary" /> }
        if (error) { return <p className="text-danger">An error occurred: entry not added. Please retry in a while.</p> }
        
        return (
          <Button
            color="primary"
            onClick={() => {
              addMovement({
                variables: {
                  description: values.description,
                  amount: parseFloat(values.amount),
                  issue_date: values.issue_date,
                  categoryId: values.categoryId,
                }
              })
            }}
            disabled={!isValid}
          >
            Confirm
          </Button>
        )
      }}
    </Mutation>
  );

}

export default Add;