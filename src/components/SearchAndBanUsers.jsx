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

  const handleBanUser = async (userId) => {
    try {
      await client.patch(`/users/${userId}/ban`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Rimuovi l'utente dalla lista degli utenti
      const updatedUsers = users.filter((user) => user._id !== userId);
      setUsers(updatedUsers);

      // Aggiungi l'utente alla lista degli utenti bannati
      const bannedUser = users.find((user) => user._id === userId);
      setBannedUsers((prevBannedUsers) => [...prevBannedUsers, bannedUser]);

      // Se la ricerca è attiva, rimuovi anche l'utente dalla lista filtrata
      if (isSearchActive) {
        const updatedFilteredUsers = filteredUsers.filter(
          (user) => user._id !== userId
        );
        setFilteredUsers(updatedFilteredUsers);
      }
    } catch (error) {
      console.error("Error banning user:", error);
    }
  };

  const handleUnbanUser = async (userId) => {
    try {
      await client.patch(`/users/${userId}/unban`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Rimuovi l'utente dalla lista degli utenti bannati
      const updatedBannedUsers = bannedUsers.filter(
        (user) => user._id !== userId
      );
      setBannedUsers(updatedBannedUsers);

      // Aggiungi l'utente alla lista degli utenti
      const updatedUsers = [
        ...users,
        bannedUsers.find((user) => user._id === userId),
      ];
      setUsers(updatedUsers);

      // Se la ricerca è attiva, aggiungi anche l'utente alla lista filtrata
      if (isSearchActive) {
        setFilteredUsers((prevFilteredUsers) => [
          ...prevFilteredUsers,
          bannedUsers,
        ]);
      }
    } catch (error) {
      console.error("Error unbanning user:", error);
    }
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
                  <Row key={user._id} className="p-0 m-0 mt-2">
                    <Col>{user.username}</Col>
                    <Col>
                      <Button
                        variant="danger"
                        onClick={() => handleBanUser(user._id)}
                      >
                        {"Banna"} {user.username}
                      </Button>
                    </Col>
                    {/* Add other user details you want to display */}
                  </Row>
                ))
              : users.map((user) => (
                  <Row key={user._id} className="p-0 m-0 mt-2">
                    <Col>{user.username}</Col>
                    <Col>
                      <Button
                        variant="danger"
                        onClick={() => handleBanUser(user._id)}
                      >
                        {"Banna"} {user.username}
                      </Button>
                    </Col>
                    {/* Add other user details you want to display */}
                  </Row>
                ))}
          </div>
        )}
        {activeTab === "#bannedUsers" && (
          <div>
            {bannedUsers.length > 0 ? (
              bannedUsers.map((user) => (
                <Row key={user._id} className="p-0 m-0 mt-2">
                  <Col>{user.username}</Col>
                  <Col>
                    <Button
                      variant="outline-success"
                      onClick={() => handleUnbanUser(user._id)}
                    >
                      {"Sbanna"} {user.username}
                    </Button>
                  </Col>
                </Row>
              ))
            ) : (
              <p>Nessun utente bannato... MENO MALE!</p>
            )}
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
