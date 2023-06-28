import React, { useEffect, useState } from 'react';
import Profile from '../../components/user/Profile';
import { getProfileApi } from '../../api/user/profile.api';
import { useSelector } from 'react-redux';
import { authSelector } from '../../redux/selector';

const ProfileContainer = () => {
  const [profile, setProfile] = useState();
  const account = useSelector(authSelector);

  useEffect(() => {
    console.log(account);
    if (account.accessToken) {
      getProfileApi(account.accessToken)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);
  return <Profile />;
};

export default ProfileContainer;
