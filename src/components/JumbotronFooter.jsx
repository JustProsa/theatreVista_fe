import React from "react";
import { Row, Col, Button } from "react-bootstrap";

const JumbotronFooter = () => {
  return (
    <Row
      className="gutter-0"
      style={{
        backgroundColor: "#dbd5c9",
        paddingBottom: "3rem",
      }}
    >
      <Col>
        <h1>
          {"Torino non è mai stata così"}{" "}
          <span className="theatre-footer">Theatre</span>
        </h1>
      </Col>
    </Row>
  );
};

export default JumbotronFooter;
