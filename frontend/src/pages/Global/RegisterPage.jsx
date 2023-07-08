import React from 'react'
import RegisterContainer from '../../containers/global/Auth/RegisterContainer'
import { Helmet } from 'react-helmet-async'

const RegisterPage = () => {
    return (
        <>
            <Helmet>
                <meta charSet='utf-8' />
                <title>BK Travel - Đăng ký</title>
                <meta name="register-page" content="BK travel application" />
            </Helmet>
            <RegisterContainer />
        </>
    )
}

export default RegisterPage