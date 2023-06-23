import React, { useEffect, useState } from 'react';
import { CUSTOM_REGEX } from '../../constant/regex';
import * as yup from 'yup'

const validationSchema = yup.object().shape({
    fullName: yup.string().required("Required fullName").matches(CUSTOM_REGEX.REGEX_STRING, 'Invalid fullName'),
    birthDate: yup.date().required("Required birthDate"),
    gender: yup.string().required('Required gender').matches(CUSTOM_REGEX.REGEX_STRING, "Invalid gender")
})

const TouristFields = React.memo(({ label, bookingFormik, tourist, list, listName }) => {
    const [currentTourist, setCurrentTourist] = useState({
        fullName: '',
        birthDate: '',
        gender: '',
    });

    const handleChangeForm = (e) => {
        if (e.target) {
            const { name, value } = e.target;
            setCurrentTourist({
                ...currentTourist,
                [name]: value
            })
        }
    }

    useEffect(() => {
        validationSchema.isValid(currentTourist)
        .then(isValid => {
            if(isValid){
                const newList = list.map(item => {
                    if(item === tourist){
                        return currentTourist
                    }
                    return item
                })
                bookingFormik.setFieldValue(listName, newList);
            }
        })
        .catch(err => {
            console.log(err)
        })
        // eslint-disable-next-line
    }, [currentTourist])

    console.log(list)

    useEffect(() => {
        if(tourist){
            setCurrentTourist({
                ...tourist
            })
        }
    }, [])

    return (
        <div className='ci__tl__main__item'>
            <label>{label}</label>
            <div className='ci__tl__main__fields'>
                <div>
                    <input type="text" name="fullName"
                        placeholder='Họ tên'
                        value={currentTourist.fullName}
                        onChange={handleChangeForm}
                    />
                </div>
                <div>
                    <input type="date" name="birthDate"
                        placeholder='Ngày sinh'
                        value={currentTourist.birthDate}
                        onChange={handleChangeForm}
                    />
                </div>
                <div>
                    <select name="gender" onChange={handleChangeForm}
                        value={currentTourist.gender}
                    >
                        <option value="">Giới tính</option>
                        <option value="MALE">Nam</option>
                        <option value="FEMALE">Nữ</option>
                        <option value="OTHER">Khác</option>
                    </select>
                </div>
                {/* {formik.values.isRegister ?
                    <button type="button" className='tourist-info-btn--cancel'
                        onClick={handleCancelRegisterStatus}>Hủy đăng ký</button>
                    :
                    <button type='submit' className='tourist-info-btn--register'
                        onClick={formik.handleSubmit}>Đăng ký</button>
                } */}
            </div>
        </div>
    )
})

export default TouristFields