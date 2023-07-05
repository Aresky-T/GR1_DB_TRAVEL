import React, {useState} from 'react'
import TourCreate from '../../../components/admin/Tour/TourCreate'
import {uploadMultipartFileApi} from '../../../api/global/file.api';
import {createTourApi} from '../../../api/admin/tour.api';
import {offLoading, onLoading} from '../../../redux/slices/loading.slice';
import {useDispatch, useSelector} from 'react-redux';
import {authSelector} from '../../../redux/selector';
import {useFormik} from 'formik';
import {validateTour} from '../../../validation';
import {errorAlert, successAlert, warningAlertNoCancel} from '../../../config/sweetAlertConfig';
import {useNavigate} from 'react-router-dom';
import {ROUTE} from '../../../constant/route';

const TourCreateContainer = () => {

    const formik = useFormik({
        initialValues: {
            title: '',
            startTime: new Date(),
            time: '',
            startAddress: '',
            destinationList: '',
            totalSeats: 0,
            vehicle: '',
            scheduleDescription: '',
            price1: 0,
            price2: 0,
            price3: 0,
            tourGuide: 0,
        },
        onSubmit: values => {
            validateTour.validate(values, {abortEarly: true})
                .then(data => {
                    if (selectedFiles.length < 4) {
                        warningAlertNoCancel("Cảnh báo", "Bạn chưa chọn ảnh, hãy chọn đủ 4 file ảnh!", "OK");
                        return;
                    }
                    handleSubmit(data);
                })
                .catch(err => {
                    warningAlertNoCancel('Cảnh báo', 'Hãy điền đầy đủ thông tin', 'OK')
                })
        }
    })

    const [selectedFiles, setSelectedFiles] = useState([]);
    const account = useSelector(authSelector);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const setEmptySelectedFiles = () => {
        setSelectedFiles([]);
    }

    const handleChangeFiles = (e) => {
        const files = e.target.files;
        setSelectedFiles(Array.from(files));
    }

    const handleResetFormik = () => {
        formik.handleReset();
        setEmptySelectedFiles();
    }

    const handleSubmit = (form) => {
        const formData = new FormData();
        for (const file of selectedFiles) {
            formData.append("files", file);
        }
        dispatch(onLoading())
        uploadMultipartFileApi(formData, account.accessToken)
            .then(res => {
                const tour = {
                    image1: res.data[0],
                    image2: res.data[1],
                    image3: res.data[2],
                    image4: res.data[3],
                    ...form
                };
                return tour;
            })
            .then((tour) => {
                createTourApi(tour, account.accessToken)
                    .then(res => {
                        successAlert("Thành công", "Tour đã được tạo, quay lại trang quản lý để kiểm tra", "OK")
                            .then(result => {
                                if (result.isConfirmed) {
                                    navigate(ROUTE.TOUR_MANAGER);
                                }
                            })
                        dispatch(offLoading());
                    })
                    .catch(err => {
                        errorAlert("Thất bại", "Tạo tour không thành công, hãy thử lại!");
                        dispatch(offLoading());
                    })
            })
            .catch(err => {
                errorAlert("Thất bại", "Tạo tour không thành công, hãy thử lại!");
                dispatch(offLoading());
            })
    };

    return (
        <TourCreate
            formik={formik}
            handleChangeFiles={handleChangeFiles}
            handleResetFormik={handleResetFormik}
            selectedFiles={selectedFiles}
            setEmptySelectedFiles={setEmptySelectedFiles}
        />
    )
}

export default TourCreateContainer