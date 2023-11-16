import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import "./navbar.css";
import "../style/global.css";
import img1 from "../imgs/moschette.jpg";
import img2 from "../imgs/hypergaia.jpg";
import img3 from "../imgs/qanon.jpg";
import img4 from "../imgs/vitamorterivoluzione.jpg";
import img5 from "../imgs/stillalive.jpg";
import img6 from "../imgs/lidodissea.jpg";
import img7 from "../imgs/hotelborges.jpg";
import img8 from "../imgs/Sergio.jpg";

const images = [img1, img2, img3, img4, img5, img6, img7, img8];

const HomeMain = () => {
  return (
    <>
      <h1
        className="text-center"
        style={{ marginTop: "2rem", marginBottom: "2rem" }}
      >
        I PIU' VOTATI
      </h1>
      <Row className=" p-0 m-0">
        <Col sm={12} md={6} className="mb-2">
          <Card
            className="bg-dark text-white"
            style={{ maxHeight: "350px", overflow: "hidden" }}
          >
            <Card.Img
              src={images[0]}
              alt="Card image"
              style={{ opacity: "0.4" }}
            />
            <Card.ImgOverlay>
              <Card.Title>Card title</Card.Title>
              <Card.Text>
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </Card.Text>
              <Card.Text>Last updated 3 mins ago</Card.Text>
            </Card.ImgOverlay>
          </Card>
        </Col>
        <Col sm={12} md={6} className="mb-2">
          <Card
            className="bg-dark text-white"
            style={{ maxHeight: "350px", overflow: "hidden" }}
          >
            <Card.Img
              src={images[1]}
              alt="Card image"
              style={{ opacity: "0.4" }}
            />
            <Card.ImgOverlay>
              <Card.Title>Card title</Card.Title>
              <Card.Text>
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </Card.Text>
              <Card.Text>Last updated 3 mins ago</Card.Text>
            </Card.ImgOverlay>
          </Card>
        </Col>
        <Col sm={12} md={6} className="mb-2">
          <Card
            className="bg-dark text-white"
            style={{ maxHeight: "350px", overflow: "hidden" }}
          >
            <Card.Img
              src={images[2]}
              alt="Card image"
              style={{ opacity: "0.4" }}
            />
            <Card.ImgOverlay>
              <Card.Title>Card title</Card.Title>
              <Card.Text>
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </Card.Text>
              <Card.Text>Last updated 3 mins ago</Card.Text>
            </Card.ImgOverlay>
          </Card>
        </Col>
        <Col sm={12} md={6} className="mb-2">
          <Card
            className="bg-dark text-white"
            style={{ maxHeight: "350px", overflow: "hidden" }}
          >
            <Card.Img
              src={images[3]}
              alt="Card image"
              style={{ opacity: "0.4" }}
            />
            <Card.ImgOverlay>
              <Card.Title>Card title</Card.Title>
              <Card.Text>
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </Card.Text>
              <Card.Text>Last updated 3 mins ago</Card.Text>
            </Card.ImgOverlay>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default HomeMain;
