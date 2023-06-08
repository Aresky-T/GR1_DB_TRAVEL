import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {useFormik} from "formik";
import {loginAdminApi} from "../../api/admin/auth.api";
import {toast} from "react-hot-toast";
import {saveAccountInfo} from "../../redux/slices/auth.slice";
import Login from "../../components/admin/Login";

const LoginContainer = () => {

    const yup = require("yup");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [account, setAccount] = useState()

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
                    toast.error("Account role is not admin!")
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
    }, [account])

    useEffect(() => {
        if (localStorage.getItem('accountInfo')) {
            navigate(-1);
        }
    }, [])

    return (
        <div className="admin-login-container">
            <Login authFormik={authFormik}/>
        </div>
    )
}

export default LoginContainer;