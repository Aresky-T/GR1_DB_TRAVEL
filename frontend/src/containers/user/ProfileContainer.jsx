import React, { useEffect, useState } from 'react';
import Profile from '../../components/user/Profile';
import { useSelector } from 'react-redux';
import { authSelector } from '../../redux/selector';
import { getProfileApi } from '../../api/global/profile.api';
import { getAllBookedToursApi } from '../../api/user/booking.api';

const ProfileContainer = () => {
  const [profile, setProfile] = useState({});
  const [bookedTours, setBookedTours] = useState([]);

  const { accessToken } = useSelector(authSelector);
  useEffect(() => {
    if (accessToken) {
      getProfileApi(accessToken)
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [accessToken]);

  useEffect(() => {
    if (accessToken) {
      getAllBookedToursApi(accessToken)
        .then((res) => {
          setBookedTours(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [accessToken]);

  return <Profile profile={profile} bookedTours={bookedTours} />;
};

export default ProfileContainer;
