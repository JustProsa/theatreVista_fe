import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Nav,
  Form,
  FormControl,
  Row,
  Col,
} from "react-bootstrap";
import AxiosClient from "../client/client";

const client = new AxiosClient();
const token = localStorage.getItem("loggedInUser");

const SearchAndBanUsers = () => {
  const [activeTab, setActiveTab] = useState("#users");
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [bannedUsers, setBannedUsers] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleTabChange = (selectedTab) => {
    setActiveTab(selectedTab);
  };

  const fetchUsers = async () => {
    try {
      const response = await client.get("/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.users);
      setFilteredUsers(response.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = async () => {
    const filtered = users.filter((user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
    setIsSearchActive(true);
  };

  useEffect(() => {
    if (activeTab === "#users") {
      fetchUsers();
    }
  }, [activeTab]);

  return (
    <Card
      style={{ width: "100%", border: "none", backgroundColor: "transparent" }}
      className="mt-5"
    >
      <Card.Header>
        <Nav variant="tabs" defaultActiveKey="#users">
          <Nav.Item>
            <Nav.Link
              href="#users"
              style={{ color: "black" }}
              onClick={() => handleTabChange("#users")}
            >
              Utenti
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              href="#bannedUsers"
              style={{ color: "black" }}
              onClick={() => handleTabChange("#bannedUsers")}
            >
              Utenti Bannati
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              href="#usersReports"
              style={{ color: "black" }}
              onClick={() => handleTabChange("#usersReports")}
            >
              Segnalazioni
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Card.Header>
      <Card.Body>
        {activeTab === "#users" && (
          <div>
            <Form inline className="mb-2">
              <Row>
                <Col>
                  <FormControl
                    type="text"
                    placeholder="Cerca per username"
                    className="mr-sm-2"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </Col>
                <Col>
                  <Button variant="outline-success" onClick={handleSearch}>
                    Cerca
                  </Button>
                </Col>
              </Row>
            </Form>
            {isSearchActive
              ? filteredUsers.map((user) => (
                  <div key={user._id}>
                    <p>{user.username}</p>
                    {/* Add other user details you want to display */}
                  </div>
                ))
              : users.map((user) => (
                  <div key={user._id}>
                    <p>{user.username}</p>
                    {/* Add other user details you want to display */}
                  </div>
                ))}
          </div>
        )}
        {activeTab === "#bannedUsers" && (
          <div>
            <Card.Title>Special title treatment - Tab 2</Card.Title>
            <Card.Text>Content for the second tab.</Card.Text>
            <Button variant="primary">Go somewhere else</Button>
          </div>
        )}
        {activeTab === "#usersReports" && (
          <div>
            <Card.Title>Special title treatment - Tab 3</Card.Title>
            <Card.Text>Content for the second tab.</Card.Text>
            <Button variant="primary">Go somewhere else</Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default SearchAndBanUsers;
