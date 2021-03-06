import React, { useState } from 'react';

import { _getCategories } from 'api/queries';
import { Query } from 'react-apollo';

import { Datepicker } from 'react-formik-ui';

import {
  Col,
  FormFeedback,
  FormGroup,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  Spinner,
} from "reactstrap";

const MovementForm = (props) => {

  const { values, touched, errors, handleChange, handleBlur, isValid, setFieldTouched } = props;

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
              <Query query={_getCategories} fetchPolicy='cache-and-network'>
                {({ loading, error, data }) => {
                  if (loading) { return <Spinner color="primary" style={{ display: 'block' }} /> } 
                  if (error) { return <p className="text-danger">Error: Can't load category data.</p> } 

                  const options = data.categories.map((item, key) => (
                    <option
                      value={item.id}
                      // trick to show current category when editing | needs fixing
                      selected={item.id === values.categoryId}
                      {...{key}}>
                        {item.name}
                      </option>
                  ))
             
                  return (
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
                      {options}                    
                    </Input>
                  )
                }}
              </Query>
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
              {/* Check https://github.com/KaiHotz/react-formik-ui#datepicker */}
              <Datepicker
                name="issue_date"
                className={`form-control form-control-alternative ${errors.issue_date && touched.issue_date && 'is-invalid'}`}
                placeholder="Select a date"
                onBlur={() => setFieldTouched('issue_date', true)}
              />
              <FormFeedback>Date field cannot be empty!</FormFeedback>
            </FormGroup>
          </Col>
        </Row>

      </div>
    </Form>
  );
}

export default MovementForm;