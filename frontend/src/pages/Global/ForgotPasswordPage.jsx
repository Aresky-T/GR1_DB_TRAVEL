import { Helmet } from "react-helmet-async";
import ForgotPasswordContainer from "../../containers/global/Auth/ForgotPasswordContainer";

const ForgotPasswordPage = () => {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>BK Travel - Lấy lại mật khẩu</title>
                <meta name="forgot-password-page" content="BK travel application" />
            </Helmet>
            <ForgotPasswordContainer />
        </>
    )
}

export default ForgotPasswordPage