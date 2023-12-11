import React from "react";
import PersonalInfo from "./PersonalInfo";
import AvatarUpdate from "./AvatarUpdate";
import PasswordUpdate from "./PasswordUpdate";

const AccountInfo = () => {
  return (
    <div className="profile__account-info">
      <div className="profile__account-info__item">
        <div className="profile-container__main__title-1">
          Thông tin cá nhân
        </div>
        <PersonalInfo />
      </div>
      <div className="profile__account-info__item">
        <div className="profile-container__main__title-1">Ảnh đại diện</div>
        <AvatarUpdate />
      </div>
      <div className="profile__account-info__item">
        <div className="profile-container__main__title-1">Mật khẩu</div>
        <PasswordUpdate />
      </div>
    </div>
  );
};

export default AccountInfo;
