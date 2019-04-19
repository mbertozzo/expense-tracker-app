import React from 'react';

import { _getMovements, _getBalance, _getExpenses, _getRevenues } from 'api/queries';
import { _deleteMovement } from 'api/mutations';
import { Mutation } from 'react-apollo';

import { DropdownItem } from 'reactstrap';

const DeleteEntry = (props) => {

  const { id, amount } = props;

  return (
    <Mutation 
      mutation={_deleteMovement}
      update={(store, { data: { deleteMovement } }) => {
        const cachedMovements = store.readQuery({ query: _getMovements });
        const cachedBalance = store.readQuery({ query: _getBalance });
        const cachedExpenses = store.readQuery({ query: _getExpenses });
        const cachedRevenues = store.readQuery({ query: _getRevenues });

        try{
          const filteredMovements = cachedMovements.movements.filter(item => item.id !== id);
          store.writeQuery({ query: _getMovements, data: { movements: filteredMovements } });

          const updatedBalance= cachedBalance.balance - amount;
          store.writeQuery({ query: _getBalance, data: { balance: updatedBalance } });
          
          if ( amount > 0 ) {
            const updatedRevenues = cachedRevenues.revenues - amount;
            store.writeQuery({ query: _getRevenues, data: { revenues: updatedRevenues } });
          } else {
            const updatedExpenses = cachedExpenses.expenses - amount;
            store.writeQuery({ query: _getExpenses, data: { expenses: updatedExpenses } });
          }
        } catch (error) {
          console.log("Mutation data not merged with Apollo cache. Error stack:\n", error);
        }
      }}
      >
      {(deleteMovement, { loading, error }) => {
        if (error) { return <p className="text-danger">An error occurred: entry not added. Please retry in a while.</p> }
        
        return (
          <DropdownItem
            onClick={() => {
              deleteMovement({ 
                variables: {
                  id
                }
              })
            }}
          >
            Delete entry
          </DropdownItem>
        )
      }}
    </Mutation>
  );
}

export default DeleteEntry;