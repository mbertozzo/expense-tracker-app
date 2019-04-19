import React from 'react';

import { _getMovements, _getBalance, _getExpenses, _getRevenues } from 'api/queries';
import { _updateMovement } from 'api/mutations';
import { Mutation } from 'react-apollo';

import { Button, Spinner } from 'reactstrap';

const Add = (props) => {

  const { values, isValid, id, _changeRoute } = props;

  return (
    <Mutation 
      mutation={_updateMovement}
      onCompleted={() => _changeRoute('/')}
      refetchQueries={() => [{ query: _getBalance }, { query: _getExpenses }, { query: _getRevenues }]}
    >
      {(updateMovement, { loading, error, data }) => {
        if (loading) { return <Spinner color="primary" /> }
        if (error) { return <p className="text-danger">An error occurred: entry not updated. Please retry in a while.</p> }
        
        return (
          <Button
            color="primary"
            onClick={() => {
              updateMovement({
                variables: {
                  id,
                  description: values.description,
                  amount: parseFloat(values.amount),
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