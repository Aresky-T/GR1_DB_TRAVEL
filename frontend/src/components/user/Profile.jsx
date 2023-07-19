import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    // Fake data
    const fakeProfile = {
      avatar_url:
        'https://i.pinimg.com/736x/7c/b5/49/7cb5492889809cb8303b76b80759f0df.jpg',
      full_name: 'Nguyen Van A',
      email: 'nguyenvana@example.com',
      phone: '0123456789',
      address: '123 Nguyen Van Cu, Quan 5, TP HCM',
      date_of_birth: '1990-01-01',
      gender: 'Nam',
      bookedTours: [
        {
          id: 1,
          name: 'Tour Du Lịch Miền Trung',
          date: '2023-08-01',
          price: '5000000',
        },
        {
          id: 2,
          name: 'Tour Du Lịch Nha Trang',
          date: '2023-09-01',
          price: '8000000',
        },
      ],
    };

    // Set profile state
    setProfile(fakeProfile);
  }, []);

  if (!profile) {
    return <div>Loading...</div>;
  }

  // Render profile data
  return (
    <div className='main-session home-container'>
      <div className='card'>
        <div className='card-body' style={{ width: '40%' }}>
          <h3 className='card-title '>Thông tin cá nhân</h3>
          <div className='rounded-image'>
            <img src={profile.avatar_url} alt='avatar' />
          </div>

          <p className='card-text'>Họ tên: {profile.full_name}</p>
          <p className='card-text'>Email: {profile.email}</p>
          <p className='card-text'>Số điện thoại: {profile.phone}</p>
          <p className='card-text'>Địa chỉ: {profile.address}</p>
          <p className='card-text'>Ngày sinh: {profile.date_of_birth}</p>
          <p className='card-text'>Giới tính: {profile.gender}</p>
        </div>

        <div className='card-body' style={{ width: '60%' }}>
          <h3 className='card-title'>Các tour đã đặt</h3>
          <table className='table'>
            <thead>
              <tr>
                <th className='center'>#</th>
                <th className='center'>Tên tour</th>
                <th className='center'>Ngày đặt</th>
                <th className='center'>Giá tiền</th>
              </tr>
            </thead>
            <tbody>
              {profile.bookedTours.map((tour) => (
                <tr key={tour.id}>
                  <td className='id'>{tour.id}</td>
                  <td>{tour.name}</td>
                  <td>{tour.date}</td>
                  <td>{tour.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Profile;
