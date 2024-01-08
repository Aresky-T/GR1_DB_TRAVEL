import React, { useEffect } from 'react'
import BookedTourDetailsAdmin from '../../../components/admin/Booking/BookedTourDetailsAdmin'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { authSelector } from '../../../redux/selector';
import { changeStatusBookedTourApi, getDetailBookedTourByIdApi } from '../../../api/admin/booking.api';
import { useFormik } from 'formik';
import { errorAlert, successAlert } from '../../../config/sweetAlertConfig';

const BookedTourDetailsAdminContainer = () => {
    const param = useParams();
    const account = useSelector(authSelector);
    const bookedTour = useFormik({
        initialValues: {
            id: 0,
            fullName: '',
            email: '',
            address: '',
            phone: '',
            adultNumber: 0,
            childrenNumber: 0,
            babyNumber: 0,
            totalPersons: 0,
            note: '',
            status: '',
            formOfPayment: '',
            totalPrice: '',
            tourId: '',
            touristList: [],
        },
        onSubmit: values => {
            console.log(values)
        }
    })

    const handleChangeStatusBookedTour = () => {
        const {status, formOfPayment, id} = bookedTour.values;
        changeStatusBookedTourApi({
            bookedTourId: id,
            status,
            formOfPayment
        }, account.accessToken)
        .then(res => {
            successAlert("Thành công", "Đã cập nhật thành công!", "OK");
        })
        .catch(err => {
            const message = err.response.data.message;
            errorAlert("Thất bại", message, {
                cancelButtonText: "Kiểm tra lại"
            });
        })
    }

    useEffect(() => {
        const id = param.id;
        const token = account.accessToken;
        const obj = { ...bookedTour.values };
        if (id && token) {
            getDetailBookedTourByIdApi(token, id)
                .then(res => {
                    const data = res.data;
                    for (let key in data) {
                        if (Object.hasOwnProperty.call(bookedTour.values, key)) {
                            obj[key] = data[key];
                        }
                    }
                    bookedTour.setValues(obj);
                })
                .catch(err => {
                    console.log(err)
                })
        }
        //eslint-disable-next-line
    }, [param, account])

    return (
        <BookedTourDetailsAdmin 
            bookedTour={bookedTour}
            handleSubmit={handleChangeStatusBookedTour}
        />
    )
}

export default BookedTourDetailsAdminContainer