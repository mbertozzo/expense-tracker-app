import React from 'react';

import { _getMovements, _getCategoryMovements, _getBalance, _getExpenses, _getRevenues, _getPerformance } from 'api/queries';
import { _deleteMovement } from 'api/mutations';
import { Mutation } from 'react-apollo';

import { DropdownItem } from 'reactstrap';

const DeleteEntry = (props) => {

  const { id, amount, isCategoryReport, categoryId } = props;

  return (
    <Mutation 
      mutation={_deleteMovement}
      refetchQueries={() => [{ query: _getBalance }, { query: _getExpenses }, { query: _getRevenues }, { query: _getPerformance }]}
      update={(store, { data: { deleteMovement } }) => {

        // if removing item from the table showing movements for a single category
        if (isCategoryReport) {
          const cachedMovements = store.readQuery({ query: _getCategoryMovements, variables: { id: categoryId } });

          try {
            const filteredMovements = cachedMovements.category.movements.filter(item => item.id !== id);
            store.writeQuery({ query: _getCategoryMovements, variables: { id: categoryId }, data: { category: { ...cachedMovements.category, movements: filteredMovements } } });
          } catch (error) {
            console.log("Mutation data not merged with Apollo cache. Error stack:\n", error);
          }
        
        } else {
          const cachedMovements = store.readQuery({ query: _getMovements });

          try {
            const filteredMovements = cachedMovements.movements.filter(item => item.id !== id);
            store.writeQuery({ query: _getMovements, data: { movements: filteredMovements } });
          } catch (error) {
            console.log("Mutation data not merged with Apollo cache. Error stack:\n", error);
          }
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