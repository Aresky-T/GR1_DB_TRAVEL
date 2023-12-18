import React, { useEffect, useState } from "react";
import { useAuth, useProfile } from "../../../../redux/selector";
import ValidateUtils from "../../../../utils/validate";
import { CUSTOM_REGEX } from "../../../../constant/regex";
import { updateProfileApi } from "../../../../api/global/profile.api";
import { toast } from "react-hot-toast";
import { successAlert } from "../../../../config/sweetAlertConfig";
import { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { getProfileThunk } from "../../../../redux/slices/profile.slice";

const initFormData = {
  fullName: "",
  dateOfBirth: "",
  address: "",
  phone: "",
  gender: "",
};

const initErrors = new Map();

const PersonalInfo = () => {
  const profile = useProfile();
  const [formData, setFormData] = useState(initFormData);
  const [errors, setErrors] = useState(initErrors);
  const auth = useAuth();
  const accessToken = auth.accessToken;
  const dispatch = useDispatch();

  const checkKeyInErrors = (key) => {
    return errors.has(key) ? "invalid" : "";
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

  const removeErrors = () => {
    errors.size > 0 && setErrors(initErrors);
  };

  const handleChangeForm = (event) => {
    removeErrors();
    if (event && event.target) {
      const { name, value } = event.target;
      setFormData((prevForm) => ({ ...prevForm, [name]: value }));
    }
  };

  const handleValidateForm = () => {
    const { isValid, errors } = ValidateUtils({
      formData: formData,
      rules: {
        fullName: { required: true },
        dateOfBirth: { required: true },
        address: { required: true },
        phone: { required: true, regex: CUSTOM_REGEX.PHONE },
        gender: { required: true },
      },
      messages: {
        fullName_required: "Họ tên không được để trống",
        dateOfBirth_required: "Ngày sinh không được để trống",
        address_required: "Địa chỉ không được để trống",
        phone_required: "Số điện thoại không được để trống",
        phone_regex: "Số điện thoại không đúng định dạng",
        gender_required: "Giới tính không được để trống",
      },
    });

    return { isValid, errors };
  };

  const handleSubmitForm = (event) => {
    event.preventDefault();
    const validate = handleValidateForm();
    if (!validate.isValid) {
      setErrors(validate.errors);
      return;
    }

    const loadingToast = toast.loading("Đang cập nhật...");
    updateProfileApi(accessToken, formData)
      .then((res) => {
        setTimeout(() => {
          toast.dismiss(loadingToast);
          successAlert(
            "Thành công",
            "Đã cập nhật hồ sơ thành công!",
            "OK"
          ).then((result) => {
            if (result.isConfirmed) {
              dispatch(getProfileThunk(accessToken));
            }
          });
        }, 1000);
      })
      .catch((error) => {
        setTimeout(() => {
          toast.dismiss(loadingToast);
          if (error instanceof AxiosError) {
            const message = "Cập nhật thất bại, vui lòng thử lại!";
            toast.error(message, { duration: 1000 });
          }
        }, 500);
      });
  };

  const handleResetForm = () => {
    removeErrors();
    for (const key in formData) {
      if (Object.hasOwnProperty.call(profile, key)) {
        setFormData((prevForm) => ({ ...prevForm, [key]: profile[key] ?? "" }));
      }
    }
  };

  useEffect(() => {
    for (const key in formData) {
      if (Object.hasOwnProperty.call(profile, key) && profile[key]) {
        setFormData((prevForm) => ({ ...prevForm, [key]: profile[key] }));
      }
    }
    // eslint-disable-next-line
  }, [profile]);

  return (
    <div className="profile__personal-info">
      <div className="profile__note">
        Thông tin cá nhân có thể được sử dụng để kết nối chat, mail, hoặc hiển
        thị trong các bài đánh giá. <br />
        Thông tin không được để trống và phải đúng định dạng.
      </div>
      <div className="profile__personal-info__main">
        <form
          className="profile__personal-info__form"
          onSubmit={handleSubmitForm}
          onReset={handleResetForm}
        >
          <div className="profile__personal-info__form__item fullName">
            <label className="profile__personal-info__label">Tên đầy đủ</label>
            <input
              type="text"
              name="fullName"
              className={`profile-form__field ${checkKeyInErrors("fullName")}`}
              placeholder="Không xác định"
              value={formData.fullName}
              onChange={handleChangeForm}
            />
            {renderErrorMessage("fullName")}
          </div>
          <div className="profile__personal-info__form__item dateOfBirth">
            <label className="profile__personal-info__label">Ngày sinh</label>
            <input
              type="date"
              name="dateOfBirth"
              className={`profile-form__field ${checkKeyInErrors(
                "dateOfBirth"
              )}`}
              placeholder="Không xác định"
              value={formData.dateOfBirth}
              onChange={handleChangeForm}
            />
            {renderErrorMessage("dateOfBirth")}
          </div>
          <div className="profile__personal-info__form__item address">
            <label className="profile__personal-info__label">Địa chỉ</label>
            <input
              type="text"
              name="address"
              className={`profile-form__field ${checkKeyInErrors("address")}`}
              placeholder="Không xác định"
              value={formData.address}
              onChange={handleChangeForm}
            />
            {renderErrorMessage("address")}
          </div>
          <div className="profile__personal-info__form__item phone">
            <label className="profile__personal-info__label">
              Số điện thoại
            </label>
            <input
              type="text"
              name="phone"
              className={`profile-form__field ${checkKeyInErrors("phone")}`}
              placeholder="Không xác định"
              value={formData.phone}
              onChange={handleChangeForm}
            />
            {renderErrorMessage("phone")}
          </div>
          <div className="profile__personal-info__form__item gender">
            <label className="profile__personal-info__label">Giới tính</label>
            <select
              name="gender"
              className={`profile-form__field ${checkKeyInErrors("gender")}`}
              value={formData.gender}
              onChange={handleChangeForm}
            >
              <option value="">Không xác định</option>
              <option value="MALE">Nam</option>
              <option value="FEMALE">Nữ</option>
              <option value="OTHER">Khác</option>
            </select>
            {renderErrorMessage("gender")}
          </div>
          <div className="profile__personal-info__form__item btn-area">
            <button type="submit" className="profile-form__btn submit">
              Cập nhật
            </button>
            <button type="reset" className="profile-form__btn reset">
              Hủy cập nhật
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PersonalInfo;
