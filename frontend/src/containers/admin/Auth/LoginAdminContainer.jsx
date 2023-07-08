import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useFormik} from "formik";
import {toast} from "react-hot-toast";
import {saveAccountInfo} from "../../../redux/slices/auth.slice";
import Login from "../../../components/admin/Login/Login";
import {authSelector} from "../../../redux/selector";
import {ROUTE} from "../../../constant/route";
import {ROLE} from "../../../constant/role";
import {loginAdminApi} from "../../../api/global/auth.api";

const LoginAdminContainer = () => {

    const yup = require("yup");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [account, setAccount] = useState()
    const accountInfo = useSelector(authSelector);

    const authFormik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema: yup.object().shape({
            username: yup.string().required("Required"),
            password: yup.string().required("Required")
        }),
        onSubmit: values => {
            handleSubmitForm(values);
        }
    })

    function handleSubmitForm(data) {
        loginAdminApi(data)
            .then(res => {
                if (res.data.role === "ADMIN") {
                    setAccount(res.data)
                } else {
                    toast.error("Bạn không phải admin!")
                }
            })
            .catch(err => {
                toast.error(err.response ? err.response.data.message : "Login failed")
            })
    }

    useEffect(() => {
        if (account) {
            dispatch(saveAccountInfo({
                accessToken: account.token,
                role: account.role
            }));
            navigate("/admin")
        }
    }, [account, navigate, dispatch])

    // useEffect(() => {
    //     if(accountInfo.role === ROLE.ADMIN && accountInfo.accessToken) {
    //         navigate(ROUTE.HOME_ADMIN);
    //     }

    //     if(accountInfo.role === ROLE.USER && accountInfo.accessToken) {
    //         navigate(ROUTE.HOME);
    //     }
    // }, [accountInfo, navigate])

    useEffect(() => {
        if (accountInfo.role && accountInfo.accessToken) {
            switch (accountInfo.role) {
                case ROLE.USER:
                    navigate(ROUTE.HOME);
                    break;
                case ROLE.ADMIN:
                    navigate(ROUTE.HOME_ADMIN);
                    break;
                default:
            }
        }
    }, [accountInfo, navigate])

    return (
        <div className="admin-login-container">
            <Login authFormik={authFormik}/>
        </div>
    )
}

export default LoginAdminContainer;