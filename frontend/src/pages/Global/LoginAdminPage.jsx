import React from 'react';
import LoginAdminContainer from "../../containers/admin/Auth/LoginAdminContainer";
import { Helmet } from 'react-helmet-async';

const LoginAdminPage = () => {
    return (
        <>
            <Helmet>
                <meta charSet='utf-8' />
                <title>BK Travel Admin - Đăng nhập</title>
                <meta name="login-admin-page" content="BK travel application" />
            </Helmet>
            <LoginAdminContainer />
        </>
    )
}
export default LoginAdminPage