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

    const { id, description, amount, category: { name: categoryName }, _changeRoute } = this.props;

    let color, icon = '';
    if (amount > 0) {
      color = 'success';
      icon = 'fa-chevron-up';
    } else {
      color = 'danger';
      icon = 'fa-chevron-down';
    }

    return (

      <tr>
        <th scope="row">
          <div className={`icon-sm icon-shape rounded-circle mr-4 text-${color} border border-${color}`}>
            <i className={`fas ${icon}`} />
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
              role="button"
              size="sm"
              color=""
              onClick={e => e.preventDefault()}
            >
              <i className="fas fa-ellipsis-v" />
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-arrow" right>

              <DropdownItem
                onClick={() => _changeRoute(`/edit/${id}`)}
              >
                Edit entry
              </DropdownItem>
              
              <DeleteEntry {...{id}} {...{amount}} />

            </DropdownMenu>
          </UncontrolledDropdown>
        </td>
      </tr>
              
    );
  }
}

export default TableEntry;