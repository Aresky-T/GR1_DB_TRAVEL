import React, { useState } from "react";
import { Link } from "react-router-dom";

const BookedTourDetails = ({ bookedTour }) => {
  const [isShowDetails, setIsShowDetails] = useState(false);
  const handleShowDetail = () => setIsShowDetails(true);
  const handleCancelShowDetail = () => setIsShowDetails(false);

  const isShowReviewButton =
    bookedTour.tourStatus === "FINISHED" && bookedTour.status === "PAY_UP";
  const isShowCancelTourButton =
    bookedTour.tourStatus === "NOT_STARTED" && bookedTour.status !== "PAY_UP";

  const renderTouristList = (touristList) => {
    const renderGender = (gender) => {
      switch (gender) {
        case "MALE":
          return "Nam";
        case "FEMALE":
          return "Nữ";
        case "OTHER":
          return "Khác";
        default:
          return "Không xác định";
      }
    };
    const length = touristList.length;
    if (length <= 1) {
      const tourist = touristList[0];
      return (
        <ul>
          <li>
            Họ tên: <b>{tourist.fullName}</b>
          </li>
          <li>
            Ngày sinh:{" "}
            <b>{new Date(tourist.birthDate).toLocaleDateString("vi-VN")}</b>
          </li>
          <li>
            Giới tính: <b>{renderGender(tourist.gender)}</b>
          </li>
        </ul>
      );
    }

    return (
      <ol>
        {touristList.map((tourist, index) => (
          <li key={index}>
            Khách {index + 1}:
            <ul>
              <li>
                Họ tên: <b>{tourist.fullName}</b>
              </li>
              <li>
                Ngày sinh:{" "}
                <b>{new Date(tourist.birthDate).toLocaleDateString("vi-VN")}</b>
              </li>
              <li>
                Giới tính: <b>{renderGender(tourist.gender)}</b>
              </li>
            </ul>
          </li>
        ))}
      </ol>
    );
  };

  const renderPaymentStatus = (status) => {
    switch (status) {
      case "NOT_PAY":
        return "Chưa thanh toán";
      case "PAY_UP":
        return "Đã thanh toán";
      case "REJECTED":
        return "Bị từ chối";
      default:
        return;
    }
  };

  const renderTourStatus = (status) => {
    switch (status) {
      case "NOT_STARTED":
        return "Chưa xuất phát";
      case "ON_GOING":
        return "Đang diễn ra";
      case "FINISHED":
        return "Đã hoàn thành";
      case "CANCELED":
        return "Đã bị hủy";
      default:
        return;
    }
  };

  return (
    <div
      className={
        isShowDetails ? "booked-tour-details active" : "booked-tour-details"
      }
    >
      <div className="booked-tour-details__image">
        <img src={bookedTour.tourImage1 || ""} alt="booked-tour-img1" />
      </div>
      <div className="booked-tour-details__main">
        <Link
          className="booked-tour-details__item tour-title"
          to={`/tour/${bookedTour.tourId}`}
        >
          {bookedTour.tourTitle}
        </Link>
        <div className="booked-tour-details__item tour-code">
          <span className="booked-tour-details__item__label">▶ Mã Tour:</span>
          <span className="booked-tour-details__item__content">
            {bookedTour.tourTourCode}
          </span>
        </div>
        <div className="booked-tour-details__item book-time">
          <span className="booked-tour-details__item__label">
            ▶ Thời gian đặt:
          </span>
          <span className="booked-tour-details__item__content">
            {new Date(bookedTour.bookTime).toLocaleString("vi-VN", {
              dateStyle: "short",
              timeStyle: "short",
            })}
          </span>
        </div>
        <div className="booked-tour-details__item tour-total-price">
          <span className="booked-tour-details__item__label">
            ▶ Tổng chi phí:
          </span>
          <span className="booked-tour-details__item__content">
            {Number(bookedTour.totalPrice).toLocaleString("vi-VN")} VND
          </span>
        </div>
        <div className="booked-tour-details__item payment-status">
          <span className="booked-tour-details__item__label">
            ▶ Trạng thái đặt tour:
          </span>
          <span className="booked-tour-details__item__content">
            {renderPaymentStatus(bookedTour.status)}
          </span>
        </div>
        <div className="booked-tour-details__item tour-status">
          <span className="booked-tour-details__item__label">
            ▶ Trạng thái Tour:
          </span>
          <span className="booked-tour-details__item__content">
            {renderTourStatus(bookedTour.tourStatus)}
          </span>
        </div>
        <div className="booked-tour-details__item representative">
          <span className="booked-tour-details__item__label">
            ▶ Người đại diện:
          </span>
          <ul>
            <li>
              Họ tên: <b>{bookedTour.fullName}</b>
            </li>
            <li>
              Email: <b>{bookedTour.email}</b>
            </li>
            <li>
              Địa chỉ: <b>{bookedTour.address}</b>
            </li>
            <li>
              Số điện thoại: <b>{bookedTour.phone}</b>
            </li>
          </ul>
        </div>
        <div className="booked-tour-details__item tourists">
          <span className="booked-tour-details__item__label">
            ▶ Danh sách hành khách ({bookedTour.totalPersons} hành khách):
          </span>
          {renderTouristList(bookedTour.touristList)}
        </div>
        <div className="booked-tour-details__item note">
          <span className="booked-tour-details__item__label">▶ Lời nhắn:</span>
          <span className="booked-tour-details__item__content">
            {bookedTour.note || "trống"}
          </span>
        </div>
        <div className="booked-tour-details__buttons">
          {isShowCancelTourButton && (
            <button className="profile-btn cancel">Hủy đặt Tour</button>
          )}
          {isShowReviewButton && (
            <button className="profile-btn review">Đánh giá</button>
          )}
          {isShowDetails ? (
            <button
              className="profile-btn reset"
              onClick={handleCancelShowDetail}
            >
              Ẩn
            </button>
          ) : (
            <button className="profile-btn submit" onClick={handleShowDetail}>
              Xem chi tiết
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookedTourDetails;
