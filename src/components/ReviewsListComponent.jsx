import React, { useState, useEffect } from "react";
import AxiosClient from "../client/client";
import { Spinner } from "react-bootstrap";
import ReviewCard from "./ReviewCard";

const client = new AxiosClient();

const ReviewList = ({ showId }) => {
  const [reviews, setReviews] = useState({ reviews: [] });
  const [isLoading, setIsLoading] = useState(false);

  const fetchReviews = async () => {
    try {
      setIsLoading(true);
      const response = await client.get(`/reviews/show/${showId}`);
      setReviews(response);
      setIsLoading(false);
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
      {isLoading ? (
        // Se isLoading è true, mostra lo spinner centrato
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "30vh",
          }}
        >
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        // Se isLoading è false, mostra il codice
        reviews.reviews.map((review) => (
          <ReviewCard
            key={review._id}
            userAvatar={review.user.avatar}
            userId={review.user._id}
            reviewId={review._id}
            comment={review.comment}
            rating={review.rating}
            user={review.user.username}
            showTitle={review.show.title}
            createdAt={review.createdAt}
          />
        ))
      )}
    </>
  );
};

export default ReviewList;
