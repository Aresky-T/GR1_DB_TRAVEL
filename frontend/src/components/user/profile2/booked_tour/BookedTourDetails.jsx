import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { paymentBookedTourWithVNPayApi } from "../../../../api/payment";
import { AxiosError } from "axios";
import { warningAlert } from "../../../../config/sweetAlertConfig";
import { useAuth } from "../../../../redux/selector";
import { OPTIONS } from ".";
import { getReviewByTourAndAccount } from "../../../../api/review";
import { IoCheckmarkDone } from "react-icons/io5";
import { PiSealWarningFill } from "react-icons/pi";

const BookedTourDetails = ({ bookedTour, showModal }) => {
  const [isShowDetails, setIsShowDetails] = useState(false);
  const [isReviewed, setIsReviewed] = useState(false);
  const handleShowDetail = () => setIsShowDetails(true);
  const handleCancelShowDetail = () => setIsShowDetails(false);
  const auth = useAuth();

  const isShowReviewButton =
    bookedTour.tourStatus === "FINISHED" && bookedTour.status === "PAY_UP";
  const isShowCancelTourButton =
    bookedTour.tourStatus === "NOT_STARTED" && bookedTour.status === "NOT_PAY";
  const isShowPaymentButton =
    bookedTour.tourStatus === "NOT_STARTED" && bookedTour.status === "NOT_PAY";

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

  const renderFormOfPayment = (formOfPayment) => {
    switch (formOfPayment) {
      case "BANK_TRANSFER":
        return "Chuyển khoản";
      case "CASH_PAYMENT":
        return "Thanh toán tiền mặt";
      case "VNPAY_ON_WEBSITE":
        return "Thanh toán VNPAY khi đặt tour";
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

  const handlePayment = () => {
    const { id } = bookedTour;
    const { accessToken } = auth;
    id &&
      paymentBookedTourWithVNPayApi(id, accessToken)
        .then((res) => {
          const vnpayResponseUrl = res.data;
          window.open(vnpayResponseUrl, "_blank");
        })
        .catch((err) => {
          console.log(err);
          if (err instanceof AxiosError) {
            const response = err.response;
            const data = response.data;
            const message = data?.message ?? "Lỗi thanh toán";
            warningAlert("Cảnh báo", message, {
              cancelButtonText: "Thoát",
            });
          }
        });
  };

  useEffect(() => {
    function checkReviewedTour(tourId, accessToken) {
      getReviewByTourAndAccount(tourId, accessToken)
        .then((res) => {
          const data = res.data;
          setIsReviewed(data != null ? true : false);
        })
        .catch((err) => {});
    }

    const accessToken = auth.accessToken;
    if (accessToken && bookedTour) {
      const tourId = bookedTour.tourId;
      checkReviewedTour(tourId, accessToken);
    }
  }, [auth, bookedTour]);

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
        {bookedTour.status === "PAY_UP" && (
          <div className="booked-tour-details__item payment-status">
            <span className="booked-tour-details__item__label">
              ▶ Hình thức thanh toán:
            </span>
            <span className="booked-tour-details__item__content">
              {renderFormOfPayment(bookedTour.formOfPayment)}
            </span>
          </div>
        )}
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
            <button
              className="profile-btn cancel"
              onClick={() => {
                showModal(bookedTour, OPTIONS.CANCEL_BOOKED_TOUR);
              }}
            >
              Hủy đặt Tour
            </button>
          )}
          {isShowReviewButton && (
            <>
              <div className="review-status">
                {isReviewed ? (
                  <span className="reviewed">
                    Đã đánh giá <IoCheckmarkDone size={16} />
                  </span>
                ) : (
                  <span className="non-review">
                    Chưa đánh giá
                    <PiSealWarningFill size={16} />
                  </span>
                )}
              </div>
              <button
                className="profile-btn review"
                onClick={() => {
                  showModal(bookedTour, OPTIONS.REVIEW_BOOKED_TOUR);
                }}
              >
                Đánh giá
              </button>
            </>
          )}
          {isShowDetails ? (
            <button
              className="profile-btn normal"
              onClick={handleCancelShowDetail}
            >
              Ẩn
            </button>
          ) : (
            <button className="profile-btn normal" onClick={handleShowDetail}>
              Xem chi tiết
            </button>
          )}
          {isShowPaymentButton && (
            <button className="profile-btn submit" onClick={handlePayment}>
              Thanh toán
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookedTourDetails;
