import React from 'react'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const Navbar = ({title}) => {

  return (
    <div className='navbar-admin'>
      <div className="title">{title}</div>
      <div className="notification">
        <span className='notification-icon'><NotificationsNoneIcon /></span>
        <span className='notification-number'>4</span>
      </div>
      <div className="admin-wrapper">
        <div className="admin">
          <img src="https://www.lansweeper.com/wp-content/uploads/2018/05/ASSET-USER-ADMIN.png" alt="" />
          <span>admin</span>
          <span><KeyboardArrowDownIcon /></span>
        </div>
      </div>
    </div>
  )
}

export default Navbar