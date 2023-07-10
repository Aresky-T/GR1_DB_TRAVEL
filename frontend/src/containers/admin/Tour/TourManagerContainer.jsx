import { useEffect, useState } from "react";
import TourManager from "../../../components/admin/Tour/TourManager";
import { getAllToursForAdminApi } from "../../../api/admin/tour.api";
import { useSelector } from "react-redux";
import { authSelector } from "../../../redux/selector"

const TourManagerContainer = () => {

    const [tours, setTours] = useState([]);
    const [fields, setFields] = useState({
        pageNumber: 1,
        size: 5
    })
    const account = useSelector(authSelector)

    const handleChangeCurrentPage = (page) => {
        setFields({
            ...fields,
            pageNumber: page
        })
    }

    useEffect(() => {
        if (account.accessToken) {
            getAllToursForAdminApi(fields, account.accessToken)
                .then(res => {
                    const tours = res.data;
                    setTours(tours)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }, [fields, account])

    return (
        <TourManager
            fields={fields}
            data={tours}
            handleChangeCurrentPage={handleChangeCurrentPage}
        />
    )
}

export default TourManagerContainer;