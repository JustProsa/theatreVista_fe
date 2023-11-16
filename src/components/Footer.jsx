import React from "react";
import { Row, Col, Button } from "react-bootstrap";

const Footer = () => {
  return (
    <Row
      className="gutter-0"
      style={{
        backgroundColor: "#dbd5c9",
      }}
    >
      <Col className="justify-content-center align-items-center" sm={3}>
        <Button
          variant="link"
          style={{
            color: "#00001c",
            textDecoration: "none",
            fontSize: "1rem",
          }}
        >
          Email
        </Button>
      </Col>
      <Col className="justify-content-center align-items-center" sm={3}>
        <Button
          variant="link"
          style={{
            color: "#00001c",
            textDecoration: "none",
            fontSize: "1rem",
          }}
        >
          Instagram
        </Button>
      </Col>
      <Col className="justify-content-center align-items-center" sm={3}>
        <Button
          variant="link"
          style={{
            color: "#00001c",
            textDecoration: "none",
            fontSize: "1rem",
          }}
        >
          Twitter
        </Button>
      </Col>
      <Col className="justify-content-center align-items-center" sm={3}>
        <Button
          variant="link"
          style={{
            color: "#00001c",
            textDecoration: "none",
            fontSize: "1rem",
          }}
        >
          Facebook
        </Button>
      </Col>
    </Row>
  );
};

export default Footer;
