import React from 'react'
import ProfileContainer from '../../containers/user/ProfileContainer'
import HelmetTitle from "../../components/helmet/HelmetTitle";

const ProfilePage = () => {
  return (
    <>
      <HelmetTitle
        title={"BK Travel - Hồ Sơ"}
        metaName={"meta-profile"}
      />
      <ProfileContainer />
    </>
  )
}

export default ProfilePage