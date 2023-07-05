import {useEffect, useState} from "react";
import TourManager from "../../../components/admin/Tour/TourManager";
import {getAllToursForAdminApi} from "../../../api/admin/tour.api";

const TourManagerContainer = () => {

    const [tours, setTours] = useState([]);
    const [fields, setFields] = useState({
        pageNumber: 1,
        size: 5
    })

    const handleChangeCurrentPage = (page) => {
        setFields({
            ...fields,
            pageNumber: page
        })
    }

    useEffect(() => {
        getAllToursForAdminApi(fields)
            .then(res => {
                const tours = res.data;
                setTours(tours)
            })
            .catch(err => {
                console.log(err)
            })
    }, [fields])

    return (
        <TourManager
            fields={fields}
            data={tours}
            handleChangeCurrentPage={handleChangeCurrentPage}
        />
    )
}

export default TourManagerContainer;