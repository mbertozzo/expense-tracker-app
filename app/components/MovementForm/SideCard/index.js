import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { withFormik } from 'formik';

import { _addCategory } from 'api/mutations';
import { _getCategories } from 'api/queries';
import { Mutation } from 'react-apollo';

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Col,
  FormFeedback,
  FormGroup,
  Input,
  Row,
  Spinner,
} from "reactstrap";

const SideCard = (props) => {

  const { values, touched, errors, handleChange, handleBlur, isValid } = props;

  const [completed, setCompleted] = useState(false);

  const showConfirm = () => {
    const { resetForm } = props;

    setCompleted(true);

    setTimeout(() => {
      setCompleted(false);
      resetForm();
    }, 1500);
  }

  return (
    <Col xl={props.xl}>
      <Card className="bg-secondary shadow">
        <CardHeader className="bg-white border-0">
          <Row className="align-items-center">
            <Col> 
              <h3 className="mb-0">Create category</h3>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          
          <Row>
            <Col lg="12">
              <FormGroup>
                <label
                  className="form-control-label"
                  htmlFor="name"
                >
                  Name
                </label>
                <Input
                  name="name"
                  className="form-control-alternative"
                  placeholder="Category name"
                  type="text"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  invalid={errors.name && touched.name}
                />
                <FormFeedback>Field cannot be empty!</FormFeedback>
              </FormGroup>
            </Col>
            <Col lg="12">
              <FormGroup>
                <label
                  className="form-control-label"
                  htmlFor="input-color"
                >
                  Color
                </label>
                <Input
                  name="color"
                  className="form-control-alternative"
                  type="select"
                  value={values.color}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  invalid={errors.color && touched.color}
                >
                  <option value=''>Select color</option>
                  <option value='blue'>Blue</option>
                  <option value='indigo'>Indigo</option>
                  <option value='purple'>Purple</option>
                  <option value='pink'>Pink</option>
                  <option value='red'>Red</option>
                  <option value='orange'>Orange</option>
                  <option value='yellow'>Yellow</option>
                  <option value='green'>Green</option>
                  <option value='teal'>Teal</option>
                  <option value='cyan'>Cyan</option>
                </Input>
                <FormFeedback>Field cannot be empty!</FormFeedback>
              </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col className="text-right mt-5">
              <Mutation 
                mutation={_addCategory}
                onCompleted={showConfirm}
                update={(store, { data: { createCategory } }) => {
                  /** This function is called after the server returned the response.
                   * It receives the payload of the mutation (defined in api/mutations.js)
                   * and the current cache (store) as arguments. We read the query cached
                   * content and add to it the mutation payload. This way, the server and the
                   * cache will be in sync again. We're sure the mutation content was correctly
                   * processed by the server because this function got the response.
                   */

                  const cachedCategories = store.readQuery({ query: _getCategories });
                  
                  try{
                    cachedCategories.categories.push(createCategory);
                    store.writeQuery({ query: _getCategories, data: cachedCategories});
                  } catch (error) {
                    console.log("Mutation data not merged with Apollo cache. Error stack:\n", error);
                  }
                }}
              >
                {(addMovement, { loading, error, data }) => {
                  if (loading) { return <Spinner color="primary" /> }
                  if (error) { return <p className="text-danger">An error occurred: entry not added. Please retry in a while.</p> }
                  if (completed) { return <h2 className="text-primary"><i className="fas fa-check"></i></h2> }

                  return (
                    <Button
                      color="primary"
                      onClick={() => {
                        addMovement({
                          variables: {
                            name: values.name,
                            color: values.color,
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
            </Col>
          </Row>

        </CardBody>
      </Card>
    </Col> 
  );
}

const formikOpt = {
  mapPropsToValues: (props) => {
    return ({
      name: '',
      color: '',
    })
  },
  validate: values => {
    const errors = {};
    if (values.name === '') {
      errors.name = true
    }
    if (values.color === '') {
      errors.color = true
    }
    return errors;
  },
}

export default withFormik(formikOpt)(SideCard);