import React from 'react';

import { Card, CardBody, CardTitle, Col, Container, Row, Spinner } from "reactstrap";

const CardContent = (props) => {

  const { title, value, icon, iconBackground, trend } = props;

  let color, arrow;
  if (trend >= 0) {
    color = 'text-success';
    arrow = 'fa-arrow-up';
  } else {
    color = 'text-danger';
    arrow = 'fa-arrow-down';
  }

  return (
    <CardBody>
      <Row>
        <div className="col">
          <CardTitle
            tag="h5"
            className="text-uppercase text-muted mb-0"
          >
            {title}
          </CardTitle>
          <span className="h2 font-weight-bold mb-0">
            {value.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}     
          </span>
        </div>
        <Col className="col-auto">
          <div className={`icon icon-shape ${iconBackground} text-white rounded-circle shadow`}>
            <i className={`fa ${icon}`} />
          </div>
        </Col>
      </Row>
      <p className="mt-3 mb-0 text-muted text-sm">
        <span className={`${color} mr-2`}>
          <i className={`fa ${arrow}`} /> {trend}%
        </span>{" "}
        <span className="text-nowrap">Since last month</span>
      </p>
    </CardBody>
  )
}

export default CardContent;