import SidebarContainer from "../../containers/admin/SidebarContainer";
import NavbarContainer from "../../containers/admin/NavbarContainer";
import {Outlet} from "react-router-dom";

const LayoutAdmin = () => {

    return (
        <div className='admin-container'>
            <SidebarContainer />
            <NavbarContainer />
            <Outlet />
        </div>
    )
}

export default LayoutAdmin