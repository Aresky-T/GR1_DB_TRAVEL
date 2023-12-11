import React, { useState } from "react";
import UpdateAvatarModal from "./UpdateAvatarModal";

const AvatarUpdate = () => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [message, setMessage] = useState("");

  const handleShowModal = () => {
    !isShowModal && setIsShowModal(true);
  };

  const handleCloseModal = () => {
    setIsShowModal(false);
  };

  return (
    <div className="profile__avatar-update">
      <div className="profile__note">
        Ảnh đại điện được hiển thị trong hồ sơ, các bài đánh giá,...và có thể
        cập nhật ở dưới đây.
      </div>
      <div className="profile__avatar-update__main">
        <button onClick={handleShowModal} className="profile-form__btn submit">
          Thay đổi
        </button>
        {isShowModal && (
          <UpdateAvatarModal
            handleCloseModal={handleCloseModal}
            setMessage={setMessage}
          />
        )}
      </div>
    </div>
  );
};

export default AvatarUpdate;
