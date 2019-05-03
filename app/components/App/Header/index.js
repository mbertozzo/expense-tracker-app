import React from "react";

import { _getBalance, _getRevenues, _getExpenses, _getPerformance } from 'api/queries';
import { Query } from 'react-apollo';

import CardContent from './CardContent';

import { Card, CardBody, CardTitle, Col, Container, Row, Spinner } from "reactstrap";

class Header extends React.Component {
  render() {
    return (
      <>
        <div className="header bg-gradient-info pb-8 pt-8">
          <Container fluid>
            <div className="header-body">
              {/* Card stats */}
              <Row>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">

                    <Query query={_getBalance} fetchPolicy='cache-and-network'>
                      {({ loading, error, data }) => {
                        if (loading ) { return <Spinner color="primary" /> }
                        if ( error ) { return <p className="text-danger">Error fetching data</p> }

                        return (
                          <CardContent
                            title="Balance"
                            value={data.balance.value}
                            icon="fa-chart-bar"
                            iconBackground="bg-danger"
                            trend={data.balance.trend}
                          />
                        )

                      }}
                    </Query>
                  
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">

                    <Query query={_getExpenses} fetchPolicy='cache-and-network'>
                      {({ loading, error, data }) => {
                        if (loading ) { return <Spinner color="primary" /> }
                        if ( error ) { return <p className="text-danger">Error fetching data</p> }

                        return (
                          <CardContent
                            title="Montly Expenses"
                            value={data.expenses.value}
                            icon="fa-chart-pie"
                            iconBackground="bg-warning"
                            trend={data.expenses.trend}
                          />
                        )

                      }}
                    </Query>

                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">

                    <Query query={_getRevenues} fetchPolicy='cache-and-network'>
                      {({ loading, error, data }) => {
                        if (loading ) { return <Spinner color="primary" /> }
                        if ( error ) { return <p className="text-danger">Error fetching data</p> }

                        return (
                          <CardContent
                            title="Montly Revenues"
                            value={data.revenues.value}
                            icon="fa-chart-users"
                            iconBackground="bg-yellow"
                            trend={data.revenues.trend}
                          />
                        )

                      }}
                    </Query>

                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Performance
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            
                            <Query query={_getPerformance} fetchPolicy='cache-and-network'>
                              {({ loading, error, data }) => {
                                if (loading ) { return <Spinner color="primary" /> }
                                if ( error ) { return <p className="text-danger">Error fetching data</p> }

                                return data.performance + '%';

                              }}
                            </Query>

                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                            <i className="fas fa-percent" />
                          </div>
                        </Col>
                      </Row>
                      <p className="mt-3 mb-0 text-muted text-sm">
                        <span className="text-success mr-2">
                          <i className="fas fa-arrow-up" /> 12%
                        </span>{" "}
                        <span className="text-nowrap">Since last month</span>
                      </p>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      </>
    );
  }
}

export default Header;