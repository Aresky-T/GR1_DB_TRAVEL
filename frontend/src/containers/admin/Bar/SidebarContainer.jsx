import React from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import {ROUTE} from '../../../constant/route';
import {useDispatch} from 'react-redux';
import {logout} from '../../../redux/slices/auth.slice';
import Sidebar from "../../../components/admin/Bar/Sidebar";


const SidebarContainer = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const adminLinks = [
        {
            name: "Quản lý Tour",
            path: ROUTE.TOUR_MANAGER,
            icon: <FormatListBulletedIcon/>
        },
        {
            name: "Địa điểm du lịch",
            path: ROUTE.TOURIST_ATTRACTION_MANAGER,
            icon: <FormatListBulletedIcon/>
        },
        {
            name: "Quản lý nhân viên",
            path: ROUTE.STAFF_MANAGER,
            icon: <FormatListBulletedIcon/>
        },
        {
            name: "Quản lý Booking",
            path: ROUTE.BOOKING_MANAGER,
            icon: <FormatListBulletedIcon/>
        },
        {
            name: "Quản lý Tài khoản",
            path: ROUTE.ACCOUNT_MANAGER,
            icon: <ManageAccountsIcon/>
        },
    ]

    function handleLogout() {
        dispatch(logout());
        navigate("/admin/login");
    }


    return (
        <div className='sidebar-container'>
            <Sidebar
                adminLinks={adminLinks}
                handleLogout={handleLogout}
                location={location}
            />
        </div>
    )
}

export default SidebarContainer