import {useNavigate} from "react-router-dom";
import React, {useEffect} from "react";
import { Toaster } from "react-hot-toast";
import Loading from "./components/global/Loading";
import AppRouter from "./router/AppRouter";
import {useDispatch, useSelector} from "react-redux";
import {authSelector} from "./redux/selector";
import {logout} from "./redux/slices/auth.slice";
import { validateTokenApi } from "./api/global/auth.api";

function App() {

    const account = useSelector(authSelector);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        account.accessToken && validateTokenApi(account.accessToken)
            .catch(err => {
                dispatch(logout());
            })
    }, [account, navigate, dispatch])

  return (
    <>
        <AppRouter/>
        <Toaster
            position="top center"
        />
        <Loading/>
    </>
  );
}

export default App;
