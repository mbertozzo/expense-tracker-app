import React from "react";

import {
  Button,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Spinner,
  Table,
  Container,
  Row,
  UncontrolledTooltip
} from "reactstrap";

import TableEntry from './TableEntry';

class ReportTable extends React.Component {
  render() {

    const { data, loading, error } = this.props;

    // Create table rows with GraphQL data, show spinner on loading
    // or error message if something fails
    let content = null;
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
      content = data.movements.map((item, key) => <TableEntry {...{key}} {...item} />);
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
                    <h3 className="mb-0">Latest movements</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      onClick={() => this.props._changeRoute('/add')}
                      size="sm"
                    >
                      Add New
                    </Button>
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
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
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