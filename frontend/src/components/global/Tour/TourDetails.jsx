import React, { useEffect, useRef, useState } from "react";
import { FaOpencart } from "react-icons/fa";
import { MdStarRate } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const TourDetails = ({ tour, showReviewsModal, reviewState }) => {
  const navigate = useNavigate();
  const bookingRef = useRef();
  const [shouldStop, setShouldStop] = useState(false);

  const onClickBooking = () => {
    navigate(`/booking/${tour?.tourCode}`);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setShouldStop(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="tour-detail">
      <section className="tour-detail-item info">
        <div className="tour-detail__title">
          <h1>{tour?.title || "Không xác định"}</h1>
        </div>
        <div className="tour-detail-reviews">
          {reviewState.isReviewed ? (
            <>
              <strong>
                {reviewState.review?.avgStars ?? 0}
                <MdStarRate color={"var(--primary-color)"} />
              </strong>
              <div>
                ({reviewState.review?.numberOfReviews ?? 0} lượt đánh giá)
                <div onClick={showReviewsModal} className="show-reviews-btn">
                  Xem tất cả
                </div>
              </div>
            </>
          ) : (
            <div style={{ color: "var(--primary-color)" }}>
              Chưa có đánh giá!
            </div>
          )}
        </div>
        <div className="tour-detail__images">
          <div className="tour_image1">
            <img src={tour?.image1} alt="image1" />
          </div>
          <div className="tour_image2">
            <img src={tour?.image2} alt="image1" />
          </div>
          <div className="tour_image3">
            <img src={tour?.image3} alt="image1" />
          </div>
          <div className="tour_image4">
            <img src={tour?.image4} alt="image1" />
          </div>
        </div>
        <h3>Danh sách điểm đến: </h3>
        <div className="tour-detail__info main-1">
          <p>{tour?.destinationList}</p>
        </div>
        <h3>Lịch trình tham quan</h3>
        <div className="tour-detail__info main-2">
          {React.createElement("div", {
            dangerouslySetInnerHTML: { __html: tour?.scheduleDescription },
          })}
        </div>
      </section>
      <section
        className={
          shouldStop
            ? "tour-detail-item booking booking-fixed"
            : "tour-detail-item booking"
        }
        ref={bookingRef}
      >
        <div className="tour-detail__price">
          <h2>Thông tin giá</h2>
          <table className="prices-table">
            <thead>
              <tr>
                <th>Loại khách</th>
                <th>Giá tour</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Người lớn (Từ 12 tuổi trở lên)</td>
                <td>{tour?.price1?.toLocaleString("en-US")} đ</td>
              </tr>
              <tr>
                <td>Trẻ em (Từ 2 - 11 tuổi)</td>
                <td>
                  {tour?.price2
                    ? `${tour?.price2.toLocaleString("en-US")} đ`
                    : "Miễn phí"}
                </td>
              </tr>
              <tr>
                <td>Em bé (Dưới 2 tuổi)</td>
                <td>
                  {tour?.price3
                    ? `${tour?.price3.toLocaleString("en-US")} đ`
                    : "Miễn phí"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="dividing-line"></div>
        <div className="tour-detail__other">
          <h2>Thông tin khác</h2>
          <div className="tour-detail__other-item">
            <span className="sub-title">Tổng thời gian: </span>
            <span className="sub-content">{tour?.time}</span>
          </div>
          <div className="tour-detail__other-item">
            <span className="sub-title">Thời gian khởi hành: </span>
            <span className="sub-content">
              {new Date(tour?.startTime).toLocaleString("vi-VN", {
                timeStyle: "short",
                dateStyle: "short",
              })}
            </span>
          </div>
          <div className="tour-detail__other-item">
            <span className="sub-title">Địa điểm tập trung: </span>
            <span className="sub-content">{tour?.startAddress}</span>
          </div>
          <div className="tour-detail__other-item">
            <span className="sub-title">Số chỗ trống: </span>
            <span className="sub-content">{tour?.availableSeats}</span>
          </div>
          <div className="tour-detail__other-item">
            <span className="sub-title">Phương tiện: </span>
            <span className="sub-content">{tour?.vehicle}</span>
          </div>
          <div className="tour-detail__other-item">
            <span className="sub-title">Dẫn đoàn: </span>
            <span className="sub-content">
              {tour?.tourGuide?.fullName || "Chưa xác định"}
            </span>
          </div>
        </div>
        <div className="dividing-line"></div>
        <div className="booking-btn">
          <button onClick={onClickBooking}>
            <FaOpencart /> Đặt ngay
          </button>
        </div>
      </section>
    </div>
  );
};

export default TourDetails;
