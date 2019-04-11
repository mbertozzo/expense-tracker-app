import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Container,
  Row,
  Col
} from "reactstrap";

class FormCard extends Component {

  state = {
    focused: false,
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
                        type="text"
                      />
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
                        placeholder="15/02/2019"
                        type="text"
                      />
                    </FormGroup>
                  </Col>
                </Row>

                {/* <hr class="my-4" /> */}

                <Row>
                  <Col className="text-right mt-5">
                    <Button
                      color="primary"
                    >
                      Confirm
                    </Button>
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