import React from 'react';

import { _getMovements, _getCategoryMovements, _getBalance, _getExpenses, _getRevenues, _getPerformance } from 'api/queries';
import { _deleteMovement } from 'api/mutations';
import { Mutation } from 'react-apollo';

import { DropdownItem } from 'reactstrap';

const DeleteEntry = (props) => {

  const { id, isCategoryReport, categoryId } = props;

  return (
    <Mutation 
      mutation={_deleteMovement}
      refetchQueries={() => [{ query: _getBalance }, { query: _getExpenses }, { query: _getRevenues }, { query: _getPerformance }]}
      update={(store, { data: { deleteMovement } }) => {

        if (isCategoryReport) {
          try {
            const cachedMovements = store.readQuery({ query: _getCategoryMovements, variables: { id: categoryId } });

            const filteredMovements = cachedMovements.category.movements.filter(item => item.id !== id);

            store.writeQuery({
              query: _getCategoryMovements,
              variables: { id: categoryId },
              data: {
                category: {
                  ...cachedMovements.category,
                  movements: filteredMovements,
                }
              }
            });
          } catch (error) {
            console.log("Mutation data not merged with Apollo cache. Error stack:\n", error);
          }
        } else {
          try {
            const cachedMovements = store.readQuery({ query: _getMovements, variables: { limit:10 } });

            const filteredMovements = cachedMovements.movements.nodes.filter(item => item.id !== id);
            
            store.writeQuery({ 
              query: _getMovements,
              variables: { limit: 10 },
              data: { 
                ...cachedMovements, 
                movements: { 
                  ...cachedMovements.movements,
                  nodes: filteredMovements
                }
              }
            });
          } catch (error) {
            console.log("Mutation data not merged with Apollo cache. Error stack:\n", error);
          }
        }
      }}
    >
      {(deleteMovement, { loading, error, data }) => {
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