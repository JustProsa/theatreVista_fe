import React, { useState, useEffect } from "react";
import AxiosClient from "../client/client";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import ReviewCard from "./ReviewCard";

const client = new AxiosClient();

const ReviewList = ({ showId }) => {
  const [reviews, setReviews] = useState({ reviews: [] });

  const fetchReviews = async () => {
    try {
      const response = await client.get(`/reviews/show/${showId}`);
      setReviews(response);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
    console.log(reviews);
  }, [showId]);

  return (
    <>
      {reviews.reviews.map((review) => (
        <ReviewCard
          key={review._id}
          userAvatar={review.user.avatar}
          comment={review.comment}
          rating={review.rating}
          user={review.user.username}
          showTitle={review.show.title}
          createdAt={review.createdAt}
        />
      ))}
    </>
  );
};

export default ReviewList;
