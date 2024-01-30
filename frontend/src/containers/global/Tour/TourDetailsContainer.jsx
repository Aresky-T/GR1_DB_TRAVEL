import TourDetails from "../../../components/global/Tour/TourDetails";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTourByIdApi } from "../../../api/global/tours.api";
import { getReviewForTourApi } from "../../../api/review";
import TourReviewsContainer from "./TourReviewsContainer";
import RollerLoading from "../../../components/global/Loading/RollerLoading";

const TourDetailsContainer = () => {
  const [tour, setTour] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [reviewState, setReviewState] = useState({
    isShowModal: false,
    isReviewed: false,
    review: {},
  });
  const param = useParams();
  const navigate = useNavigate();

  const showModal = () => {
    !reviewState.isShowModal &&
      setReviewState((prevState) => ({ ...prevState, isShowModal: true }));
  };

  const hiddenModal = () => {
    reviewState.isShowModal &&
      setReviewState((prevState) => ({ ...prevState, isShowModal: false }));
  };

  useEffect(() => {
    const tourId = param.id;
    if (tourId) {
      setIsLoading(true);
      getTourByIdApi(param.id)
        .then((res) => {
          setTimeout(() => {
            setIsLoading(false);
            setTour(res.data);
          }, 1000);
        })
        .catch((err) => {
          setIsLoading(false);
        });
    }
  }, [param]);

  useEffect(() => {
    function fetchReview(tour) {
      getReviewForTourApi(tour.id)
        .then((res) => {
          const data = res.data;
          if (data.message) {
            setReviewState((prevState) => ({
              ...prevState,
              isReviewed: false,
              review: {},
            }));
          } else {
            setReviewState((prevState) => ({
              ...prevState,
              isReviewed: true,
              review: data,
            }));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    if (tour) {
      fetchReview(tour);
    }
  }, [tour, navigate]);

  return (
    <div className="main-session tour-detail-container">
      {isLoading ? (
        <div className="tour-details-loading">
          <RollerLoading />
        </div>
      ) : (
        <>
          {tour ? (
            <>
              <TourDetails
                tour={tour}
                reviewState={reviewState}
                showReviewsModal={showModal}
              />
              <TourReviewsContainer
                tour={tour}
                reviewState={reviewState}
                hiddenModal={hiddenModal}
              />
            </>
          ) : (
            <>Không có dữ liệu!</>
          )}
        </>
      )}
    </div>
  );
};

export default TourDetailsContainer;
