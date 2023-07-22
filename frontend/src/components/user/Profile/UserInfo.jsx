import React, { useRef, useState } from 'react'
import defaultAvatar from '../../../assets/image/avatar.jpg'
import ProfileField from './ProfileField'
import ProfileFieldSelect from './ProfileFieldSelect'
import UpdateAvatarModal from './UpdateAvatarModal'

const initGenders = [
    { id: 1, name: "Nam", value: "MALE" },
    { id: 2, name: "Nữ", value: "FEMALE" },
]

const UserInfo = ({ profile, formik, setMessage }) => {
    const [isShowModal, setIsShowModal] = useState(false);
    const genderOptions = useRef(initGenders);
    const avatarRef = useRef();

    const handleShowModal = () => {
        setIsShowModal(true);
    }

    const handleCloseModal = () => {
        setIsShowModal(false);
    }

    const renderGender = (gender) => {
        let g;
        switch (gender) {
            case 'MALE':
                g = 'Nam';
                break;
            case 'FEMALE':
                g = 'Nữ';
                break;
            default:
        }
        return g;
    }

    return (
        <section className='profile-item profile__user-info'>
            <h2 className="profile-item__title">Thông tin cá nhân</h2>
            <div className="user-info__1">
                <div className="user-info__avatar">
                    <img src={profile.avatarUrl || defaultAvatar} alt="" />
                    <div className="user-info__change-avatar"
                        onClick={handleShowModal}
                    >
                        Thay đổi
                    </div>
                    <input type="file" name="" id=""
                        ref={avatarRef}
                        multiple={false}
                        style={{
                            display: "none"
                        }}
                    />
                    {isShowModal && <UpdateAvatarModal
                        handleCloseModal={handleCloseModal}
                        setMessage={setMessage}
                    />}
                </div>
                {profile.account &&
                    <div className="user-info__account">
                        <p className="ui-account__username">
                            {profile.account?.username}
                        </p>
                        <p className="ui-account__email">
                            {profile.account?.email}
                        </p>
                    </div>}
            </div>
            <div className="user-info__2">
                <ProfileField
                    name="fullName"
                    label="Họ tên"
                    placeholder="Họ tên"
                    value={profile.fullName}
                    inputValue={formik.values.fullName}
                    handleChange={formik.handleChange}
                    handleSubmit={formik.handleSubmit}
                />
                <ProfileField
                    name="address"
                    label="Địa chỉ"
                    placeholder="Địa chỉ"
                    value={profile.address}
                    inputValue={formik.values.address}
                    handleChange={formik.handleChange}
                    handleSubmit={formik.handleSubmit}
                />
                <ProfileField
                    name="phone"
                    label="Số điện thoại"
                    placeholder="Số điện thoại"
                    value={profile.phone}
                    inputValue={formik.values.phone}
                    handleChange={formik.handleChange}
                    handleSubmit={formik.handleSubmit}
                />
                <ProfileField
                    type="date"
                    name="dateOfBirth"
                    label="Ngày sinh"
                    placeholder="Ngày sinh"
                    value={profile.dateOfBirth}
                    inputValue={formik.values.dateOfBirth}
                    handleChange={formik.handleChange}
                    handleSubmit={formik.handleSubmit}
                />
                <ProfileFieldSelect
                    name="gender"
                    label="Giới tính"
                    placeholder="Giới tính"
                    options={genderOptions.current}
                    value={renderGender(profile.gender)}
                    selectValue={formik.values.gender}
                    handleChange={formik.handleChange}
                    handleSubmit={formik.handleSubmit}
                />
            </div>
        </section>
    )
}

export default UserInfo