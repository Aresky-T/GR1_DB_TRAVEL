import TourDetails from "../../components/global/TourDetails";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getTourByIdApi} from "../../api/global/tours.api";

const TourDetailsContainer = () => {
    const [tour, setTour] = useState({});
    const param = useParams();

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
        <TourDetails tour={tour}/>
    )
}

export default TourDetailsContainer