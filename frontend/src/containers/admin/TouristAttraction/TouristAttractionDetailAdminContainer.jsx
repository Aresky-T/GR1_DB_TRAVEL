import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getTouristAttractionDetailsApi } from '../../../api/global/tourist_attraction.api';
import { useFormik } from 'formik';
import TouristAttractionDetailAdmin from '../../../components/admin/TouristAttraction/TouristAttractionDetailAdmin';
import { validateTouristAttraction } from '../../../validation';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from '../../../redux/selector';
import { deleteTouristAttractionApi, updateTouristAttractionApi } from '../../../api/admin/tourist_attraction.api';
import { errorAlert, questionAlert, successAlert, warningAlertNoCancel, warningAlertWithCancel } from '../../../config/sweetAlertConfig';
import { ROUTE } from '../../../constant/route';
import { offLoading, onLoading } from '../../../redux/slices/loading.slice';

const initBlogContent = {
    subTitle: '',
    image: '',
    content: ''
}

const TouristAttractionDetailAdminContainer = () => {

    const param = useParams();
    const account = useSelector(authSelector);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [message, setMessage] = useState('');

    const formik = useFormik({
        initialValues: {
            id: 0,
            name: '',
            title: '',
            imageUrl: '',
            intro: '',
            listContents: [],
            contentsCount: 1
        },
        onSubmit: values => {
            validateTouristAttraction.validate(values)
                .then(data => {
                    dispatch(onLoading());
                    updateTouristAttractionApi(data, account.accessToken)
                        .then(res => {
                            dispatch(offLoading());
                            successAlert('Thành công', 'Cập nhật Địa điểm du lịch thành công!', 'OK')
                            setMessage(message => message + 'success')
                        })
                        .catch(err => {
                            dispatch(offLoading());
                            errorAlert('Thất bại', 'Cập nhật không thành công, hãy kiểm tra lại!', 'OK')
                            setMessage(message => message + 'failed')
                        })
                })
                .catch(error => {
                    console.log(error)
                })
        }
    })

    const addBlogContent = () => {
        const contents = formik.values.listContents;
        contents.push({ ...initBlogContent })
        formik.setFieldValue("listContents", contents)
    }

    const removeBlogContent = (content) => {
        const contents = formik.values.listContents;
        if (contents.length <= 1) {
            warningAlertNoCancel("Cảnh báo", "Một địa điểm du lịch có ít nhất một phần nội dung trong bài viết, không thể xóa!", "OK");
            return;
        }

        warningAlertWithCancel("Cảnh báo", "Bạn có chắn chắn muốn xóa?", "Chắc chắn", "Hủy bỏ")
            .then(result => {
                if (result.isConfirmed) {
                    const index = contents.indexOf(content);
                    contents.splice(index, 1);
                    formik.setFieldValue("listContents", contents);
                }
            })
    }

    const handleRestoreOriginal = () => {
        setMessage(message => message + 'restore');
    }

    const handleDeleteTouristAttraction = () => {
        const id = param.id;
        questionAlert("Yêu cầu xác nhận", "Tất cả dữ liệu về Địa điểm du lịch này sẽ bị xóa đi, bạn có chắc chắn?", "Chắc chắn, Xóa!", "Hủy bỏ")
            .then(result => {
                if (result.isConfirmed) {
                    deleteTouristAttractionApi(id, account.accessToken)
                        .then(res => {
                            successAlert('Thành công', 'Đã xóa thành công', 'OK')
                                .then(result => {
                                    if (result.isConfirmed) {
                                        navigate(ROUTE.TOURIST_ATTRACTION_MANAGER);
                                    }
                                })
                        })
                        .catch(err => {
                            errorAlert('Thất bại', 'Xóa không thành công, vui lòng kiểm tra lại!')
                        })
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        const id = param.id;
        getTouristAttractionDetailsApi(id)
            .then(res => {
                const data = res.data;
                formik.setValues({
                    id: data.id,
                    name: data.name,
                    title: data.title,
                    intro: data.intro,
                    imageUrl: data.imageUrl,
                    listContents: data.listContents
                })
            })
            .catch(err => {
                console.log(err)
            })
        //eslint-disable-next-line
    }, [param, message])

    return (
        <TouristAttractionDetailAdmin
            addBlogContent={addBlogContent}
            formik={formik}
            handleDeleteTouristAttraction={handleDeleteTouristAttraction}
            removeBlogContent={removeBlogContent}
            handleRestoreOriginal={handleRestoreOriginal}
        />
    )
}

export default TouristAttractionDetailAdminContainer