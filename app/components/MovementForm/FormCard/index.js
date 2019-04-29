import React from 'react';
import PropTypes from 'prop-types';

import { withFormik } from 'formik';

import Form from './Form';
import Add from './Add';
import Edit from './Edit';

import {
  Card,
  CardHeader,
  CardBody,
  Col,
  Row,
} from "reactstrap";

const FormCard = (props) => {

  const { values, isValid, action, formInit: { id } = {}, _changeRoute } = props;

  let title, mutation = null;
  if (action === 'add') {
    title = 'Add movement';
    mutation = <Add {...{values}} {...{isValid}} {...{_changeRoute}} />;
  } else if (action === 'edit') {
    title = 'Edit movement';
    mutation = <Edit {...{values}} {...{isValid}} {...{id}} {...{_changeRoute}} />;
  }

  return (
    <Col xl={props.xl}>
      <Card className="bg-secondary shadow">
        <CardHeader className="bg-white border-0">
          <Row className="align-items-center">
            <Col> 
              <h3 className="mb-0">{title}</h3>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>

          <Form {...props} />

          <Row>
            <Col className="text-right mt-5">
              {mutation}
            </Col>
          </Row>

        </CardBody>
      </Card>
    </Col>
        
  );

}

const formikOpt = {
  mapPropsToValues: (props) => {
    const { formInit: { description = '', amount = '', category: { id: categoryId = '' } = {} } = {} } = props;

    return ({
      description,
      amount,
      categoryId,
    })
  },
  validate: values => {
    const errors = {};
    if (values.description === '') {
      errors.description = true
    }
    if (!/[+-]?([0-9]*[.])?[0-9]+/g.test(values.amount)) {
      errors.amount = true
    }
    if (values.categoryId === '') {
      errors.categoryId = true
    }
    return errors;
  },
}

export default withFormik(formikOpt)(FormCard);