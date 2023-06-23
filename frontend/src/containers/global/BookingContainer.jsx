import React, {useEffect, useState} from 'react'
import Booking from '../../components/global/Booking'
import {getTourByTourCodeApi} from '../../api/admin/tour.api';
import {useNavigate, useParams} from 'react-router-dom';
import {useFormik} from 'formik';
import * as yup from 'yup';
import {CUSTOM_REGEX} from '../../constant/regex';
import {useDispatch, useSelector} from 'react-redux';
import {authSelector} from '../../redux/selector';
import {ROUTE} from '../../constant/route';
import {errorAlert, successAlert, warningAlertNoCancel, warningAlertWithCancel} from '../../config/sweetAlertConfig';
import {bookTourForUserApi, getBookedTourForUserApi} from '../../api/user/book_tour.api';
import {offLoading} from '../../redux/slices/loading.slice';
import {customToast} from "../../toaster";

const initTourist = {
    fullName: '',
    birthDate: '',
    gender: '',
}

const validationTourist = yup.object().shape({
    fullName: yup.string().required("Required fullName").matches(CUSTOM_REGEX.REGEX_STRING, "Invalid fullName"),
    birthDate: yup.date().required("Required birthDate"),
    gender: yup.string().required('Required gender').matches(CUSTOM_REGEX.REGEX_STRING, "Invalid gender")
})

const validationBooking = yup.object().shape({
    fullName: yup.string().required("Required fullName").matches(CUSTOM_REGEX.REGEX_STRING, 'Invalid fullName!'),
    email: yup.string().required('Required email').matches(CUSTOM_REGEX.EMAIL, "Invalid email!"),
    phone: yup.string().required("Required phone").matches(CUSTOM_REGEX.PHONE, "Invalid phone!"),
    address: yup.string().required("Required address").matches(CUSTOM_REGEX.REGEX_STRING, "Invalid address!"),
    adultNumber: yup.number().required("Required adultNumber").min(1, "Adult number must be greater than 1!"),
    childrenNumber: yup.number().required("Required childrenNumber").min(0, "Children number must be greater than 0!"),
    babyNumber: yup.number().required("Required babyNumber").min(0, "Baby number must be greater than 0!"),
    note: yup.string(),
    tourId: yup.number(),
    touristList: yup.array().of(validationTourist)
        .test("Tourist-list-length", 'Tourist List length must be equal to the sum of adultNumber, childrenNumber and babyNumber',
            function (value) {
                const {adultNumber, childrenNumber, babyNumber} = this.parent;
                return value.length === adultNumber + childrenNumber + babyNumber
            }).required("Tourist List must be a array!"),
    adults: yup.array().of(yup.mixed())
        .test('adults-length', 'Adults length must be equal to adultNumber!', function (value) {
            const {adultNumber} = this.parent;
            return value.length === adultNumber;
        }).required("Adults must be a array!"),
    children: yup.array().of(yup.mixed())
        .test('children-length', 'Children length must be equal to childrenNumber!', function (value) {
            const {childrenNumber} = this.parent;
            return value.length === childrenNumber;
        }).required("Children must be a array!"),
    babies: yup.array().of(yup.mixed())
        .test('babies-length', 'Babies length must be equal to babyNumber!', function (value) {
            const {babyNumber} = this.parent;
            return value.length === babyNumber;
        }).required("Babies must be a array!"),
})

// const validateArray = async (array) => {
//     const objectSchema = validationTourist;
//     const arraySchema = yup.array().of(objectSchema);
//     return await arraySchema.validate(array, { abortEarly: true })
// }

