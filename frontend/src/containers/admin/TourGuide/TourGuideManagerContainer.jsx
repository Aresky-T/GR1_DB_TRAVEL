import React, {useEffect, useState} from 'react'
import TourGuideManager from '../../../components/admin/TourGuide/TourGuideManager'
import {getAllTourGuidesApi} from '../../../api/admin/tour_guide.api';
import {useSelector} from 'react-redux';
import {authSelector} from '../../../redux/selector';

const TourGuideManagerContainer = () => {
    const [data, setData] = useState([]);
    const account = useSelector(authSelector);
    const [paginate, setPaginate] = useState({
        size: 10,
        pageNumber: 1
    })

    const handleChangeCurrentPage = (page) => {
        setPaginate(page);
    }

    useEffect(() => {
        account.accessToken && getAllTourGuidesApi(account.accessToken, paginate)
            .then(res => {
                setData(res.data);
            })
            .catch(err => {
                console.log(err.response)
            })
    }, [account, paginate])

    return (
        <TourGuideManager
            data={data}
            handleChangeCurrentPage={handleChangeCurrentPage}
            paginate={paginate}
        />
    )
}

export default TourGuideManagerContainer