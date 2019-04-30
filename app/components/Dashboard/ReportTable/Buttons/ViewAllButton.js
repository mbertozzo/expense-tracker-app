import React from 'react';

import { Button } from 'reactstrap';

const ViewAll = (props) => {
  const {_changeRoute} = props;

  return (
    <Button
      color="primary"
      onClick={() => _changeRoute('/')}
      size="sm"
    >
      Back to full report
    </Button> 
  )
}

export default ViewAll;