import React, { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { PiSealWarningFill } from "react-icons/pi";
import Rating from "./Rating";
import Comment from "./Comment";
import { OPTIONS } from "..";
import {
  getReviewByTourAndAccount,
  reviewBookedTourApi,
} from "../../../../../api/review";
import { useAuth } from "../../../../../redux/selector";
import { successAlert } from "../../../../../config/sweetAlertConfig";
import { toast } from "react-hot-toast";

const ReviewBookedTour = ({ type, bookedTour, hiddenModal, isShow }) => {
  const [comment, setComment] = useState("");
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const [isReviewed, setIsReviewed] = useState(false);
  const { accessToken } = useAuth();
  const stars = Array(5).fill(0);
  const isActive = type === OPTIONS.REVIEW_BOOKED_TOUR && isShow;

  const handleChangeComment = (event) => {
    setComment(event.target.value);
  };

  const handleHiddenModal = () => {
    resetReview();
    hiddenModal();
  };

  const handleMouseOver = (newHoverValue) => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  const handleClick = (value) => {
    setCurrentValue(value);
  };

  const resetReview = () => {
    setComment("");
    setCurrentValue(0);
  };

  const handleSubmitReview = () => {
    if (currentValue < 1 || comment.trim() === "") {
      toast.error("Dữ liệu chưa hợp lệ!");
      return;
    }

    reviewBookedTourApi(comment, currentValue, bookedTour.tourId, accessToken)
      .then((res) => {
        hiddenModal();
        const message = isReviewed
          ? "Bạn đã cập nhật đánh giá thành công!"
          : "Cảm ơn quý khách đã gửi đánh giá tới BK TRAVEL!";
        successAlert("Thành công", message, "Thoát");
      })
      .catch((err) => {
        resetReview();
      });
  };

  useEffect(() => {
    function checkReviewedTour(tourId, accessToken) {
      getReviewByTourAndAccount(tourId, accessToken)
        .then((res) => {
          const data = res.data;
          if (data) {
            setIsReviewed(true);
            setComment(data.comment);
            setCurrentValue(data.stars);
          }
        })
        .catch((err) => {});
    }

    if (accessToken && bookedTour) {
      const tourId = bookedTour.tourId;
      checkReviewedTour(tourId, accessToken);
    }
  }, [accessToken, bookedTour]);

  return (
    <div
      className={`${OPTIONS.REVIEW_BOOKED_TOUR} modal-container ${
        isActive ? "active" : ""
      }`}
    >
      <div className="modal">
        <div className="modal-close">
          <button onClick={handleHiddenModal}>
            <IoCloseOutline />
          </button>
        </div>
        <header className="modal__header">
          <strong>
            <span className="icon">
              <PiSealWarningFill />
            </span>
            Đánh giá Tour
          </strong>
        </header>
        <div className="modal__main scroll-container">
          <div className="modal__main-item">
            <h2 className="modal-title">
              <span>#</span> Tour:{" "}
              <u style={{ color: "#000" }}>
                <i>{bookedTour?.tourTitle ?? "Không xác định"}</i>
              </u>
            </h2>
          </div>
          <div className="modal__main-item">
            <Rating
              stars={stars}
              currentValue={currentValue}
              hoverValue={hoverValue}
              handleMouseOver={handleMouseOver}
              handleMouseLeave={handleMouseLeave}
              handleClick={handleClick}
            />
          </div>
          <div className="modal__main-item">
            <Comment
              comment={comment}
              handleChangeComment={handleChangeComment}
            />
          </div>
        </div>
        <div className="modal__footer">
          <div className="buttons-area">
            <button className="profile-btn cancel" onClick={handleHiddenModal}>
              Hủy
            </button>
            <button className="profile-btn submit" onClick={handleSubmitReview}>
              {isReviewed ? "Cập nhật đánh giá" : "Gửi đánh giá"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewBookedTour;
