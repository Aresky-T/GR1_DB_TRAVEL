import { useEffect } from "react";
import { handleScrollToTop } from "./PublicRoute";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { authSelector } from "../redux/selector";
import { ROUTE } from "../constant/route";
const PrivateRoute = (props) => {
    const account = useSelector(authSelector);
    const location = useLocation();
    const navigate = useNavigate();
    const role = props.role;

    useEffect(() => {
        if (role && !role.includes(account.role)) {
            if (role.includes("ADMIN")) {
                navigate(ROUTE.LOGIN_ADMIN)
            } else if (role.includes("USER")) {
                navigate(ROUTE.LOGIN)
            }
        }
    }, [role, account, navigate])

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