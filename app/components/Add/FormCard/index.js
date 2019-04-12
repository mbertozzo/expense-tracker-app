import React, { Component } from 'react';
import PropTypes from 'prop-types';

import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Col,
  FormGroup,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  Spinner,
} from "reactstrap";

const _getCategories = gql `
  query {
    categories {
      id
      name
    }
  }
`;

const _addMovement = gql `
  mutation createMovement(
    $description: String!,
    $amount: Float!,
    $categoryId: ID!,
  ) {
    createMovement(
      description: $description,
      amount: $amount,
      categoryId: $categoryId,
    ) {
      description
      amount
      categoryId
    }
  }
`;

class FormCard extends Component {

  state = {
    focused: false,
    description: '',
    amount: '',
    categoryId: '',
  }

  getShadow() {
    if (this.state.focused) {
      return { boxShadow: '0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)' }
    } else {
      return { boxShadow: '0 1px 3px rgba(50, 50, 93, 0.15), 0 1px 0 rgba(0, 0, 0, 0.02)' }
    }
  }

  render() {
    return (
      <Col xl={this.props.xl}>
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
                        className="form-control-alternative"
                        id="input-description"
                        placeholder="Some details explaining the nature of the transaction"
                        type="text"
                        value={this.state.description}
                        onChange={(e) => this.setState({ description: e.target.value })}
                      />
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

                      <InputGroup
                        style={this.getShadow()}
                      >
                        <Input
                          id="input-amount"
                          placeholder="1234.56"
                          type="text"
                          className="border-0"
                          onFocus={() => this.setState({ focused: true })}
                          onBlur={() => this.setState({ focused: false })}
                          value={this.state.amount}
                          onChange={(e) => this.setState({ amount: e.target.value })}
                        />
                        <InputGroupAddon addonType="append">
                          <InputGroupText className="border-0">€</InputGroupText>
                        </InputGroupAddon>
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
                        className="form-control-alternative"
                        id="input-category"
                        placeholder="Category"
                        type="select"
                        value={this.state.categoryId}
                        onChange={(e) => this.setState({ categoryId: e.target.value })}
                      >
                        <option value=''>Select category</option>
                        
                        <Query query={_getCategories} fetchPolicy='cache-and-network'>
                          {({ loading, error, data }) => {
                            if (loading || error ) { return null } 

                            return data.categories.map((item, key) => <option value={item.id} {...{key}}>{item.name}</option>)

                          }}
                        </Query>

                      </Input>
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
                    <Mutation mutation={_addMovement} onCompleted={() => this.props._changeRoute('/')}>
                      {(addMovement, { loading, error, data }) => {
                        if (loading) { return <Spinner color="primary" /> }
                        if (error) { return <p className="text-danger">An error occurred: entry not added. Please retry in a while.</p> }

                        return (
                          <Button
                            color="primary"
                            onClick={() => {
                              addMovement({
                                variables: {
                                  description: this.state.description,
                                  amount: parseFloat(this.state.amount),
                                  categoryId: this.state.categoryId,
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

              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
          
    );
  }
}

export default FormCard;