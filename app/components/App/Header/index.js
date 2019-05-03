import React from "react";

import { _getBalance, _getRevenues, _getExpenses, _getPerformance } from 'api/queries';
import { Query } from 'react-apollo';

import CardContent from './CardContent';

import { Card, Col, Container, Row, Spinner } from "reactstrap";

const Header = (props) => {
  
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
                          icon="fa-chart-line"
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
                          title="Monthly Expenses"
                          value={data.expenses.value}
                          icon="fa-user-minus"
                          iconBackground="bg-warning"
                          trend={data.expenses.trend}
                          type="invertedTrend"
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
                          title="Monthly Revenues"
                          value={data.revenues.value}
                          icon="fa-user-plus"
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

                  <Query query={_getPerformance} fetchPolicy='cache-and-network'>
                    {({ loading, error, data }) => {
                      if (loading ) { return <Spinner color="primary" /> }
                      if ( error ) { return <p className="text-danger">Error fetching data</p> }

                      return (
                        <CardContent
                          title="Performance"
                          value={data.performance}
                          icon="fa-percent"
                          iconBackground="bg-info"
                          type="percentage"
                        />
                      )

                    }}
                  </Query>

                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );

}

export default Header;