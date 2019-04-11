import React from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Row,
  Col
} from "reactstrap";

const SideCard = (props) => {
  return (
    <Col xl={props.xl}>
      <Card className="card-profile shadow">
        <CardHeader className="border-0">
          <Row className="align-items-center">
            <Col> 
              <h3 className="mb-0">Most used categories</h3>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <Row>
            <div className="col">
              <div className="card-profile-stats d-flex flex-wrap justify-content-center p-0">
                <div>
                  <span className="heading">22</span>
                  <span className="description">Friends</span>
                </div>
                <div>
                  <span className="heading">10</span>
                  <span className="description">Photos</span>
                </div>
                <div>
                  <span className="heading">89</span>
                  <span className="description">Comments</span>
                </div>
              

                <div>
                  <span className="heading">22</span>
                  <span className="description">Friends</span>
                </div>
                <div>
                  <span className="heading">10</span>
                  <span className="description">Photos</span>
                </div>
                <div>
                  <span className="heading">89</span>
                  <span className="description">Comments</span>
                </div>

              </div>
            </div>
          </Row>
          {/* <div className="text-center">
            <hr className="my-4" />
            <p>
              Ryan — the name taken by Melbourne-raised, Brooklyn-based
              Nick Murphy — writes, performs and records all of his own
              music.
            </p>
            <a href="#pablo" onClick={e => e.preventDefault()}>
              Show more
            </a>
          </div> */}
        </CardBody>
      </Card>
    </Col>
          
  );
}

export default SideCard;
