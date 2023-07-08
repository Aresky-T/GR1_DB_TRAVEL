import React, { useEffect, useState } from 'react'
import BookingManager from '../../../components/admin/Booking/BookingManager'
import { useSelector } from 'react-redux';
import { authSelector } from '../../../redux/selector';
import { getAllBookedToursApi } from '../../../api/admin/booking.api';

const BookingManagerContainer = () => {
    const [data, setData] = useState([]);
    const [paginate, setPaginate] = useState({
        size: 10,
        pageNumber: 1,
        sort: 'id,asc'
    })

    const account = useSelector(authSelector);

    const handleChangeCurrentPage = (page) => {
        setPaginate({
            ...paginate, 
            pageNumber: page
        })
    }

    useEffect(() => {
        account.accessToken && getAllBookedToursApi(account.accessToken, paginate)
        .then(res => {
            setData(res.data);
        })
        .catch(err => {
        })
    }, [account, paginate])
    
    return (
        <BookingManager 
            data={data}
            handleChangeCurrentPage={handleChangeCurrentPage}
            paginate={paginate}
        />
    )
}

export default BookingManagerContainer