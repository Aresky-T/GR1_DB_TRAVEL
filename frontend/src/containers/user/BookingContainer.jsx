import React, { useEffect, useState } from 'react'
import Booking from '../../components/user/Booking'
import { getTourByTourCodeApi } from '../../api/admin/tour.api';
import { useParams } from 'react-router-dom';
import { useFormik } from 'formik';

const initTourist = {
    fullName: '',
    birthDate: '',
    gender: '',
}

const BookingContainer = () => {
    const [tour, setTour] = useState();
    const param = useParams();

    const bookingFormik = useFormik({
        initialValues: {
            fullName: '',
            email: '',
            phone: '',
            address: '',
            adultNumber: 1,
            childrenNumber: 0,
            babyNumber: 0,
            note: '',
            touristList: [],
            adults: [],
            children: [],
            babies: []
        },
        onSubmit: values => {
            console.log(values)
        }
    });

    const handleChangeTouristNumber = (name, action) => {

        const totalSeats = bookingFormik.values.adultNumber + bookingFormik.values.childrenNumber + bookingFormik.values.babyNumber;

        switch (action) {
            case "increase":
                if (totalSeats >= tour.availableSeats) {
                    alert("Đã vượt quá số chỗ trống")
                    return;
                }
                bookingFormik.setValues({
                    ...bookingFormik.values,
                    [name]: bookingFormik.values[name] + 1
                })
                break;
            case "decrease":
                if (bookingFormik.values[name] < 1) {
                    alert("Số hành khách không thể nhỏ hơn 0");
                    return;
                }

                if (totalSeats <= 1) {
                    alert("Phải có ít nhất 1 hành khách");
                    return;
                }

                if (name === "adultNumber" && bookingFormik.values.adultNumber <= 1) {
                    alert("Phải có ít nhất 1 hành khách là người lớn")
                    return;
                }

                bookingFormik.setValues({
                    ...bookingFormik.values,
                    [name]: bookingFormik.values[name] - 1
                })
                break;
            default:
        }
    }

    useEffect(() => {
        const adultNumber = bookingFormik.values.adultNumber;
        const childrenNumber = bookingFormik.values.childrenNumber;
        const babyNumber = bookingFormik.values.babyNumber;
        const adults = [...bookingFormik.values.adults];
        const children = [];
        const babies = [];


        if (typeof (adultNumber) === "number" && adultNumber > 0) {
            for (let i = 1; i <= adultNumber; i++) {
                if (bookingFormik.values.adults.length < i) {
                    adults.push({ ...initTourist })
                }

                if(bookingFormik.values.adults > i){
                    adults.splice(bookingFormik.values.adults.length)
                }
            }
        }

        if (typeof (childrenNumber) === "number" && childrenNumber > 0) {
            for (let i = 0; i < childrenNumber; i++) {
                children.push({ ...initTourist })
            }
        }

        if (typeof (babyNumber) === "number" && babyNumber > 0) {
            for (let i = 0; i < babyNumber; i++) {
                babies.push({ ...initTourist })
            }
        }

        bookingFormik.setValues({
            ...bookingFormik.values,
            adults: adults,
            children: children,
            babies: babies,
            touristList: [...adults, ...children, ...babies],
        })
        //eslint-disable-next-line
    }, [bookingFormik.values.adultNumber, bookingFormik.values.childrenNumber, bookingFormik.values.babyNumber])

    useEffect(() => {
        const tourCode = param.tourCode;
        getTourByTourCodeApi(tourCode)
            .then(res => {
                setTour(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [param])

    return (
        <Booking
            tour={tour}
            bookingFormik={bookingFormik}
            handleChangeTouristNumber={handleChangeTouristNumber}
        />
    )
}

export default BookingContainer