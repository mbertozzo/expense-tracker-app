import React from 'react';

import { Button } from 'reactstrap';

const AddButton = (props) => {
  const {_changeRoute} = props;

  return (
    <Button
      color="primary"
      onClick={() => _changeRoute('/add')}
      size="sm"
    >
      Add New
    </Button> 
  )
}

export default AddButton;