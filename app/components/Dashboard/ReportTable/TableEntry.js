import React from "react";

import DeleteEntry from './DeleteEntry';

import {
  Badge,
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
  Table,
  Container,
  Row,
  UncontrolledTooltip
} from "reactstrap";

class TableEntry extends React.Component {
  render() {

    const { id, description, amount, category: { name: categoryName } } = this.props;

    let color, icon = '';
    if (amount > 0) {
      color = 'success';
      icon = 'ni-bold-up';
    } else {
      color = 'danger';
      icon = 'ni-bold-down';
    }

    return (

      <tr>
        <th scope="row">
          <div className={`icon-sm icon-shape rounded-circle mr-4 text-${color} border border-${color}`}>
            <i className={`ni ${icon}`} />
          </div>
          <span className="mb-0 text-sm">
            {description}
          </span>
        </th>
        <td className="text-right">
          {amount.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} €
        </td>
        <td>
          <Badge color="" className="badge-dot mr-4">
            <i className="bg-warning" />
            {categoryName}
          </Badge>
        </td>
        <td className="text-right">
          <UncontrolledDropdown>
            <DropdownToggle
              className="btn-icon-only text-light"
              href="#pablo"
              role="button"
              size="sm"
              color=""
              onClick={e => e.preventDefault()}
            >
              <i className="fas fa-ellipsis-v" />
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-arrow" right>
              
              <DeleteEntry {...{id}} {...{amount}} />

              <DropdownItem
                href="#pablo"
                onClick={e => e.preventDefault()}
              >
                Another action
              </DropdownItem>
              <DropdownItem
                href="#pablo"
                onClick={e => e.preventDefault()}
              >
                Something else here
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </td>
      </tr>
              
    );
  }
}

export default TableEntry;