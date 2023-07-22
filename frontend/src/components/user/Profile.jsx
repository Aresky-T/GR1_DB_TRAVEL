import React from 'react'
import UserInfo from './Profile/UserInfo'
import BookedTourList from './Profile/BookedTourList'

const Profile = ({ profile, bookedTours, formik, setMessage }) => {
  return (
    <div className='main-session profile-container'>
      {/* <div className='card'>
        <div className='card-body' style={{ width: '40%' }}>
          <h3 className='card-title '>Thông tin cá nhân</h3>
          <div className='rounded-image'>
            <img src={profile.avatar_url} alt='avatar' />
          </div>

          <p className='card-text'>Họ tên: {profile.fullName}</p>
          <p className='card-text'>Email: {profile.email}</p>
          <p className='card-text'>Số điện thoại: {profile.phone}</p>
          <p className='card-text'>Địa chỉ: {profile.address}</p>
          <p className='card-text'>Ngày sinh: {profile.dateOfBirth}</p>
          <p className='card-text'>
            Giới tính: {profile.gender == 'MALE' ? 'Nam' : 'Nữ'}
          </p>
        </div>

        <div className='card-body' style={{ width: '60%' }}>
          <h3 className='card-title'>Các tour đã đặt</h3>
          <table className='table'>
            <thead>
              <tr>
                <th className='center'>STT</th>
                <th className='center'>Tên tour</th>
                <th className='center'>Ngày đặt</th>
                <th className='center'>Giá tiền</th>
              </tr>
            </thead>
            <tbody>
              {bookedTours.map((tour, index) => (
                <tr key={tour.id}>
                  <td className='id'>{index + 1}</td>
                  <td>{tour.name || 'abc'}</td>
                  <td>
                    {new Date(tour.bookTime).toLocaleString('vi-VN', {
                      dateStyle: 'short',
                      timeStyle: 'medium',
                    })}
                  </td>
                  <td>{tour.totalPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div> */}
      <UserInfo profile={profile} formik={formik} setMessage={setMessage} />
      <BookedTourList bookedTours={bookedTours} />
    </div>
  )
}

export default Profile