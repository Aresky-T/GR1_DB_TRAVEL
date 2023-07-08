import React, { useEffect, useState } from 'react'
import TourDetailsAdmin from '../../../components/admin/Tour/TourDetailsAdmin'
import { useNavigate, useParams } from 'react-router-dom';
import { getTourByIdApi } from '../../../api/global/tours.api';
import { useFormik } from 'formik';
import { validateTour } from '../../../validation';
import { deleteTourByIdApi, updateTourWithPatchMethodApi } from '../../../api/admin/tour.api';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from '../../../redux/selector';
import { errorAlert, questionAlert, successAlert, warningAlertNoCancel } from '../../../config/sweetAlertConfig';
import { ROUTE } from '../../../constant/route';
import { getAllAvailableTourGuides } from '../../../api/admin/tour_guide.api';
import { offLoading, onLoading } from '../../../redux/slices/loading.slice';

const TourDetailsAdminContainer = () => {
    // const [tour, setTour] = useState();
    const param = useParams();
    const [data, setData] = useState();
    const [fieldsChange, setFieldsChange] = useState({});
    const [tourGuides, setTourGuides] = useState([]);
    const [message, setMessage] = useState('');

    const account = useSelector(authSelector);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const tour = useFormik({
        initialValues: {
            id: param.id,
            title: '',
            startTime: '',
            time: '',
            startAddress: '',
            destinationList: '',
            availableSeats: 0,
            totalSeats: 0,
            vehicle: '',
            scheduleDescription: '',
            image1: '',
            image2: '',
            image3: '',
            image4: '',
            price1: 0,
            price2: 0,
            price3: 0,
            tourCode: '',
            status: '',
            tourGuideId: 0,
            tourGuide: null
        },
        onSubmit: values => {
            validateTour.isValid(values)
                .then(result => {
                    if (result) {
                        dispatch(onLoading());
                        updateTourWithPatchMethodApi(values.id, fieldsChange, account.accessToken)
                            .then(res => {
                                dispatch(offLoading());
                                setMessage(message => message + 'a')
                                successAlert('Thành công', 'Cập nhật tour thành công', 'OK')
                            })
                            .catch(err => {
                                dispatch(offLoading());
                                errorAlert('Thất bại', 'Cập nhật tour thất bại, hãy kiểm tra lại');
                            })
                    } else {
                        warningAlertNoCancel('Cảnh báo', 'Tồn tại dữ liệu không hợp lệ hoặc bị thiếu, hãy nhập đầy đủ!', "OK");
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
    })
    console.log(tour.values)

    const handleDeleteTour = () => {
        const id = param.id;
        questionAlert("Yêu cầu xác nhận", "Tất cả dữ liệu về Tour du lịch này sẽ bị xóa đi, bạn có chắc chắn muốn xóa không?", "Tôi chắc chắn, Xóa!", "Hủy bỏ")
            .then(result => {
                if (result.isConfirmed) {
                    deleteTourByIdApi(id, account.accessToken)
                        .then(res => {
                            successAlert('Thành công', 'Đã xóa tour thành công', 'OK')
                                .then(result => {
                                    if (result.isConfirmed) {
                                        navigate(ROUTE.TOUR_MANAGER);
                                    }
                                })
                        })
                        .catch(err => {
                            errorAlert('Thất bại', 'Xóa Tour không thành công, vui lòng kiểm tra lại!')
                        })
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        const id = param.id;
        getTourByIdApi(id)
            .then(res => {
                const data = res.data;
                const obj = { ...tour.values };
                for (const key in data) {
                    if (Object.hasOwnProperty.call(tour.values, key)) {
                        obj[key] = data[key];
                    }
                }
                tour.setValues(obj);
                setData(data);
            })
            .catch(err => {
            })
        //eslint-disable-next-line
    }, [param, message])

    useEffect(() => {
        const fields = {};
        for (const key in data) {
            if (Object.hasOwnProperty.call(tour.values, key)) {
                if (data[key] !== tour.values[key]) {
                    fields[key] = tour.values[key];
                }
            }
        }

        setFieldsChange(fields);
        //eslint-disable-next-line
    }, [tour.values])

    useEffect(() => {
        account.accessToken && param.id && getAllAvailableTourGuides(account.accessToken)
            .then(res => {
                setTourGuides(res.data);
            })
            .catch(err => {
            })
    }, [account, param, message])

    return (
        <TourDetailsAdmin
            tour={tour}
            handleDeleteTour={handleDeleteTour}
            tourGuides={tourGuides}
        />
    )
}

export default TourDetailsAdminContainer