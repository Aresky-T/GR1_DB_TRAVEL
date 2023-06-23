import {useEffect} from "react";
import { handleScrollToTop} from "./PublicRoute";
import {useLocation, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {authSelector} from "../redux/selector";
const PrivateRoute = (props) => {
    const account = useSelector(authSelector);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if(!account.role || !account.accessToken) {
            navigate("/login")
        }
    }, [account, navigate])

    useEffect(() => {
        handleScrollToTop();
    }, [location.pathname])

    return (
        <>
            {props.children}
        </>
    )
}

export default PrivateRoute;