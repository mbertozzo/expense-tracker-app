import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { withFormik } from 'formik';

import { _getCategories } from 'api/queries';
import { Query } from 'react-apollo';

import Submit from './Submit';

import {
  Card,
  CardHeader,
  CardBody,
  Col,
  FormFeedback,
  FormGroup,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
} from "reactstrap";

const FormCard = (props) => {

  const { values, touched, errors, handleChange, handleBlur, isValid, _changeRoute } = props;

  const [focused, setFocused] = useState(false);
  
  const getShadow = () => {
    if (focused) {
      return { boxShadow: '0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)' }
    } else {
      return { boxShadow: '0 1px 3px rgba(50, 50, 93, 0.15), 0 1px 0 rgba(0, 0, 0, 0.02)' }
    }
  }

  const onFocus = () => {
    setFocused(true);
  }

  const onBlur = () => {
    setFocused(false);
  }

  return (
    <Col xl={props.xl}>
      <Card className="bg-secondary shadow">
        <CardHeader className="bg-white border-0">
          <Row className="align-items-center">
            <Col> 
              <h3 className="mb-0">Add movement</h3>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <Form>
            <h6 className="heading-small text-muted mb-4">
              General Info
            </h6>
            <div className="pl-lg-4">

              <Row>
                <Col lg="12">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-description"
                    >
                      Description
                    </label>
                    <Input
                      name="description"
                      className="form-control-alternative"
                      placeholder="Some details explaining the nature of the transaction"
                      type="text"
                      value={values.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      invalid={errors.description && touched.description}
                    />
                    <FormFeedback>Description field cannot be empty!</FormFeedback>
                  </FormGroup>
                </Col>
              </Row>

              <Row>
                <Col lg="4">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-amount"
                    >
                      Amount
                    </label>

                    <InputGroup style={getShadow()}>
                        <Input
                          name="amount"
                          placeholder="1234.56"
                          type="text"
                          className="border-0"
                          value={values.amount}
                          onChange={handleChange}
                          onFocus={onFocus}
                          onBlur={(e) => {
                            handleBlur(e);
                            onBlur();
                          }}
                          invalid={errors.amount && touched.amount}
                        />
                        <InputGroupAddon addonType="append">
                          <InputGroupText className="border-0 rounded-right">€</InputGroupText>
                        </InputGroupAddon>
                        <FormFeedback style={{ position: 'absolute', bottom: '-25px' }}>Amount field must be a number!</FormFeedback>
                    </InputGroup>
                  </FormGroup>
                </Col>

                <Col lg="4">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-category"
                    >
                      Category
                    </label>
                    <Input
                      name="categoryId"
                      className="form-control-alternative"
                      placeholder="Category"
                      type="select"
                      value={values.categoryId}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      invalid={errors.categoryId && touched.categoryId}
                    >
                      <option value=''>Select category</option>
                      
                      <Query query={_getCategories} fetchPolicy='cache-and-network'>
                        {({ loading, error, data }) => {
                          if (loading || error ) { return null } 

                          return data.categories.map((item, key) => <option value={item.id} {...{key}}>{item.name}</option>)

                        }}
                      </Query>

                    </Input>
                    <FormFeedback>Category field cannot be empty!</FormFeedback>
                  </FormGroup>
                </Col>
                <Col lg="4">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-date"
                    >
                      Date
                    </label>
                    <Input
                      className="form-control-alternative"
                      id="input-postal-date"
                      placeholder="Not yet available"
                      type="text"
                      disabled
                    />
                  </FormGroup>
                </Col>
              </Row>

              {/* <hr class="my-4" /> */}

              <Row>
                <Col className="text-right mt-5">
                  <Submit {...{values}} {...{isValid}} {...{_changeRoute}} />
                </Col>
              </Row>

            </div>
          </Form>
        </CardBody>
      </Card>
    </Col>
        
  );

}

const formikOpt = {
  mapPropsToValues: (props) => {
    const { formInit: { description = '', amount = '', categoryId = '' } = {} } = props;

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