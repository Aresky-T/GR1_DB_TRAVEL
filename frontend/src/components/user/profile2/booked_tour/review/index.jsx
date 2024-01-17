import React, { useState } from "react";
import "./style.scss";

const ReviewBookedTour = ({bookedTour}) => {
  const [review, setReview] = useState({
    isShowModal: false,
    stars: 0,
    comment: '',
    tourId: null,
  });

  return <div className="review-booked-tour modal">review</div>;
};

export default ReviewBookedTour;
