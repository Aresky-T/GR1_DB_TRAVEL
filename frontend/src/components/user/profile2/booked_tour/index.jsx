import React, { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../../../redux/selector";
import { getAllBookedToursApi } from "../../../../api/user/booking.api";
import LoadingIndicator from "../../../global/Loading/LoadingIndicator";
import BookedTourDetails from "./BookedTourDetails";
import CancelBookedTourRequest from "./cancel";
import ReviewBookedTour from "./review";

// const initBookedTourList = [
//   {
//     id: 7,
//     fullName: "Customer 1105",
//     email: "customer1105@gmail.com",
//     phone: "0123456789",
//     address: "Da Nang",
//     totalPersons: 1,
//     adultNumber: 1,
//     childrenNumber: 0,
//     babyNumber: 0,
//     note: "",
//     totalPrice: 8990000,
//     tourId: 7,
//     tourTitle:
//       "Hà Nội - Vịnh Hạ Long - Chùa Bái Đính - Tràng An - Tuyệt Tịnh Cốc (Khách sạn 4 sao)",
//     tourImage1:
//       "https://res.cloudinary.com/dtm4bscge/image/upload/v1686762264/fr91ttf9bzlmukueel3b.jpg",
//     tourTourCode: "P8OE1G0LA2-BKTRAVEL-1686762270314",
//     status: "PAY_UP",
//     bookTime: "2023-11-30 21:25:12.0",
//     touristList: [
//       {
//         fullName: "customer 1105",
//         birthDate: "1990-11-05 00:00:00.0",
//         gender: "MALE",
//       },
//     ],
//   },
//   {
//     id: 5,
//     fullName: "Nguyen Van A",
//     email: "tn6354103@gmail.com",
//     phone: "0966477078",
//     address: "Ha Noi",
//     totalPersons: 1,
//     adultNumber: 1,
//     childrenNumber: 0,
//     babyNumber: 0,
//     note: "",
//     totalPrice: 7590000,
//     tourId: 9,
//     tourTitle:
//       "Phú Quốc - Đảo Ngọc thiên đường - Bãi Sao - Thử Tài Câu Cá - Bay Vietjet air - Khách sạn 4 sao",
//     tourImage1:
//       "https://res.cloudinary.com/dtm4bscge/image/upload/v1686763043/fsk8avnkg823fcemcrjt.jpg",
//     tourTourCode: "XSRKUO2MIQ-BKTRAVEL-1686763048985",
//     status: "NOT_PAY",
//     bookTime: "2023-06-28 22:07:25.0",
//     touristList: [
//       {
//         fullName: "Nguyen Van An",
//         birthDate: "2000-01-01 00:00:00.0",
//         gender: "MALE",
//       },
//     ],
//   },
//   {
//     id: 6,
//     fullName: "customer 1105",
//     email: "customer1105@gmail.com",
//     phone: "0123456789",
//     address: "Da Nang",
//     totalPersons: 3,
//     adultNumber: 1,
//     childrenNumber: 1,
//     babyNumber: 1,
//     note: "khong co gi",
//     totalPrice: 5385000,
//     tourId: 11,
//     tourTitle: "Miền Tây: Tiền Giang - Cần Thơ - Bạc Liêu - Nhà Thờ Tắc Sậy",
//     tourImage1:
//       "https://res.cloudinary.com/dtm4bscge/image/upload/v1686764187/fgeghjdzzzr7mbhrwk4s.jpg",
//     tourTourCode: "DEHYS6Y6BE-BKTRAVEL-1686764193409",
//     status: "NOT_PAY",
//     bookTime: "2023-11-30 21:20:31.0",
//     touristList: [
//       {
//         fullName: "Nguyen anh tuan",
//         birthDate: "2000-05-11 00:00:00.0",
//         gender: "MALE",
//       },
//       {
//         fullName: "Nguyen Van Anh",
//         birthDate: "2018-02-01 00:00:00.0",
//         gender: "MALE",
//       },
//       {
//         fullName: "Baby 1",
//         birthDate: "2023-10-10 00:00:00.0",
//         gender: "FEMALE",
//       },
//     ],
//   },
//   {
//     id: 4,
//     fullName: "Nguyen Van A",
//     email: "vana2k@gmail.com",
//     phone: "0941556225",
//     address: "Hai Duong",
//     totalPersons: 3,
//     adultNumber: 3,
//     childrenNumber: 0,
//     babyNumber: 0,
//     note: "",
//     totalPrice: 1797000,
//     tourId: 12,
//     tourTitle: "Miền Tây - Mỹ Tho - Thới Sơn - Bến Tre",
//     tourImage1:
//       "https://res.cloudinary.com/dtm4bscge/image/upload/v1686764470/x2d32mkuy1sqejalq4gu.jpg",
//     tourTourCode: "GZJIG48ORF-BKTRAVEL-1686764475890",
//     status: "REJECTED",
//     bookTime: "2023-06-24 16:27:54.0",
//     touristList: [
//       {
//         fullName: "Nguyen Van A",
//         birthDate: "2000-01-01 00:00:00.0",
//         gender: "MALE",
//       },
//       {
//         fullName: "Nguyen Van B",
//         birthDate: "1999-02-01 00:00:00.0",
//         gender: "MALE",
//       },
//       {
//         fullName: "Nguyen Van C",
//         birthDate: "1998-02-01 00:00:00.0",
//         gender: "MALE",
//       },
//     ],
//   },
// ];

export const OPTIONS = {
  REVIEW_BOOKED_TOUR: "review-booked-tour",
  CANCEL_BOOKED_TOUR: "cancel-booked-tour",
};

const BookedTourInfo = () => {
  const [bookedTours, setBookedTours] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [type, setType] = useState("");
  const [selectedBookedTour, setSelectedBookedTour] = useState();
  const { accessToken } = useAuth();

  const startLoading = () => {
    setIsLoading(true);
  };

  const endLoading = () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const showModal = (bookedTour, type) => {
    setType(type);
    setSelectedBookedTour(bookedTour);
    setIsShowModal(true);
  };

  const hiddenModal = () => {
    setType("");
    setSelectedBookedTour(null);
    setIsShowModal(false);
  };

  const renderBookedTourList = useCallback(() => {
    if (bookedTours.length === 0) {
      return <>Danh sách trống!</>;
    }

    return bookedTours.map((item) => (
      <BookedTourDetails
        bookedTour={item}
        showModal={showModal}
        key={item.id}
      />
    ));

    // eslint-disable-next-line
  }, [bookedTours]);

  useEffect(() => {
    function fetchData(accessToken) {
      startLoading();
      getAllBookedToursApi(accessToken)
        .then((res) => {
          endLoading();
          const bookedTours = [...res.data].sort((a, b) => {
            const bookTime1 = new Date(a.bookTime);
            const bookTime2 = new Date(b.bookTime);
            return bookTime2.getTime() - bookTime1.getTime();
          });
          setBookedTours(bookedTours);
        })
        .catch((err) => {
          endLoading();
        });
    }

    if (accessToken) {
      fetchData(accessToken);
    }
    //eslint-disable-next-line
  }, [accessToken]);

  return (
    <div className="profile__booked-tour-info">
      <div className="profile__booked-tour-info__item">
        <div className="profile-container__main__title-1">
          Danh sách Tour đã đặt
        </div>
      </div>
      <div className="profile__booked-tour-info__item">
        <div className="booked-tour-list">
          {isLoading ? (
            <LoadingIndicator />
          ) : (
            <>
              {bookedTours.length > 0 && (
                <div className="profile__note">
                  Bạn đã đặt {bookedTours.length} tour:
                </div>
              )}
              {renderBookedTourList()}
            </>
          )}
        </div>
      </div>
      <CancelBookedTourRequest
        type={type}
        isShow={isShowModal}
        hiddenModal={hiddenModal}
        bookedTour={selectedBookedTour}
      />
      <ReviewBookedTour
        type={type}
        bookedTour={selectedBookedTour}
        isShow={isShowModal}
        hiddenModal={hiddenModal}
      />
    </div>
  );
};

export default BookedTourInfo;
