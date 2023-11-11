import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Loading from "./components/global/Loading/Loading";
import AppRouter from "./router/AppRouter";
import { useDispatch } from "react-redux";
import { useAuth } from "./redux/selector";
import { logout } from "./redux/slices/auth.slice";
import { validateAccountApi, validateTokenApi } from "./api/global/auth.api";
import { warningAlertNoCancel } from "./config/sweetAlertConfig";
import { ROUTE } from "./constant/route";
import { HelmetProvider } from "react-helmet-async";
import { getProfileThunk } from "./redux/slices/profile.slice";

function App() {

    const account = useAuth();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    async function handleValidateToken(token) {
        try {
            const res = await validateTokenApi(token);
            const isValidToken = res.data;
            if (isValidToken) {
                const res2 = await validateAccountApi(token);
                const isValidAccount = res2.data;
                if (!isValidAccount) {
                    const message = "Tài khoản của bạn đã mất quyền truy cập vào trang web này";
                    warningAlertNoCancel("Cảnh báo", message, "Trang chủ")
                        .then(result => {
                            if (result.isConfirmed) {
                                dispatch(logout());
                                navigate(ROUTE.HOME);
                            }
                        }).catch(err => { });
                } else {
                    dispatch(getProfileThunk(token));
                }
            } else {
                const message = "Tài khoản của bạn đã hết quyền truy cập, hãy đăng nhập lại!";
                warningAlertNoCancel("Cảnh báo", message, "Đăng nhập")
                    .then(result => {
                        if (result.isConfirmed) {
                            navigate(ROUTE.LOGIN);
                            dispatch(logout());
                        }
                    }).catch(err => { });
            }
        } catch (e) {
            //handle catch error here
        }
    }

    useEffect(() => {
        account.accessToken && handleValidateToken(account.accessToken);
        //eslint-disable-next-line
    }, [account.accessToken])

    return (
        <>
            <HelmetProvider>
                <AppRouter />
            </HelmetProvider>
            <Toaster
                position="top center"
            />
            <Loading />
        </>
    );
}

export default App;
