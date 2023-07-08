import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Loading from "./components/global/Loading/Loading";
import AppRouter from "./router/AppRouter";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "./redux/selector";
import { logout } from "./redux/slices/auth.slice";
import { validateAccount } from "./api/global/auth.api";
import { warningAlertNoCancel } from "./config/sweetAlertConfig";
import { ROUTE } from "./constant/route";
import { HelmetProvider } from "react-helmet-async";

function App() {

    const account = useSelector(authSelector);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        account.accessToken && validateAccount(account.accessToken)
            .catch(err => {
                if (err.response && err.response.data) {
                    const { message } = err.response.data;
                    warningAlertNoCancel("Cảnh báo", message, "Đăng nhập")
                        .then(result => {
                            if (result.isConfirmed) {
                                navigate(ROUTE.LOGIN);
                                dispatch(logout());
                            }
                        }).catch(err => {

                        })
                }
            })
    }, [account, navigate, dispatch])

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
