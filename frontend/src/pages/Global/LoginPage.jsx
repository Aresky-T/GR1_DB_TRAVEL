import React from 'react'
import LoginContainer from "../../containers/global/Auth/LoginContainer";
import { Helmet } from 'react-helmet-async';

const LoginPage = () => {
    return (
        <>
            <Helmet>
                <meta charSet='utf-8' />
                <title>BK Travel - Đăng nhập</title>
                <meta name="login-page" content="BK travel application" />
            </Helmet>
            <LoginContainer />
        </>
    )
}

export default LoginPage