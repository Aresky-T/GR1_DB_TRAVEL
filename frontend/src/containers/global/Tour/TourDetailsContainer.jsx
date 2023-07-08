import TourDetails from "../../../components/global/Tour/TourDetails";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTourByIdApi } from "../../../api/global/tours.api";
import { ROUTE } from "../../../constant/route";

const TourDetailsContainer = () => {
    const [tour, setTour] = useState({});
    const param = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (tour.status && tour.status !== "NOT_STARTED") {
            navigate(ROUTE.HOME);
        }
    }, [tour, navigate])

    useEffect(() => {
        getTourByIdApi(param.id)
            .then(res => {
                setTour(res.data);
            })
            .catch(err => {
                console.log(err)
            })
    }, [param])
    
    return (
        <TourDetails tour={tour} />
    )
}

export default TourDetailsContainer