import React from "react";

import DeleteEntry from './DeleteEntry';

import {
  Badge,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
} from "reactstrap";

const TableEntry = (props) => {

  const { id, description, amount, category: { id: categoryId , name: categoryName, color: categoryColor }, _changeRoute, isCategoryReport } = props;

  const paletteMap = {
    blue:    '#5e72e4',
    indigo:  '#5603ad',
    purple:  '#8965e0',
    pink:    '#f3a4b5',
    red:     '#f5365c',
    orange:  '#fb6340',
    yellow:  '#ffd600',
    green:   '#2dce89',
    teal:    '#11cdef',
    cyan:    '#2bffc6',
  };

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
          <i style={{backgroundColor: paletteMap[categoryColor]}} />
          <span 
            onClick={() => _changeRoute(`/cat/${categoryId}`)}
            style={{cursor: 'pointer'}}
          >
            {categoryName}
          </span>
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
            
            <DeleteEntry {...{id, amount, isCategoryReport, categoryId}} />

          </DropdownMenu>
        </UncontrolledDropdown>
      </td>
    </tr>
            
  );

}

export default TableEntry;