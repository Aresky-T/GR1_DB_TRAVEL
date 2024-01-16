import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import vnpayLogo from "../../assets/image/vnpay_logo.png";
import { useAuth, useBooking } from "../../redux/selector";
import { useDispatch } from "react-redux";
import { removeBookingInfo } from "../../redux/slices/booking.slice";
import { differenceInYears } from "date-fns";
import { useFormik } from "formik";
import {
  bookTourAndPaymentWithVNPayApi,
  bookTourForUserApi,
} from "../../api/user/booking.api";
import { offLoading } from "../../redux/slices/loading.slice";
import {
  successAlert,
  warningAlert,
} from "../../config/sweetAlertConfig";
import { ROUTE } from "../../constant/route";
import { AxiosError } from "axios";

const CheckoutContainer = () => {
  const navigate = useNavigate();
  const { accessToken } = useAuth();
  const { bookingInfo } = useBooking();
  const tour = bookingInfo.selectedTour;
  const representative = bookingInfo.representative;
  const touristList = bookingInfo.touristList;
  const note = bookingInfo.note;
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      totalPrice: 0,
      adultNumber: 0,
      childrenNumber: 0,
      babyNumber: 0,
      touristList: [],
    },
  });

  const onReturnToBookingPage = () => {
    navigate(`/booking/${tour.tourCode}`);
  };

  const handleCancelBooking = () => {
    dispatch(removeBookingInfo());
  };

  function calculateAgeOfTourist(tourist) {
    const birthDate = new Date(tourist.birthDate);
    const currentDate = new Date();
    const age = differenceInYears(currentDate, birthDate);
    return age;
  }

  const manageBookingAndCalculatePrice = useCallback(() => {
    let totalPrice = 0;
    let adultNumber = 0;
    let childrenNumber = 0;
    let babyNumber = 0;

    const adultPrice = tour?.price1;
    const childPrice = tour?.price2;
    const babyPrice = tour?.price3;

    const newList = touristList.map((tourist) => {
      const age = calculateAgeOfTourist(tourist);
      if (age >= 12) {
        totalPrice += adultPrice;
        adultNumber++;
        return { ...tourist, type: "Người lớn", age };
      }

      if (age >= 2 && age <= 11) {
        totalPrice += childPrice;
        childrenNumber++;
        return { ...tourist, type: "Trẻ em", age };
      }

      totalPrice += babyPrice;
      babyNumber++;
      return { ...tourist, type: "Em bé", age };
    });

    formik.setValues({
      totalPrice,
      adultNumber,
      childrenNumber,
      babyNumber,
      touristList: newList,
    });

    // eslint-disable-next-line
  }, [tour, touristList]);

  const renderPrice = (price) => {
    if (price === 0) {
      return <b>miễn phí</b>;
    }

    if (typeof price === "number") {
      return (
        <>
          <b>{price.toLocaleString("vi-VN")}</b> vnd - 1 hành khách
        </>
      );
    }
  };

  const renderGender = (gender) => {
    switch (gender) {
      case "MALE":
        return "Nam";
      case "FEMALE":
        return "Nữ";
      case "OTHER":
        return "Không xác định";
      default:
    }
  };

  const renderBirthDate = (birthDate) => {
    return birthDate.toLocaleString("vi-VN");
  };

  const handleSubmitBooking = (type) => {
    const { adultNumber, babyNumber, childrenNumber, totalPrice } =
      formik.values;
    const formData = {};
    const bookingMap = new Map();
    bookingMap.set("fullName", representative.fullName);
    bookingMap.set("email", representative.email);
    bookingMap.set("phone", representative.phone);
    bookingMap.set("address", representative.address);
    bookingMap.set("note", note);
    bookingMap.set("touristList", touristList);
    bookingMap.set("tourId", tour.id);
    bookingMap.set("adultNumber", adultNumber);
    bookingMap.set("babyNumber", babyNumber);
    bookingMap.set("childrenNumber", childrenNumber);
    bookingMap.set("totalPrice", totalPrice);

    bookingMap.entries();
    bookingMap.forEach((value, key) => {
      formData[key] = value;
    });

    switch (type) {
      case "VNPAY":
        bookTourAndPaymentWithVNPayApi(formData, accessToken)
          .then((res) => {
            const returnURL = res.data;
            window.open(
              returnURL,
              "_blank"
              // "width=1000,height=1000,scrollbars=yes"
            );
          })
          .catch((err) => {
            if (err instanceof AxiosError) {
              const message =
                err.response?.data?.message ??
                "Không thể đặt tour, vui lòng kiểm tra lại!";
              handlePaymentError(message);
            }
          });

        break;
      case "PAY_LATER":
        bookTourForUserApi(formData, accessToken, dispatch)
          .then((res) => {
            dispatch(offLoading());
            successAlert(
              "Chúc mừng",
              "Đặt tour thành công, cảm ơn quý khách đã lựa chọn dịch vụ của BK Travel!",
              "Trang chủ"
            ).then((res) => {
              if (res.isConfirmed) {
                dispatch(removeBookingInfo());
                navigate(ROUTE.HOME);
              }
            });
          })
          .catch((err) => {
            dispatch(offLoading());
            if (err instanceof AxiosError) {
              const message =
                err.response?.data?.message ??
                "Không thể đặt tour, vui lòng kiểm tra lại!";
              handlePaymentError(message);
            }
          });
        break;
      default:
        break;
    }
  };

  const handlePaymentError = (message) => {
    warningAlert("Cảnh báo", message, {
      confirmButtonText: "OK",
    }).then(result => {
      if(result.isConfirmed){
        dispatch(removeBookingInfo())
        navigate(ROUTE.HOME);
      }
    });
  }

  const renderTourists = useCallback(() => {
    return formik.values.touristList.map((tourist) => (
      <tr key={tourist.fullName}>
        <td>{tourist.id + 1}</td>
        <td>{tourist.fullName}</td>
        <td>{renderBirthDate(tourist.birthDate)}</td>
        <td>{tourist?.age ?? "Không xác định"}</td>
        <td>{renderGender(tourist.gender)}</td>
        <td>{tourist?.type ?? "Không xác định"}</td>
      </tr>
    ));
  }, [formik.values.touristList]);

  useEffect(() => {
    if (!tour) {
      navigate("/");
    }
  }, [tour, navigate]);

  useEffect(() => {
    manageBookingAndCalculatePrice();
  }, [manageBookingAndCalculatePrice]);

  return (
    <div className="checkout-container main-session">
      <div className="checkout-area">
        <div className="checkout-area__left">
          <div className="checkout-container__title-1">Thủ tục thanh toán</div>
          <div className="checkout-container__back-to-booking">
            <button onClick={onReturnToBookingPage}>Quay lại</button>
          </div>
          <div className="representative">
            <div className="checkout-container__title-2">▶ Người đại diện</div>
            <ol className="representative__info">
              <li>
                <span>Họ tên:</span>
                <span>{representative?.fullName || "Không xác định"}</span>
              </li>
              <li>
                <span>Địa chỉ:</span>
                <span>{representative?.address || "Không xác định"}</span>
              </li>
              <li>
                <span>Số điện thoại:</span>
                <span>{representative?.phone || "Không xác định"}</span>
              </li>
              <li>
                <span>Email:</span>
                <span>{representative?.email || "Không xác định"}</span>
              </li>
            </ol>
          </div>
          <div className="tourist-list">
            <div className="checkout-container__title-2">
              ▶ Danh sách hành khách
            </div>
            <table className="tourist-list__info">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Họ Tên</th>
                  <th>Ngày Sinh</th>
                  <th>Tuổi</th>
                  <th>Giới Tính</th>
                  <th>Loại</th>
                </tr>
              </thead>
              <tbody>{renderTourists()}</tbody>
              <tfoot>
                <tr>
                  <td colSpan={6}>
                    Tổng số hành khách: {touristList.length} (
                    <span>Người lớn: {formik.values.adultNumber}</span>
                    <span>, Trẻ em: {formik.values.childrenNumber}</span>
                    <span>, Em bé: {formik.values.babyNumber}</span>)
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div className="note">
            <p className="note__item">(*) Lưu ý</p>
            <p className="note__item">
              Quý khách vui lòng kiểm tra lại toàn bộ thông tin bên trên trước
              khi thực hiện thanh toán. Nếu có thông tin sai sót, vui lòng bấm "
              <strong>quay lại</strong>" để cập nhật thông tin!
            </p>
          </div>
          <div className="total-price">
            <div className="total-price__title">Tổng chi phí:</div>
            <div className="total-price__number">
              {Number(formik.values.totalPrice).toLocaleString("vi-VN")} VND
            </div>
          </div>
        </div>
        <div className="checkout-area__right">
          <div className="selected-tour">
            <div className="selected-tour__item title">
              <div className="selected-tour__image">
                <img src={tour?.image1} alt="" />
              </div>
              <div className="selected-tour__title">
                <span>{tour?.title || "Không xác định"}</span>
              </div>
            </div>
            <div className="selected-tour__item">
              <span>▶ Mã Tour:</span>
              <span>{tour?.tourCode || "Không xác định"}</span>
            </div>
            <div className="selected-tour__item">
              <span>▶ Thời gian khởi hành:</span>
              <span>
                {new Date(tour?.startTime).toLocaleString("vi-VN", {
                  dateStyle: "short",
                  timeStyle: "short",
                })}
              </span>
            </div>
            <div className="selected-tour__item">
              <span>▶ Địa điểm xuất phát:</span>
              <span>{tour?.startAddress || "Không xác định"}</span>
            </div>
            <div className="selected-tour__item">
              <span>▶ Tổng thời gian:</span>
              <span>{tour?.time || "Không xác định"}</span>
            </div>
            <div className="selected-tour__item prices">
              <div>▶ Chi phí:</div>
              <ul>
                <li>
                  <span>Người lớn:</span>
                  <span>{renderPrice(tour?.price1)}</span>
                </li>
                <li>
                  <span>Trẻ em:</span>
                  <span>{renderPrice(tour?.price2)}</span>
                </li>
                <li>
                  <span>Em bé:</span>
                  <span>{renderPrice(tour?.price3)}</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="buttons-area">
            <div className="buttons-area--submit">
              <button
                className="vnpay"
                onClick={() => {
                  handleSubmitBooking("VNPAY");
                }}
              >
                <img src={vnpayLogo} alt="" />
              </button>
              <button
                className="cash-payment"
                onClick={() => {
                  handleSubmitBooking("PAY_LATER");
                }}
              >
                Thanh toán sau
              </button>
            </div>
            <div className="buttons-area--cancel">
              <button onClick={handleCancelBooking}>Hủy bỏ đặt tour</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutContainer;
