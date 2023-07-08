import React from 'react'
import BookingContainer from '../../containers/global/Booking/BookingContainer'
import { Helmet } from 'react-helmet-async'

const BookingPage = () => {
    return (
        <>
            <Helmet>
                <meta charSet='utf-8' />
                <title>BK Travel - Đặt Tour</title>
                <meta name="booking-page" content="BK travel application" />
            </Helmet>
            <BookingContainer />
        </>
    )
}

export default BookingPage