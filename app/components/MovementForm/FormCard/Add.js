import React from 'react';

import { _getBalance, _getExpenses, _getRevenues } from 'api/queries';
import { _addMovement } from 'api/mutations';
import { Mutation } from 'react-apollo';

import { Button, Spinner } from 'reactstrap';

const Add = (props) => {

  const { values, isValid, _changeRoute } = props;

  return (
    <Mutation 
      mutation={_addMovement}
      onCompleted={() => _changeRoute('/')}
      update={(store, { data: { createMovement } }) => {
        const cachedBalance = store.readQuery({ query: _getBalance });
        const cachedExpenses = store.readQuery({ query: _getExpenses });
        const cachedRevenues = store.readQuery({ query: _getRevenues });
    
        try{
          cachedBalance.balance = (cachedBalance.balance + createMovement.amount)
          store.writeQuery({ query: _getBalance, data: cachedBalance});

          if (createMovement.amount > 0) {
            cachedRevenues.revenues = (cachedRevenues.revenues + createMovement.amount)
            store.writeQuery({ query: _getRevenues, data: cachedRevenues })
          } else {
            cachedExpenses.expenses = (cachedExpenses.expenses + createMovement.amount)
            store.writeQuery({ query: _getExpenses, data: cachedExpenses })
          }
        } catch (error) {
          console.log("Mutation data not merged with Apollo cache. Error stack:\n", error);
        }
      }}
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