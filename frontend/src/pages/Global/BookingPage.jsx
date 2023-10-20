import React from 'react'
import BookingContainer from '../../containers/global/Booking/BookingContainer'
import HelmetTitle from "../../components/helmet/HelmetTitle";

const BookingPage = () => {
    return (
        <>
            <HelmetTitle
                title={"BK Travel - Đặt Tour"}
                metaName={"meta-booking"}
            />
            <BookingContainer />
        </>
    )
}

export default BookingPage