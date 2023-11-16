import React from "react";
import { Row, Col } from "react-bootstrap";
import NavbarLayout from "../layouts/NavbarLayout";
import AddShowModal from "../components/AddShowModal";
import FindAndUpdateShows from "../components/FindAndUpdateShows";
import SearchAndBanUsers from "../components/SearchAndBanUsers";

const AdminArea = () => {
  return (
    <NavbarLayout>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#dbd5c9",
        }}
      >
        <AddShowModal />
      </div>
      <Row
        className="m-0 p-0"
        style={{ backgroundColor: "#dbd5c9", height: "100vh" }}
      >
        <Col sm={12} md={6} className="m-0 p-0">
          <FindAndUpdateShows />
        </Col>
        <Col sm={12} md={6} className="m-0 p-0">
          <SearchAndBanUsers />
        </Col>
      </Row>
    </NavbarLayout>
  );
};

export default AdminArea;
