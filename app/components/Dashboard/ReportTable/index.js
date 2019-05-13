import React from "react";

import Button from './Buttons/';
import Pagination from './Pagination';

import {
  Card,
  CardHeader,
  CardFooter,
  Spinner,
  Table,
  Container,
  Row,
  UncontrolledTooltip
} from "reactstrap";

import TableEntry from './TableEntry';

class ReportTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 1,
    }

    this.updateCurrentPage = this.updateCurrentPage.bind(this);
  }

  updateCurrentPage(page) {
    this.setState({currentPage: page})
  }

  render() {

    const { 
      data,
      data: { category: { name }  = {} } = {},
      loading,
      error,
      pageLimit,
      fetchMore,
      isCategoryReport = false,
      _changeRoute
    } = this.props;

    // Create table rows with GraphQL data, show spinner on loading
    // or error message if something fails
    let content, pagination = null;
    if (loading) {
      content = (
        <tr>
          <th scope="row" colSpan="4" className="text-center">
            <Spinner color="primary" style={{width: '3rem', height: '3rem'}} />
          </th>
        </tr>
      );
    } else if (error) {
      content = <tr><th scope="row"><p className="mb-0">{error.message}</p></th></tr>;
    } else {
      if (isCategoryReport) {
        content = data.category.movements.map((item, key) => <TableEntry {...{key}} {...item} {...{_changeRoute, isCategoryReport}} />);  
      } else {

        const { nodes, totalCount } = data.movements;
        const { currentPage } = this.state;

        content = nodes.map((item, key) => <TableEntry {...{key}} {...item} {...{_changeRoute, isCategoryReport}} />);
        pagination = <Pagination {...{pageLimit, totalCount, fetchMore, currentPage}} updatePage={this.updateCurrentPage} />
      }
    }

    return (

      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">
                      {(isCategoryReport && !loading) 
                        ? `Movements for: ${name}`
                        : 'Latest movements'
                      }
                    </h3>
                  </div>
                  <div className="col text-right">
                    {(isCategoryReport)
                      ? <Button.ViewAll {...{_changeRoute}} />
                      : <Button.Add {...{_changeRoute}} />
                    }
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Description</th>
                    <th scope="col" className="text-right">Amount</th>
                    <th scope="col">Category</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>

                  {content}

                </tbody>
              </Table>
              <CardFooter className="py-4">
                <nav aria-label="...">
                  {pagination}
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>

    );
  }
}

export default ReportTable;