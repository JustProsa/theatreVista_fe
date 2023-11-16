import React, { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import JumbotronFooter from "./JumbotronFooter";
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

const HomeJumbotron = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let intervalId;

    if (isHovered) {
      intervalId = setInterval(() => {
        setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
      }, 200);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isHovered]);

  return (
    <>
      <Container fluid>
        <Row className="home-container no-gutters align-items-center justify-content-center">
          <Col className="text-center" sm={12} md={12} lg={4}>
            <h1 className="jumbotron-title">Theatre</h1>
          </Col>
          <Col className="text-center m-0 p-0" sm={12} md={12} lg={4}>
            <div
              className="shadow-sm images-container"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <img
                src={images[currentImage]}
                alt="Immagine"
                className="img-fluid shadow-sm"
                style={{ height: "100%" }}
              />
            </div>
          </Col>
          <Col className="text-center m-0 p-0" sm={12} md={12} lg={4}>
            <h1 className="jumbotron-title">Vista</h1>
          </Col>
          <Col sm={12} className="text-center">
            <JumbotronFooter />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HomeJumbotron;
