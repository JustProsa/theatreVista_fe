import React, { useState, useEffect } from "react";
import { Row, Col, Image, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import AxiosClient from "../client/client";
import NavbarLayout from "../layouts/NavbarLayout";
import UpdateUserModal from "../components/UpdateUserModal";
import ReviewCard from "../components/ReviewCard";

const client = new AxiosClient();
const token = localStorage.getItem("loggedInUser");

const MyArea = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [reviews, setReviews] = useState({ reviews: [] });

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("loggedInUser");
      const userData = await client.get(`/users/details`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(userData);

      const response = await client.get(`/reviews/user/${userData._id}`);
      setReviews(response);

      console.log("Dettagli dell'utente:", userData);
      console.log("Recensioni dell' utente:", response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Sei sicuro di voler eliminare il tuo account?")) {
      try {
        const response = await client.delete(`/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("User deleted:", response);
      } catch (error) {
        console.error("Error deleting user", error);
      }
    }
  };

  useEffect(() => {
    // getUserDetails();
    // fetchReviews();

    fetchData();
  }, [username]);

  const userBirthDay = user ? new Date(user.birthDay) : null;
  const formattedDate = userBirthDay
    ? userBirthDay.toLocaleDateString("it-IT")
    : null;

  return (
    <NavbarLayout>
      {user && (
        <div
          style={{
            backgroundColor: "#dbd5c9",
            height: "100%",
          }}
        >
          <Row className="m-0 p-0">
            <Col sm={12} md={6} className="m-0 p-0">
              <div style={{ textAlign: "center", paddingTop: "3rem" }}>
                <h1 className="mb-3">{user.username}</h1>
                <div>
                  <Image src={user.avatar} style={{ width: "35%" }} rounded />
                </div>
                <h2 className="mt-3">
                  {user.firstName} {user.lastName}
                </h2>
                <h2>{formattedDate}</h2>
                <h2>{user.email}</h2>
                <div className="mt-5">
                  <Button
                    variant="outline-danger"
                    onClick={() => {
                      handleDeleteUser(user?._id);
                    }}
                  >
                    Elimina Account
                  </Button>
                </div>
              </div>
            </Col>
            <Col sm={12} md={6} className="m-0 p-0">
              <UpdateUserModal
                userId={user?._id}
                firstName={user?.firstName}
                lastName={user?.lastName}
                email={user?.email}
                birthDay={userBirthDay}
                avatar={user?.avatar}
              />
            </Col>
          </Row>
          <div
            style={{
              backgroundColor: "#dbd5c9",
              height: "100%",
            }}
          >
            <h2 className="m-5 text-center">Le tue Recensioni</h2>
            {reviews.reviews.map((review) => (
              <ReviewCard
                key={review._id}
                userAvatar={review.user.avatar}
                comment={review.comment}
                rating={review.rating}
                user={review.user.username}
                showTitle={review.show.title}
                showId={review.show._id}
              />
            ))}
          </div>
        </div>
      )}
    </NavbarLayout>
  );
};

export default MyArea;
