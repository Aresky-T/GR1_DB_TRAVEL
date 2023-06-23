import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../../redux/selector";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "../../constant/route";
import Login from "../../components/global/Login";
import * as yup from 'yup';
import { CUSTOM_REGEX } from "../../constant/regex";
import { useFormik } from "formik";
import { loginUserApi } from "../../api/global/auth.api";
import { saveAccountInfo } from "../../redux/slices/auth.slice";
import { customToast } from "../../toaster";
import { ROLE } from '../../constant/role';

const yupSchema = yup.object().shape({
    username: yup.string()
        .required('Tên tài khoản không được để trống!')
        .matches(CUSTOM_REGEX.USERNAME2, 'Tên tài khoản không được chứa dấu cách'),
    password: yup.string()
        .required('Mật khẩu không được để trống!')
})


const LoginContainer = () => {
    const accountInfo = useSelector(authSelector);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLoginUser = (account) => {
        loginUserApi(account)
            .then(res => {
                const account = res.data
                switch (account.role) {
                    case ROLE.USER:
                        dispatch(saveAccountInfo({
                            accessToken: account.token,
                            role: account.role
                        }));
                        break;
                    case ROLE.ADMIN:
                        customToast('Bạn không thể đăng nhập bằng tài khoản admin!', '❌')
                        break;
                    default:
                }
                navigate(ROUTE.HOME);
            })
            .catch(err => {
                customToast('Tài khoản hoặc mật khẩu không hợp lệ!', '❌')
            })
    }

    const loginFormik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema: yupSchema,
        onSubmit: values => {
            handleLoginUser({
                username: values.username,
                password: values.password
            })
        }
    })

    const [activeError, setActiveError] = useState(null);

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
        <Login
            activeError={activeError}
            handleIconMouseEnter={handleIconMouseEnter}
            handleIconMouseLeave={handleIconMouseLeave}
            loginFormik={loginFormik}
        />
    )
}

export default LoginContainer