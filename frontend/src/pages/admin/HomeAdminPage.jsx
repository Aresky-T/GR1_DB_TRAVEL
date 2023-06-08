import React from 'react'
import SidebarContainer from '../../containers/admin/SidebarContainer'
import NavbarContainer from "../../containers/admin/NavbarContainer"
import { Outlet, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { authSelector } from '../../redux/selector'
import { setProfile } from '../../redux/slices/profile.slice'
import { getProfile } from '../../api/global/profile.api'

const HomeAdminPage = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const account = useSelector(authSelector);

  React.useEffect(() => {

    if (account && account.accessToken) {
      account.accessToken && getProfile(account.accessToken)
        .then(res => {
          dispatch(setProfile(res.data))
        })
        .catch(err => {
          console.log(err.response?.data.message)
        })
    }

    if (!localStorage.getItem("accountInfo")) {
      navigate("/admin/login");
    }
  }, [])

  return (
    <div className='admin-container'>
      <SidebarContainer />
      <NavbarContainer />
      <Outlet />
    </div>
  )
}

export default HomeAdminPage