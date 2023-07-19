import React from 'react';
import ProfileContainer from '../../containers/user/ProfileContainer';
import { Helmet } from 'react-helmet';

const ProfilePage = () => {
  return (
    <>
      <Helmet>
        <meta charSet='utf-8' />
        <title>BK Travel - Hồ Sơ</title>
        <meta name='profile-page' content='BK travel application' />
      </Helmet>
      <ProfileContainer />
    </>
  );
};

export default ProfilePage;
