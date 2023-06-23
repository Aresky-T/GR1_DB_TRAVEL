import React from 'react'
import TourInfo from '../booking/TourInfo'
import CustomerInfo from '../booking/CustomerInfo'

const Booking = ({tour, bookingFormik, handleChangeTouristNumber}) => {

    return (
        <div className='main-session booking-container'>
            <header className="booking-container__header">
                <h2>Đặt Tour</h2>
            </header>
            <section className="customer-info">
                <CustomerInfo bookingFormik={bookingFormik} handleChangeTouristNumber={handleChangeTouristNumber}/>
            </section>
            <section className="tour-info">
                <TourInfo bookingFormik={bookingFormik} tour={tour}/>
            </section>
        </div>
    )
}

export default Booking