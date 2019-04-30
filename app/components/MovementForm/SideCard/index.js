import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { _addCategory } from 'api/mutations';
import { _getCategories } from 'api/queries';
import { Mutation } from 'react-apollo';

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Col,
  Form,
  FormGroup,
  Input,
  Row,
  Spinner,
} from "reactstrap";

class SideCard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: undefined,
      color: undefined,
      completed: false,
    }

    this.setCompleted = this.setCompleted.bind(this);
  }

  setCompleted() {
    this.setState({ completed: true });

    setTimeout(() => {
      this.setState({ completed: false, name: '', color: '' })
    }, 1500);
  }

  render() {
    return (
      <Col xl={this.props.xl}>
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
                    htmlFor="input-name"
                  >
                    Name
                  </label>
                  <Input
                    className="form-control-alternative"
                    id="input-name"
                    placeholder="Category name"
                    type="text"
                    value={this.state.name}
                    onChange={(e) => this.setState({ name: e.target.value })}
                  />
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
                    className="form-control-alternative"
                    id="input-color"
                    type="select"
                    value={this.state.color}
                    onChange={(e) => this.setState({ color: e.target.value })}
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
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col className="text-right mt-5">
                <Mutation 
                  mutation={_addCategory}
                  onCompleted={this.setCompleted}
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
                    if (this.state.completed) { return <h2 className="text-primary"><i className="fas fa-check"></i></h2> }

                    return (
                      <Button
                        color="primary"
                        onClick={() => {
                          addMovement({
                            variables: {
                              name: this.state.name,
                              color: this.state.color,
                            }
                          })
                        }}
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
}

export default SideCard;
