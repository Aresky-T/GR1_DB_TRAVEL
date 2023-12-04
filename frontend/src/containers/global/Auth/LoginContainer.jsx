import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authSelector } from "../../../redux/selector";
import { useNavigate, useLocation } from "react-router-dom";
import { ROUTE } from "../../../constant/route";
import Login from "../../../components/global/Auth/Login";
import { useFormik } from "formik";
import { loginUserApi } from "../../../api/global/auth.api";
import { saveAccountInfo } from "../../../redux/slices/auth.slice";
import { ROLE } from "../../../constant/role";
import {
  errorAlert,
  warningAlert,
  warningAlertNoCancel,
} from "../../../config/sweetAlertConfig";
import { validateLoginForm } from "../../../validation";
import { toast } from "react-hot-toast";

const LoginContainer = () => {
  const accountInfo = useSelector(authSelector);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const handleLoginUser = (account) => {
    const loading = toast.loading("Đang xác thực...");
    loginUserApi(account)
      .then((res) => {
        const account = res.data;
        switch (account.role) {
          case ROLE.USER:
            setTimeout(() => {
              toast.dismiss(loading);
              toast.success("Xác thực thành công!", { duration: 1000 });
              setTimeout(() => {
                dispatch(
                  saveAccountInfo({
                    accessToken: account.token,
                    role: account.role,
                  })
                );
              }, 1000);
            }, 1000);
            break;
          case ROLE.ADMIN:
            setTimeout(() => {
              toast.dismiss(loading);
              warningAlert(
                "Cảnh báo",
                "Bạn không thể đăng nhập bằng tài khoản admin!",
                {
                  cancelButtonText: "Đăng nhập lại",
                  confirmButtonText: "Trang Chủ",
                }
              ).then((result) => {
                result.isConfirmed && navigate(ROUTE.HOME);
              });
            }, 1000);
            break;
          default:
        }
      })
      .catch((err) => {
        const message = err.response.data.message;
        if (message) {
          setTimeout(() => {
            toast.dismiss(loading);
            errorAlert("Đăng nhập thất bại", message, {
              cancelButtonText: "Đăng nhập lại",
              confirmButtonText: "Trang Chủ",
            }).then((result) => {
              result.isConfirmed && navigate(ROUTE.HOME);
            });
          }, 1000);
        }
      });
  };

  const loginFormik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validateLoginForm,
    onSubmit: (values) => {
      handleLoginUser({
        username: values.username,
        password: values.password,
      });
    },
  });

  const [activeError, setActiveError] = useState(null);

  const handleIconMouseEnter = (index) => {
    setActiveError(index);
  };

  const handleIconMouseLeave = () => {
    setActiveError(null);
  };

  useEffect(() => {
    if (accountInfo.role === ROLE.USER && accountInfo.accessToken) {
      if (location.state) {
        navigate(location.state.prevPath);
      } else {
        navigate(ROUTE.HOME);
      }
    }

    if (accountInfo.role === ROLE.ADMIN && accountInfo.accessToken) {
      warningAlertNoCancel(
        "Cảnh báo đăng nhập",
        "Bạn đang đăng nhập với vai trò quản trị viên, hãy đăng xuất ở trang quản trị!",
        "Tới Trang Quản trị"
      )
        .then((result) => {
          if (result.isConfirmed) {
            navigate(ROUTE.HOME_ADMIN);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [navigate, accountInfo, location]);

  return (
    <Login
      activeError={activeError}
      handleIconMouseEnter={handleIconMouseEnter}
      handleIconMouseLeave={handleIconMouseLeave}
      loginFormik={loginFormik}
    />
  );
};

export default LoginContainer;
