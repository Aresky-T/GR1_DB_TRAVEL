import React, { useEffect, useState } from 'react'
import { links } from '../../constant/links'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { authSelector } from '../../redux/selector'
import { ROLE } from '../../constant/role'

const Sidebar = ({ handleChangeShowSidebar }) => {
    const account = useSelector(authSelector);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const [menu, setMenu] = useState(links.filter(item => item.isPublic));

    useEffect(() => {
        if (account.role === ROLE.USER && account.accessToken) {
            setMenu(links.filter(link => !(link.align === 'right' && link.isPublic === true)))
        }
    }, [account])

    return (
        <div className='sidebar'>
            <div className="sidebar-wrapper">
                <div className="sidebar-title">MENU</div>
                {menu.map(item => (
                    <div className={location.pathname === item.path ? "sidebar-item active" : "sidebar-item"}
                        onClick={() => {
                            if (item.title === 'logout') {
                                item.action(dispatch);
                            }
                            navigate(item.path);
                            handleChangeShowSidebar();
                        }}
                        key={item.name}
                    >
                        {item.name}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Sidebar