const BookingContainer = () => {
    const [tour, setTour] = useState();
    const param = useParams();
    const account = useSelector(authSelector)
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
            babies: [],
            tourId: 0
        },
        onSubmit: values => {
            values.touristList = [...values.adults, ...values.children, ...values.babies]
            console.log(account)
            if (account.accessToken && account.role) {
                validationBooking.validate(values)
                    .then((data) => {
                        console.log(data)
                        const {
                            fullName, email, phone, address,
                            adultNumber, childrenNumber, babyNumber, note,
                            touristList, tourId
                        } = data;
                        bookTourForUserApi({
                            fullName, email, phone, address,
                            adultNumber, childrenNumber, babyNumber, note,
                            touristList, tourId
                        }, account.accessToken, dispatch)
                            .then(res => {
                                dispatch(offLoading());
                                console.log(res.data)
                                successAlert("Chúc mừng", "Đặt tour thành công, cảm ơn quý khách đã lựa chọn dịch vụ của BK Travel!",
                                    "Trang chủ")
                                    .then(res => {
                                        if (res.isConfirmed) {
                                            navigate(ROUTE.HOME);
                                        }
                                    })
                            })
                            .catch(err => {
                                dispatch(offLoading());
                                errorAlert("Thất bại", "Đặt tour không thành công, vui lòng kiểm tra lại!")
                                console.log(err);
                            })
                    })
                    .catch(err => {
                        console.log(err);
                        warningAlertNoCancel("Cảnh báo", "Hãy nhập đầy đủ thông tin người đại diện và khách hàng", "OK");
                    })
            } else {
                warningAlertWithCancel("Cảnh báo đăng nhập", "Quý khách vui lòng đăng nhập trước khi đặt tour", "Đăng nhập", "Để sau")
                    .then((res) => {
                        if (res.isConfirmed) {
                            navigate(ROUTE.LOGIN)
                        }
                    })
            }
        }
    });

    const handleChangeTouristNumber = (name, action) => {

        const totalSeats = bookingFormik.values.adultNumber + bookingFormik.values.childrenNumber + bookingFormik.values.babyNumber;

        switch (action) {
            case "increase":
                if (totalSeats >= tour.availableSeats) {
                    customToast("Đã vượt quá số chỗ trống", "⚠️")
                    return;
                }
                bookingFormik.setValues({
                    ...bookingFormik.values,
                    [name]: bookingFormik.values[name] + 1
                })
                break;
            case "decrease":
                if (bookingFormik.values[name] < 1) {
                    customToast("Số hành khách không thể nhỏ hơn 0", "⚠️")
                    return;
                }

                if (totalSeats <= 1) {
                    customToast("Phải có ít nhất 1 hành khách", "⚠️")
                    return;
                }

                if (name === "adultNumber" && bookingFormik.values.adultNumber <= 1) {
                    customToast("Phải có ít nhất 1 hành khách là người lớn", "⚠️")
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
        const children = [...bookingFormik.values.children];
        const babies = [...bookingFormik.values.babies];


        if (typeof (adultNumber) === "number" && adultNumber > 0) {
            for (let i = 1; i <= adultNumber; i++) {
                if (bookingFormik.values.adults.length < i) {
                    adults.push({...initTourist})
                }

                if (bookingFormik.values.adults.length > adultNumber) {
                    adults.splice(adultNumber)
                }
            }
        }

        if (typeof (childrenNumber) === "number" && childrenNumber >= 0) {
            for (let i = 0; i <= childrenNumber; i++) {
                if (bookingFormik.values.children.length < i) {
                    children.push({...initTourist})
                }

                if (bookingFormik.values.children.length > childrenNumber) {
                    children.splice(childrenNumber)
                }
            }
        }

        if (typeof (babyNumber) === "number" && babyNumber >= 0) {
            for (let i = 0; i <= babyNumber; i++) {
                if (bookingFormik.values.babies.length < i) {
                    babies.push({...initTourist})
                }

                if (bookingFormik.values.babies.length > babyNumber) {
                    babies.splice(babyNumber)
                }
            }
        }

        bookingFormik.setValues({
            ...bookingFormik.values,
            adults: adults,
            children: children,
            babies: babies,
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

    useEffect(() => {
        if (tour && tour.id) {
            bookingFormik.setFieldValue('tourId', tour.id);
        }
        //eslint-disable-next-line
    }, [tour])

    useEffect(() => {
        if (tour && tour.id && account.accessToken) {
            getBookedTourForUserApi(tour.id, account.accessToken)
                .then(res => {
                    console.log(res)
                    warningAlertNoCancel("Cảnh bảo", "Quý khách đã đặt tour này rồi, không thể đặt lại", "Trang chủ")
                        .then(res => {
                            if (res.isConfirmed) {
                                navigate(ROUTE.HOME);
                            }
                        })
                })
                .catch(err => {
                })
        }
        //eslint-disable-next-line
    }, [tour, account])

    return (
        <Booking
            tour={tour}
            bookingFormik={bookingFormik}
            handleChangeTouristNumber={handleChangeTouristNumber}
        />
    )
}

export default BookingContainer