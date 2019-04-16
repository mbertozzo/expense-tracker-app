import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { _getCategories, _getBalance, _getExpenses, _getRevenues } from 'api/queries';
import { _addMovement } from 'api/mutations';
import { Query, Mutation } from 'react-apollo';

import {
  Button,
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
  Spinner,
} from "reactstrap";

class FormCard extends Component {

  state = {
    description: {
      value: '',
      invalid: false,
      focused: false,
    },
    amount: {
      value: '',
      invalid: false,
      focused: false,
    },
    categoryId: {
      value: '',
      invalid: false,
      focused: false,
    },
    pristine: true,
  }

  getShadow(field) {
    if (this.state[field].focused) {
      return { boxShadow: '0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)' }
    } else {
      return { boxShadow: '0 1px 3px rgba(50, 50, 93, 0.15), 0 1px 0 rgba(0, 0, 0, 0.02)' }
    }
  }

  handleChange(e, field) {
    const { value } = e.target;

    if (value === '') {
      this.setState({ [field]: { ...this.state[field], value: e.target.value, invalid: true } });
    } else {
      this.setState({ [field]: { ...this.state[field], value: e.target.value, invalid: false } });
    }
  }

  handleBlur(e, field) {
    const { value } = e.target;

    if ( value === '' ) {
      this.setState({ [field]: { ...this.state[field], invalid: true, focused: false } });
    } else {
      this.setState({ [field]: { ...this.state[field], invalid: false, focused: false } });
    }
  }

  handleFocus(field) {
    this.setState({ [field]: { ...this.state[field], focused: true }, pristine: false });
  }

  render() {
    console.log('STATE', this.state);
    const { pristine, description, amount, categoryId } = this.state;

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
                        value={description.value}
                        onChange={(e) => this.handleChange(e, 'description')}
                        onFocus={() => this.handleFocus('description')}
                        onBlur={(e) => this.handleBlur(e, 'description')}
                        invalid={description.invalid}
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

                      <InputGroup>
                        <div className="input-group" style={this.getShadow('amount')}>
                          <Input
                            id="input-amount"
                            placeholder="1234.56"
                            type="text"
                            className="border-0"
                            value={amount.value}
                            onChange={(e) => this.handleChange(e, 'amount')}
                            onFocus={() => this.handleFocus('amount')}
                            onBlur={(e) => this.handleBlur(e, 'amount')}
                            invalid={amount.invalid}
                          />
                          <InputGroupAddon addonType="append">
                            <InputGroupText className="border-0 rounded-right">€</InputGroupText>
                          </InputGroupAddon>
                          <FormFeedback style={{ position: 'absolute', bottom: '-25px' }}>Amount field cannot be empty!</FormFeedback>
                        </div>
                        
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
                        value={categoryId.value}
                        onChange={(e) => this.handleChange(e, 'categoryId')}
                        onFocus={() => this.handleFocus('categoryId')}
                        onBlur={(e) => this.handleBlur(e, 'categoryId')}
                        invalid={categoryId.invalid}
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
                    <Mutation 
                      mutation={_addMovement}
                      onCompleted={() => this.props._changeRoute('/')}
                      update={(store, { data: { createMovement } }) => {
                        const cachedBalance = store.readQuery({ query: _getBalance });
                        const cachedExpenses = store.readQuery({ query: _getExpenses });
                        const cachedRevenues = store.readQuery({ query: _getRevenues });
                    
                        try{
                          cachedBalance.balance = (cachedBalance.balance + createMovement.amount)
                          store.writeQuery({ query: _getBalance, data: cachedBalance});

                          if (createMovement.amount > 0) {
                            cachedRevenues.revenues = (cachedRevenues.revenues + createMovement.amount)
                            store.writeQuery({ query: _getRevenues, data: cachedRevenues })
                          } else {
                            cachedExpenses.expenses = (cachedExpenses.expenses + createMovement.amount)
                            store.writeQuery({ query: _getExpenses, data: cachedExpenses })
                          }
                        } catch (error) {
                          console.log("Mutation data not merged with Apollo cache. Error stack:\n", error);
                        }
                      }}
                    >
                      {(addMovement, { loading, error, data }) => {
                        if (loading) { return <Spinner color="primary" /> }
                        if (error) { return <p className="text-danger">An error occurred: entry not added. Please retry in a while.</p> }
                        
                        return (
                          <Button
                            color="primary"
                            onClick={() => {
                              addMovement({
                                variables: {
                                  description: description.value,
                                  amount: parseFloat(amount.value),
                                  categoryId: categoryId.value,
                                }
                              })
                            }}
                            disabled={
                              pristine ||
                              description.invalid || 
                              amount.invalid ||
                              categoryId.invalid
                            }
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