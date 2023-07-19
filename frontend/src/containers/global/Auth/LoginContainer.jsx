import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../../../redux/selector";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "../../../constant/route";
import Login from "../../../components/global/Auth/Login";
import { useFormik } from "formik";
import { loginUserApi } from "../../../api/global/auth.api";
import { saveAccountInfo } from "../../../redux/slices/auth.slice";
import { ROLE } from '../../../constant/role';
import { errorAlert, warningAlertNoCancel } from "../../../config/sweetAlertConfig";
import { validateLoginForm } from "../../../validation";

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
                        navigate(ROUTE.HOME);
                        break;
                    case ROLE.ADMIN:
                        warningAlertNoCancel("Cảnh báo", "Bạn không thể đăng nhập bằng tài khoản admin!", "OK")
                        break;
                    default:
                }
            })
            .catch(err => {
                const message = err.response.data.message;
                if (message) {
                    errorAlert("Đăng nhập thất bại", message);
                }
            })
    }

    const loginFormik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema: validateLoginForm,
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
        if (accountInfo.role === ROLE.USER && accountInfo.accessToken) {
            navigate(ROUTE.HOME);
        }

        if (accountInfo.role === ROLE.ADMIN && accountInfo.accessToken) {
            warningAlertNoCancel('Cảnh báo đăng nhập', 'Bạn đang đăng nhập với vai trò quản trị viên, hãy đăng xuất ở trang quản trị!', 'Tới Trang Quản trị')
                .then(result => {
                    if (result.isConfirmed) {
                        navigate(ROUTE.HOME_ADMIN);
                    }
                })
                .catch(err => {
                    console.log(err)
                })
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