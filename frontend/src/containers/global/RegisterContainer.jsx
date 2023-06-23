import React, { useEffect, useState } from 'react'
import Register from '../../components/global/Register'
import * as yup from 'yup'
import { CUSTOM_REGEX } from '../../constant/regex'
import { useFormik } from 'formik'
import { registerUserApi } from '../../api/global/auth.api'
import { customToast } from '../../toaster'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { offLoading } from '../../redux/slices/loading.slice'
import { authSelector } from '../../redux/selector'
import { ROUTE } from '../../constant/route'

const yupSchema = yup.object().shape({
  email: yup.string()
    .required('Email không được để trống'),
  username: yup.string()
    .required('Tên tài khoản không được để trống!')
    .matches(CUSTOM_REGEX.USERNAME2, 'Tên tài khoản không được chứa dấu cách'),
  password: yup.string()
    .required('Mật khẩu không được để trống!')
    .matches(CUSTOM_REGEX.PASSWORD, 'Mật khẩu từ 8 đến 20 ký tự, bao gồm các chữ in hoa, chữ thường, các số và ký tự đặc biệt!'),
  confirmPassword: yup.string()
    .required('Mật khẩu không được để trống!')
    .oneOf([yup.ref('password'), null], 'Mật khẩu xác nhận không khớp!')
})


const RegisterContainer = () => {

  const [activeError, setActiveError] = useState(null);
  const accountInfo = useSelector(authSelector);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const registerFormik = useFormik({
    initialValues: {
      email: '',
      username: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: yupSchema,
    onSubmit: values => {
      const { email, username, password } = values;
      registerUserApi({ email, username, password }, dispatch)
        .then(res => {
          dispatch(offLoading());
          showSwalWithLink();
        })
        .catch(err => {
          dispatch(offLoading());
          const message = err.response.data?.message;
          customToast(message, '❌');
        })
    }
  });

  const showSwalWithLink = () => {
    Swal.fire({
      icon: "success",
      title: "Đăng ký tài khoản thành công!",
      confirmButtonText: "Đăng nhập",
      showCancelButton: true,
      cancelButtonText: 'Thoát'
    })
      .then((result) => {
        if (result.isConfirmed) {
          navigate('/login')
        };

        if (result.isDismissed) {
          navigate('/')
        }
      })
  }

  const handleIconMouseEnter = (index) => {
    setActiveError(index);
  };

  const handleIconMouseLeave = () => {
    setActiveError(null);
  };

  useEffect(() => {
    if (accountInfo.role && accountInfo.accessToken) {
      navigate(ROUTE.HOME);
    }
  }, [navigate, accountInfo])

  return (
    <Register
      activeError={activeError}
      handleIconMouseEnter={handleIconMouseEnter}
      handleIconMouseLeave={handleIconMouseLeave}
      registerFormik={registerFormik}
    />
  )
}

export default RegisterContainer