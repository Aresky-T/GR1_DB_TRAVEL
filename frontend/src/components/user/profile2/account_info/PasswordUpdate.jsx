import React, { useState } from "react";
import ValidateUtils from "../../../../utils/validate";
import { CUSTOM_REGEX } from "../../../../constant/regex";
import { useAuth } from "../../../../redux/selector";
import { updatePasswordApi } from "../../../../api/global/account.api";
import { toast } from "react-hot-toast";
import { successAlert } from "../../../../config/sweetAlertConfig";
import { useDispatch } from "react-redux";
import { logout } from "../../../../redux/slices/auth.slice";
import { AxiosError } from "axios";

const initErrors = new Map();
const initFormData = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const PasswordUpdate = () => {
  const [formData, setFormData] = useState(initFormData);
  const [errors, setErrors] = useState(initErrors);

  const auth = useAuth();
  const accessToken = auth.accessToken;
  const dispatch = useDispatch();

  const handleChangeForm = (event) => {
    removeErrors();
    if (event && event.target) {
      const { name, value } = event.target;
      setFormData((prevForm) => ({ ...prevForm, [name]: value }));
    }
  };

  const handleResetForm = () => {
    setFormData(initFormData);
    removeErrors();
  };

  const handleValidateFormData = () => {
    const regex_password = CUSTOM_REGEX.PASSWORD;
    return ValidateUtils({
      formData: formData,
      rules: {
        currentPassword: {
          required: true,
        },
        newPassword: {
          required: true,
          regex: regex_password,
        },
        confirmPassword: {
          required: true,
          equal_to: "newPassword",
        },
      },
      messages: {
        currentPassword_required: "Mật khẩu hiện tại không được trống",
        newPassword_required: "Mật khẩu mới không được trống",
        newPassword_regex: "Mật khẩu mới không đúng định dạng",
        confirmPassword_required: "Yêu cầu nhập lại mật khẩu mới",
        confirmPassword_equal_to:
          "Mật khẩu xác nhận không khớp với mật khẩu mới",
      },
    });
  };

  const renderErrorMessage = (fieldName) => {
    if (errors.has(fieldName)) {
      return (
        <div className="profile__error-message">
          {errors.get(fieldName)?.message}
        </div>
      );
    }
    return "";
  };

  const checkKeyInErrors = (key) => {
    return errors.has(key) ? "invalid" : "";
  };

  const removeErrors = () => {
    errors.size > 0 && setErrors(new Map());
  };

  const handleSubmitUpdatePassword = (event) => {
    event.preventDefault();
    const validateResult = handleValidateFormData();
    if (!validateResult.isValid) {
      setErrors(validateResult.errors);
      return;
    }

    const loadingToast = toast.loading("Đang cập nhật...");
    updatePasswordApi(formData, accessToken)
      .then((res) => {
        setTimeout(() => {
          toast.dismiss(loadingToast);
          successAlert(
            "Thành công",
            "Đã cập nhật mật khẩu thành công, vui lòng đăng nhập lại!",
            "Tiếp tục"
          ).then((result) => {
            if (result.isConfirmed) {
              dispatch(logout());
            }
          });
        }, 500);
      })
      .catch((error) => {
        setTimeout(() => {
          toast.dismiss(loadingToast);
          if (error instanceof AxiosError) {
            const message = error.response.data.message
              ? "Bạn đã nhập sai mật khẩu!"
              : "Cập nhật mật khẩu thất bại!";
            toast.error(message, { duration: 1000 });
          }
        }, 500);
      });
  };

  return (
    <div className="profile__password-update">
      <div className="profile__note">
        <span>
          Hãy nhập mật khẩu hiện tại và mật khẩu mới để cập nhật mật khẩu.
          <br />
          Mật khẩu mới phải chứa từ <b>8 đến 20 ký tự</b>, bao gồm{" "}
          <b>chữ in hoa</b>, <b>chữ in thường</b>, <b>số</b> và{" "}
          <b>ký tự đặc biệt</b>.
        </span>
      </div>
      <div className="profile__password-update__main">
        <form
          className="profile__password-update__form"
          onSubmit={handleSubmitUpdatePassword}
          onReset={handleResetForm}
        >
          <div className="profile__password-update__form__item">
            <input
              type="password"
              name="currentPassword"
              placeholder="Nhập mật khẩu hiện tại"
              className={`profile-form__field ${checkKeyInErrors(
                "currentPassword"
              )}`}
              value={formData.currentPassword}
              onChange={handleChangeForm}
            />
            {renderErrorMessage("currentPassword")}
          </div>
          <div className="profile__password-update__form__item">
            <input
              type="password"
              name="newPassword"
              placeholder="Nhập mật khẩu mới"
              className={`profile-form__field ${checkKeyInErrors(
                "newPassword"
              )}`}
              value={formData.newPassword}
              onChange={handleChangeForm}
            />
            {renderErrorMessage("newPassword")}
          </div>
          <div className="profile__password-update__form__item">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Nhập lại mật khẩu mới"
              className={`profile-form__field ${checkKeyInErrors(
                "confirmPassword"
              )}`}
              value={formData.confirmPassword}
              onChange={handleChangeForm}
            />
            {renderErrorMessage("confirmPassword")}
          </div>
          <div className="btn-area">
            <input
              type="submit"
              value="Cập nhật"
              className="profile-form__btn submit"
            />
            <input
              type="reset"
              value="Hủy cập nhật"
              className="profile-form__btn reset"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordUpdate;
